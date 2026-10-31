/**
 * Client pour l'API CJ Dropshipping (api2.0).
 * Doc : https://developers.cjdropshipping.com/
 *
 * Flux :
 * 1. getAccessToken()  -> échange ta clé API CJ contre un accessToken (mis en cache 24h côté CJ)
 * 2. createOrder()     -> crée la commande chez CJ avec l'adresse du client final
 * 3. payOrder()        -> paie la commande avec le SOLDE de ton compte CJ (argent réel dépensé)
 *
 * IMPORTANT : payOrder() ne s'exécute que si CJ_AUTO_PAY=true dans tes variables
 * d'environnement. Tant que c'est absent/false, les commandes sont créées chez CJ
 * mais restent "non payées" — tu peux les valider à la main dans MyCJ le temps
 * de vérifier que tout fonctionne comme prévu.
 */

import { createHash } from "node:crypto";

export const CJ_API_BASE_URL = "https://developers.cjdropshipping.com/api2.0/v1";

// Stable mapping from a paid Stripe session to the partner order number.
export function getCjOrderNumber(stripeSessionId: string) {
  const digest = createHash("sha256").update(stripeSessionId).digest("hex").slice(0, 40);
  return `SWELTR-${digest}`;
}

let cachedToken: { accessToken: string; expiresAt: number } | null = null;

type CjAccessTokenResponse = {
  result: boolean;
  message: string;
  data: {
    accessToken: string;
    accessTokenExpiryDate: string;
  };
};

type CjAccessTokenOptions = {
  missingApiKeyMessage?: string;
  authenticationErrorPrefix?: string;
};

export async function getCjAccessToken({
  missingApiKeyMessage = "CJ_API_KEY manquante.",
  authenticationErrorPrefix = "",
}: CjAccessTokenOptions = {}): Promise<CjAccessTokenResponse["data"]> {
  const apiKey = process.env.CJ_API_KEY;
  if (!apiKey) throw new Error(missingApiKeyMessage);

  const res = await fetch(`${CJ_API_BASE_URL}/authentication/getAccessToken`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ apiKey }),
  });
  if (!res.ok) {
    throw new Error(`Échec HTTP de l'authentification CJ (HTTP ${res.status}).`);
  }

  let data: CjAccessTokenResponse;
  try {
    data = (await res.json()) as CjAccessTokenResponse;
  } catch {
    throw new Error("Réponse d'authentification CJ invalide.");
  }

  if (!data.result || !data.data?.accessToken || !data.data?.accessTokenExpiryDate) {
    throw new Error(
      authenticationErrorPrefix ? `${authenticationErrorPrefix}${data.message}` : data.message
    );
  }

  return data.data;
}

async function getAccessToken(): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) {
    return cachedToken.accessToken;
  }

  const data = await getCjAccessToken({
    missingApiKeyMessage: "CJ_API_KEY manquante dans les variables d'environnement.",
    authenticationErrorPrefix: "Échec d'authentification CJ : ",
  });

  const expiresAt = Date.parse(data.accessTokenExpiryDate);
  if (!Number.isFinite(expiresAt) || expiresAt <= Date.now() + 60_000) {
    throw new Error("CJ a retourné un jeton dont la date d'expiration est invalide ou trop proche.");
  }

  cachedToken = {
    accessToken: data.accessToken,
    expiresAt,
  };
  return cachedToken.accessToken;
}

export type CjShippingInfo = {
  orderNumber: string; // ton identifiant interne (ex: session Stripe)
  shippingCustomerName: string;
  shippingCountryCode: string; // ex: "FR", "US"
  shippingProvince: string;
  shippingCity: string;
  shippingAddress: string;
  shippingAddress2?: string;
  shippingZip: string;
  shippingPhone: string;
  email?: string;
};

export type CjLineItem = {
  vid: string; // variant ID CJ du produit — à récupérer sur la fiche produit CJ
  quantity: number;
};

