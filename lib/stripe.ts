import Stripe from "stripe";

let stripeClient: Stripe | undefined;

export function getStripeClient(): Stripe | null {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) return null;

  stripeClient ??= new Stripe(secretKey, { apiVersion: "2024-06-20" });
  return stripeClient;
}

export function getStripeErrorDetails(error: unknown) {
  if (!(error instanceof Error)) {
    return { message: String(error) };
  }

  const stripeError = error as Error & {
    type?: unknown;
    code?: unknown;
    statusCode?: unknown;
    requestId?: unknown;
  };

  return {
    name: stripeError.name,
    message: stripeError.message,
    type: stripeError.type,
    code: stripeError.code,
    statusCode: stripeError.statusCode,
    requestId: stripeError.requestId,
  };
}
