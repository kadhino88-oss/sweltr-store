/**
 * Client pour l'API CJ Dropshipping (api2.0).
 * Doc : https://developers.cjdropshipping.com/
 *
 * Flux :
 * 1. getAccessToken()  -> échange ta clé API CJ contre un accessToken (mis en cache 24h côté CJ)
 * 2. createOrder()     -> crée la commande chez CJ avec l'adresse du client final
 * 3. payOrder()        -> paie la commande avec le SOLDE de ton compte CJ (argent réel dépensé)
 *
 * Le checkout reste fermé tant que l'autopaiement et la validation sandbox ne sont
 * pas activés. Une fois prêt, le webhook paie la commande CJ avec le solde SWELTR.
 */

import { createHash } from "node:crypto";

export const CJ_API_BASE_URL = "https://developers.cjdropshipping.com/api2.0/v1";

// Stable mapping from a paid Stripe session to the partner order number.
export function getCjOrderNumber(stripeSessionId: string) {
  const digest = createHash("sha256").update(stripeSessionId).digest("hex").slice(0, 40);
  return `SWELTR-${digest}`;
}

let cachedToken: { accessToken: string; expiresAt: number } | null = null;
let pendingToken: Promise<string> | null = null;

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

  let data: CjAccessTokenResponse | undefined;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const res = await fetch(`${CJ_API_BASE_URL}/authentication/getAccessToken`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ apiKey }),
      cache: "no-store",
    });
    if (!res.ok) {
      let errorCode: number | undefined;
      let errorMessage = "";
      try {
        const body = await res.json() as { code?: unknown; message?: unknown };
        const parsedCode = Number(body.code);
        errorCode = Number.isFinite(parsedCode) ? parsedCode : undefined;
        errorMessage = typeof body.message === "string" ? body.message : "";
      } catch {
        // Keep the status-only error when CJ does not return JSON.
      }
      const pointsExhausted = errorCode === 429 || /insufficient.*points/i.test(errorMessage);
      if (res.status === 429 && !pointsExhausted && attempt < 2) {
        const retryAfter = Number(res.headers.get("retry-after"));
        const delayMs = Number.isFinite(retryAfter) && retryAfter > 0
          ? Math.min(5000, retryAfter * 1000)
          : 1200 * (attempt + 1);
        await new Promise((resolve) => setTimeout(resolve, delayMs));
        continue;
      }
      throw new Error(`Échec HTTP de l'authentification CJ (HTTP ${res.status}${errorCode ? `, code ${errorCode}` : ""}).`);
    }

    try {
      data = (await res.json()) as CjAccessTokenResponse;
    } catch {
      throw new Error("Réponse d'authentification CJ invalide.");
    }
    break;
  }

  if (!data?.result || !data.data?.accessToken || !data.data?.accessTokenExpiryDate) {
    throw new Error(
      authenticationErrorPrefix ? `${authenticationErrorPrefix}${data?.message || "réponse CJ invalide"}` : data?.message || "Réponse CJ invalide."
    );
  }

  return data.data;
}

async function getAccessToken(): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) {
    return cachedToken.accessToken;
  }

  if (!pendingToken) {
    pendingToken = (async () => {
      const data = await getCjAccessToken({
        missingApiKeyMessage: "CJ_API_KEY manquante dans les variables d'environnement.",
        authenticationErrorPrefix: "Échec d'authentification CJ : ",
      });

      const expiresAt = Date.parse(data.accessTokenExpiryDate);
      if (!Number.isFinite(expiresAt) || expiresAt <= Date.now() + 60_000) {
        throw new Error("CJ a retourné un jeton dont la date d'expiration est invalide ou trop proche.");
      }

      cachedToken = { accessToken: data.accessToken, expiresAt };
      return cachedToken.accessToken;
    })().finally(() => {
      pendingToken = null;
    });
  }
  return pendingToken;
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

export type CjFreightOption = {
  logisticName?: unknown;
  logisticPrice?: unknown;
  logisticAging?: unknown;
};

export type EligibleCjFreight = { logisticName: string; costUsd: number; maxDays: number };

export function maxDeliveryDays(value: unknown): number | null {
  if (typeof value !== "string" && typeof value !== "number") return null;
  const match = String(value).trim().match(/^(\d+)\s*(?:-\s*(\d+))?$/);
  if (!match) return null;
  const max = Number(match[2] ?? match[1]);
  return Number.isInteger(max) && max > 0 ? max : null;
}