type CjFreightOption = {
  logisticName?: unknown;
  logisticPrice?: unknown;
};

async function getCheapestAvailableLogistics(
  destinationCountryCode: string,
  products: CjLineItem[],
): Promise<string> {
  const token = await getAccessToken();
  const res = await fetch(CJ_API_BASE_URL + "/logistic/freightCalculate", {
    method: "POST",
    headers: { "Content-Type": "application/json", "CJ-Access-Token": token },
    body: JSON.stringify({
      startCountryCode: "CN",
      endCountryCode: destinationCountryCode,
      products: products.map(({ vid, quantity }) => ({ vid, quantity })),
    }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Échec HTTP du calcul de transport CJ (HTTP " + res.status + ").");
  let data: { result?: boolean; message?: string; data?: unknown };
  try { data = await res.json(); } catch { throw new Error("Réponse de calcul de transport CJ invalide."); }
  if (data.result !== true || !Array.isArray(data.data)) {
    throw new Error("Aucun tarif de transport CJ confirmé : " + (data.message || "réponse invalide"));
  }
  const options = (data.data as CjFreightOption[])
    .filter((option) => typeof option.logisticName === "string" && option.logisticName.trim().length > 0 && Number.isFinite(Number(option.logisticPrice)) && Number(option.logisticPrice) >= 0)
    .sort((a, b) => Number(a.logisticPrice) - Number(b.logisticPrice));
  if (options.length === 0) throw new Error("Aucun transporteur CJ disponible pour " + destinationCountryCode + ".");
  // Le choix du tarif le moins cher ne garantit pas que le transporteur offre un suivi.
  // La disponibilité du suivi doit être confirmée avant le lancement réel.
  return (options[0].logisticName as string).trim();
}

/**
 * Retrouve une commande déjà créée avec notre référence partenaire stable.
 * CJ documente getOrderDetailBatch comme acceptant l'identifiant de commande
 * ou le numéro de commande de la boutique. En cas d'erreur de lookup, on échoue
 * fermé : mieux vaut retenter que risquer de créer un doublon.
 */
export async function findCjOrderByOrderNumber(
  orderNumber: string,
): Promise<{
  orderId: string;
  orderCode?: string;
  shipmentOrderId?: string;
  trackingNumber?: string;
  trackingUrl?: string;
  logisticName?: string;
  orderStatus?: string;
} | null> {
  const token = await getAccessToken();
  const res = await fetch(`${CJ_API_BASE_URL}/shopping/order/getOrderDetailBatch`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "CJ-Access-Token": token,
    },
    body: JSON.stringify({ orderIds: [orderNumber] }),
  });

  if (!res.ok) {
    throw new Error(`Échec HTTP de recherche de commande CJ (HTTP ${res.status}).`);
  }

  let data: {
    result?: boolean;
    message?: string;
    data?: unknown;
  };
  try {
    data = (await res.json()) as {
      result?: boolean;
      message?: string;
      data?: unknown;
    };
  } catch {
    throw new Error("Réponse de recherche de commande CJ invalide.");
  }

  if (!data.result) {
    throw new Error(`Échec de recherche de commande CJ : ${data.message || "réponse invalide"}`);
  }

  const orders = Array.isArray(data.data)
    ? data.data as Array<Record<string, unknown>>
    : [];

  const existing = orders.find((item) =>
    item.orderNum === orderNumber || item.orderNumber === orderNumber
  );

  if (!existing) return null;

  const orderId =
    typeof existing.orderId === "string"
      ? existing.orderId
      : typeof existing.cjOrderId === "string"
        ? existing.cjOrderId
        : "";

  if (!orderId) {
    throw new Error("CJ a retrouvé la référence mais n'a retourné aucun identifiant de commande.");
  }

  const shipmentOrderId =
    typeof existing.shipmentOrderId === "string" && existing.shipmentOrderId
      ? existing.shipmentOrderId
      : undefined;
  const trackingNumber = typeof existing.trackNumber === "string" && existing.trackNumber ? existing.trackNumber : undefined;
  const trackingUrl = typeof existing.trackingUrl === "string" && existing.trackingUrl ? existing.trackingUrl : undefined;
  const logisticName = typeof existing.logisticName === "string" && existing.logisticName ? existing.logisticName : undefined;
  const orderStatus = typeof existing.orderStatus === "string" && existing.orderStatus ? existing.orderStatus : undefined;

  return {
    orderId,
    ...(shipmentOrderId ? { shipmentOrderId } : {}),
    ...(trackingNumber ? { trackingNumber } : {}),
    ...(trackingUrl ? { trackingUrl } : {}),
    ...(logisticName ? { logisticName } : {}),
    ...(orderStatus ? { orderStatus } : {}),
    ...(typeof existing.orderCode === "string" ? { orderCode: existing.orderCode } : {}),
    ...(typeof existing.cjOrderCode === "string" ? { orderCode: existing.cjOrderCode } : {}),
  };
}

export async function createCjOrder(shipping: CjShippingInfo, products: CjLineItem[]) {
  const token = await getAccessToken();
  const logisticName = await getCheapestAvailableLogistics(shipping.shippingCountryCode, products);
  const shippingCountry = shipping.shippingCountryCode === "FR"
    ? "France"
    : shipping.shippingCountryCode === "CH"
      ? "Switzerland"
      : shipping.shippingCountryCode;

  const res = await fetch(`${CJ_API_BASE_URL}/shopping/order/createOrderV2`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "CJ-Access-Token": token,
    },
    body: JSON.stringify({
      orderNumber: shipping.orderNumber,
      shippingCustomerName: shipping.shippingCustomerName,
      shippingCountryCode: shipping.shippingCountryCode,
      shippingCountry,
      logisticName,
      // Crée la commande sans paiement via le flux CJ hébergé obsolète.
      payType: 3,
      shippingProvince: shipping.shippingProvince,
      shippingCity: shipping.shippingCity,
      shippingAddress: shipping.shippingAddress,
      shippingAddress2: shipping.shippingAddress2 || "",
      shippingZip: shipping.shippingZip,
      shippingPhone: shipping.shippingPhone,
      email: shipping.email || "",
      shippingCounty: "",
      remark: "Commande SWELTR",
      fromCountryCode: "CN",
      platform: "api",
      orderFlow: 1,
      products,
    }),
  });

  if (!res.ok) {
    throw new Error(`Échec HTTP de création de commande CJ (HTTP ${res.status}).`);
  }

  let data: { result?: boolean; message?: string; data?: { orderId?: string; orderCode?: string; shipmentOrderId?: string } };
  try {
    data = await res.json();
  } catch {
    throw new Error("Réponse de création de commande CJ invalide.");
  }

  if (!data.result || typeof data.data?.orderId !== "string" || !data.data.orderId) {
    throw new Error(`Échec de création de commande CJ : ${data.message || "identifiant de commande absent"}`);
  }
  return data.data as { orderId: string; orderCode?: string; shipmentOrderId?: string };
}

