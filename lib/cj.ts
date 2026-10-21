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
  const data = (await res.json()) as CjAccessTokenResponse;

  if (!data.result) {
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

  const data = await res.json();
  if (!data.result) {
    throw new Error(`Échec de création de commande CJ : ${data.message}`);
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

  const data = await res.json();
  if (!data.result) {
    throw new Error(`Échec de paiement CJ : ${data.message}`);
  }
  return data.data;
}
