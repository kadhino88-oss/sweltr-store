const FALLBACK_SITE_URL = "https://sweltr-store-five.vercel.app";

export function getSiteUrl() {
  const configured = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.SITE_URL || FALLBACK_SITE_URL;
  return configured.replace(/\/$/, "");
}