export async function getEligibleShippingOptions(
  destinationCountryCode: string,
  products: CjLineItem[],
): Promise<EligibleCjFreight[]> {
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
  if (!res.ok) throw new Error("Échec HTTP du calcul de transport (HTTP " + res.status + ").");
  const data = await res.json() as { result?: boolean; message?: string; data?: unknown };
  if (data.result !== true || !Array.isArray(data.data)) throw new Error("Aucun tarif de livraison disponible pour cette destination.");
  return (data.data as CjFreightOption[]).flatMap((option) => {
    const logisticName = typeof option.logisticName === "string" ? option.logisticName.trim() : "";
    const costUsd = Number(option.logisticPrice);
    const maxDays = maxDeliveryDays(option.logisticAging);
    return logisticName && Number.isFinite(costUsd) && costUsd >= 0 && maxDays !== null
      ? [{ logisticName, costUsd, maxDays }]
      : [];
  }).sort((a, b) => a.costUsd - b.costUsd);
}

export async function getVariantCostAndStock(vid: string): Promise<{ costUsd: number; availableQuantity: number }> {
  const token = await getAccessToken();
  const url = new URL(CJ_API_BASE_URL + "/product/variant/queryByVid");
  url.searchParams.set("vid", vid);
  url.searchParams.set("features", "enable_inventory");
  const res = await fetch(url, { headers: { "CJ-Access-Token": token }, cache: "no-store" });
  if (!res.ok) throw new Error("Impossible de vérifier la disponibilité d’un article.");
  const result = await res.json() as { result?: boolean; data?: Record<string, unknown> };
  if (!result.result || !result.data || result.data.vid !== vid) throw new Error("Référence d’article indisponible.");
  const expectedProductPattern: Record<string, RegExp> = {
    "42BD9CA6-6D95-4B26-8F20-A52375663923": /glove|mitten/i,
    "2410090540221610300": /scarf|neck.?warmer/i,
    "1573872746495488003": /sock/i,
  };
  const expectedName = expectedProductPattern[vid];
  const pid = typeof result.data.pid === "string" ? result.data.pid : "";
  if (!expectedName || !pid) throw new Error("Référence d’article non vérifiée.");
  const productUrl = new URL(CJ_API_BASE_URL + "/product/query");
  productUrl.searchParams.set("pid", pid);
  const productResponse = await fetch(productUrl, { headers: { "CJ-Access-Token": token }, cache: "no-store" });
  if (!productResponse.ok) throw new Error("Identité du produit temporairement indisponible.");
  const productResult = await productResponse.json() as { result?: boolean; data?: Record<string, unknown> };
  const productName = typeof productResult.data?.productNameEn === "string" ? productResult.data.productNameEn : "";
  if (!productResult.result || !expectedName.test(productName)) throw new Error("La référence choisie ne correspond pas au produit attendu.");
  const costUsd = Number(result.data.variantSellPrice);
  const inventories = Array.isArray(result.data.inventories) ? result.data.inventories as Array<Record<string, unknown>> : [];
  const availableQuantity = inventories.reduce((total, row) => total + Math.max(0, Number(row.totalInventory) || 0), 0);
  if (!Number.isFinite(costUsd) || costUsd <= 0) throw new Error("Prix d’achat temporairement indisponible.");
  return { costUsd, availableQuantity };
}