/**
 * Finalise la préparation CJ sans débiter le solde : ajout au panier, confirmation,
 * puis génération de la commande parent. Le paiement reste une action séparée.
 */
export async function prepareCjOrderForPayment(orderId: string, knownShipmentOrderId?: string) {
  if (!orderId) throw new Error("Préparation CJ impossible : orderId manquant.");
  const token = await getAccessToken();
  const headers = { "Content-Type": "application/json", "CJ-Access-Token": token };

  const addRes = await fetch(`${CJ_API_BASE_URL}/shopping/order/addCart`, {
    method: "POST", headers, body: JSON.stringify({ cjOrderIdList: [orderId] }), cache: "no-store",
  });
  if (!addRes.ok) throw new Error(`Échec HTTP ajout au panier CJ (HTTP ${addRes.status}).`);
  const addData = await addRes.json() as { result?: boolean; success?: boolean; code?: number; message?: string };
  if (addData.result === false && addData.code !== 200) {
    console.warn("Ajout au panier CJ non confirmé, tentative de confirmation : " + (addData.message || "réponse sans détail"));
  }

  const confirmRes = await fetch(`${CJ_API_BASE_URL}/shopping/order/addCartConfirm`, {
    method: "POST", headers, body: JSON.stringify({ cjOrderIdList: [orderId] }), cache: "no-store",
  });
  if (!confirmRes.ok) throw new Error(`Échec HTTP confirmation CJ (HTTP ${confirmRes.status}).`);
  const confirmData = await confirmRes.json() as {
    result?: boolean; success?: boolean; code?: number; message?: string;
    data?: { submitSuccess?: boolean; shipmentsId?: string; shipmentOrderId?: string };
  };
  if (confirmData.result === false || confirmData.data?.submitSuccess === false || (!confirmData.result && !confirmData.success && confirmData.code !== 200)) {
    throw new Error("CJ n’a pas confirmé la commande : " + (confirmData.message || "confirmation en attente"));
  }

  const shipmentOrderId = confirmData.data?.shipmentOrderId || confirmData.data?.shipmentsId || knownShipmentOrderId;
  if (!shipmentOrderId) {
    throw new Error("CJ a confirmé la commande mais n’a retourné aucun shipmentOrderId. Paiement automatique bloqué.");
  }

  const parentRes = await fetch(`${CJ_API_BASE_URL}/shopping/order/saveGenerateParentOrder`, {
    method: "POST", headers, body: JSON.stringify({ shipmentOrderId }), cache: "no-store",
  });
  if (!parentRes.ok) throw new Error(`Échec HTTP génération de commande parent CJ (HTTP ${parentRes.status}).`);
  const parentData = await parentRes.json() as {
    result?: boolean; success?: boolean; code?: number; message?: string;
    data?: { submitSuccess?: boolean; successOrders?: string[]; unMatchOrderCodes?: string[]; payId?: string };
  };
  if (parentData.result === false || parentData.data?.submitSuccess === false || (!parentData.result && !parentData.success && parentData.code !== 200)) {
    throw new Error("CJ n’a pas généré la commande parent : " + (parentData.message || "réponse invalide"));
  }
  return { shipmentOrderId, payId: parentData.data?.payId };
}

