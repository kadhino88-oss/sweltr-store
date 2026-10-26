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

export const CJ_API_BASE_URL = "https://developers.cjdropshipping.com/api2.0/v1";

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

  cachedToken = {
    accessToken: data.accessToken,
    expiresAt: new Date(data.accessTokenExpiryDate).getTime(),
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

/**
 * Retrouve une commande déjà créée avec notre référence partenaire stable.
 * CJ documente getOrderDetailBatch comme acceptant l'identifiant de commande
 * ou le numéro de commande de la boutique. En cas d'erreur de lookup, on échoue
 * fermé : mieux vaut retenter que risquer de créer un doublon.
 */
export async function findCjOrderByOrderNumber(
  orderNumber: string,
): Promise<{ orderId: string; orderCode?: string } | null> {
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
    throw new Error(`Échec de recherche de commande CJ (HTTP ${res.status}).`);
  }

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

  return {
    orderId,
    ...(typeof existing.orderCode === "string" ? { orderCode: existing.orderCode } : {}),
    ...(typeof existing.cjOrderCode === "string" ? { orderCode: existing.cjOrderCode } : {}),
  };
}

export async function createCjOrder(shipping: CjShippingInfo, products: CjLineItem[]) {
  const token = await getAccessToken();

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

  let data: { result?: boolean; message?: string; data?: { orderId?: string; orderCode?: string } };
  try {
    data = await res.json();
  } catch {
    throw new Error("Réponse de création de commande CJ invalide.");
  }

  if (!data.result || typeof data.data?.orderId !== "string" || !data.data.orderId) {
    throw new Error(`Échec de création de commande CJ : ${data.message || "identifiant de commande absent"}`);
  }
  return data.data as { orderId: string; orderCode?: string };
}

export async function payCjOrder(orderId: string) {
  const token = await getAccessToken();

  const res = await fetch(`${CJ_API_BASE_URL}/shopping/pay/payBalanceV2`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "CJ-Access-Token": token,
    },
    body: JSON.stringify({ orderId }),
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