export async function getCjBalance(): Promise<number> {
  const token = await getAccessToken();
  const res = await fetch(`${CJ_API_BASE_URL}/shopping/pay/getBalance`, {
    headers: { "CJ-Access-Token": token },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Impossible de vérifier le solde fournisseur (HTTP ${res.status}).`);
  const result = await res.json() as { result?: boolean; data?: { amount?: unknown } };
  const amount = Number(result.data?.amount);
  if (!result.result || !Number.isFinite(amount) || amount < 0) {
    throw new Error("Le solde fournisseur n’a pas pu être confirmé.");
  }
  return amount;
}

async function getCheapestAvailableLogistics(
  destinationCountryCode: string,
  products: CjLineItem[],
  requestedLogisticName?: string,
): Promise<string> {
  const options = await getEligibleShippingOptions(destinationCountryCode, products);
  const selected = requestedLogisticName
    ? options.find((option) => option.logisticName === requestedLogisticName)
    : options[0];
  if (!selected) throw new Error("Aucun transporteur n’est actuellement disponible pour cette destination.");
  return selected.logisticName;
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

export function isCjOrderPaid(orderStatus?: string) {
  return ["PAID", "PENDING", "PROCESSING", "UNSHIPPED", "SHIPPED", "DELIVERED"]
    .includes((orderStatus || "").trim().toUpperCase());
}

export async function createCjOrder(
  shipping: CjShippingInfo,
  products: CjLineItem[],
  logisticName?: string,
  options: { isSandbox?: boolean } = {},
) {
  const token = await getAccessToken();
  const selectedLogisticName = await getCheapestAvailableLogistics(shipping.shippingCountryCode, products, logisticName);
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
      logisticName: selectedLogisticName,
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
      ...(options.isSandbox ? { isSandbox: 1 } : {}),
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

  let shipmentOrderId = knownShipmentOrderId;

  // A retry can find an order already confirmed in CJ. Reuse its parent order
  // instead of adding/confirming it again; regenerate the payment quote below.
  if (!shipmentOrderId) {
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
      data?: {
        submitSuccess?: boolean; shipmentsId?: string; shipmentOrderId?: string; result?: number;
        interceptOrders?: unknown[]; unMatchOrderCodes?: unknown[]; unMatchProductCodes?: unknown[];
      };
    };
    if (confirmData.result === false || confirmData.data?.submitSuccess === false || (!confirmData.result && !confirmData.success && confirmData.code !== 200)) {
      throw new Error("CJ n’a pas confirmé la commande : " + (confirmData.message || "confirmation en attente"));
    }
    if (
      confirmData.data?.interceptOrders?.length
      || confirmData.data?.unMatchOrderCodes?.length
      || confirmData.data?.unMatchProductCodes?.length
      || confirmData.data?.result === 1
      || confirmData.data?.result === 2
    ) {
      throw new CjOrderPreparationRejectedError("CJ a signalé un article bloqué ou indisponible à la confirmation.");
    }

    shipmentOrderId = confirmData.data?.shipmentOrderId || confirmData.data?.shipmentsId;
  }
  if (!shipmentOrderId) {
    throw new Error("CJ a confirmé la commande mais n’a retourné aucun shipmentOrderId. Paiement automatique bloqué.");
  }

  const parentRes = await fetch(`${CJ_API_BASE_URL}/shopping/order/saveGenerateParentOrder`, {
    method: "POST", headers, body: JSON.stringify({ shipmentOrderId }), cache: "no-store",
  });
  if (!parentRes.ok) throw new Error(`Échec HTTP génération de commande parent CJ (HTTP ${parentRes.status}).`);
  const parentData = await parentRes.json() as {
    result?: boolean; success?: boolean; code?: number; message?: string;
    data?: {
      submitSuccess?: boolean; successOrders?: string[]; unMatchOrderCodes?: string[];
      unMatchProductCodes?: string[]; interceptOrders?: unknown[]; payId?: string; orderMoney?: unknown;
      paymentInformation?: { payableAmount?: unknown; actualPayment?: unknown };
    };
  };
  if (parentData.result === false || parentData.data?.submitSuccess === false || (!parentData.result && !parentData.success && parentData.code !== 200)) {
    throw new Error("CJ n’a pas généré la commande parent : " + (parentData.message || "réponse invalide"));
  }
  if (
    (Array.isArray(parentData.data?.successOrders) && parentData.data.successOrders.length === 0)
    || parentData.data?.interceptOrders?.length
    || parentData.data?.unMatchOrderCodes?.length
    || parentData.data?.unMatchProductCodes?.length
  ) {
    throw new CjOrderPreparationRejectedError("CJ a exclu un article de la commande parent.");
  }

  const payableAmount = parentData.data?.paymentInformation?.payableAmount
    ?? parentData.data?.paymentInformation?.actualPayment
    ?? parentData.data?.orderMoney;
  if ((typeof payableAmount !== "number" && typeof payableAmount !== "string") || String(payableAmount).trim() === "") {
    throw new CjOrderPreparationRejectedError("CJ n’a pas fourni le montant exact à payer pour cette commande.");
  }
  const payableAmountUsd = Number(payableAmount);
  if (!Number.isFinite(payableAmountUsd) || payableAmountUsd < 0) {
    throw new CjOrderPreparationRejectedError("Le montant fournisseur retourné par CJ n’est pas exploitable.");
  }

  return { shipmentOrderId, payId: parentData.data?.payId, payableAmountUsd };
}

export class CjOrderPreparationRejectedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CjOrderPreparationRejectedError";
  }
}

export class CjPaymentRejectedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CjPaymentRejectedError";
  }
}

export async function payCjOrder(shipmentOrderId: string, payId?: string, options: { isSandbox?: boolean } = {}) {
  // Safety gate: createOrderV2 alone is not the complete CJ fulfillment/payment flow.
  // Do not allow a real balance debit until the full CJ flow has been implemented
  // and verified against a real test order and the returned parent/payment IDs.
  if (!options.isSandbox && process.env.CJ_PAYMENT_FLOW_VALIDATED !== "true") {
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
    body: JSON.stringify({ shipmentOrderId, ...(payId ? { payId } : {}) }),
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
    throw new CjPaymentRejectedError(`Échec de paiement CJ : ${data.message || "réponse invalide"}`);
  }
  return data.data;
}