export async function payCjOrder(shipmentOrderId: string, payId?: string) {
  // Safety gate: createOrderV2 alone is not the complete CJ fulfillment/payment flow.
  // Do not allow a real balance debit until the full CJ flow has been implemented
  // and verified against a real test order and the returned parent/payment IDs.
  if (process.env.CJ_PAYMENT_FLOW_VALIDATED !== "true") {
    throw new Error(
      "Paiement automatique CJ bloqué : définir CJ_PAYMENT_FLOW_VALIDATED=true uniquement après validation complète du flux CJ."
    );
  }

  if (!shipmentOrderId) throw new Error("Paiement CJ impossible : shipmentOrderId manquant dans la réponse de création.");

  const token = await getAccessToken();

  const res = await fetch(`${CJ_API_BASE_URL}/shopping/pay/payBalanceV2`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "CJ-Access-Token": token,
    },
    body: JSON.stringify({ shipmentOrderId }),
  });

  if (!res.ok) {
    throw new Error(`Échec HTTP de paiement CJ (HTTP ${res.status}).`);
  }

  let data: { result?: boolean; message?: string; data?: unknown };
  try {
    data = await res.json();
  } catch {
    throw new Error("Réponse de paiement CJ invalide.");
  }

  if (!data.result) {
    throw new Error(`Échec de paiement CJ : ${data.message || "réponse invalide"}`);
  }
  return data.data;
}
