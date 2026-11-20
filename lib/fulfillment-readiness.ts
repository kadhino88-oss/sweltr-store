export function isStoreFulfillmentReady(env: NodeJS.ProcessEnv = process.env) {
  return env.STORE_SALES_ENABLED === "true"
    && isCjAutoPaymentReady(env);
}

export function isCjAutoPaymentReady(env: NodeJS.ProcessEnv = process.env) {
  return env.CJ_AUTO_PAY === "true"
    && env.CJ_PAYMENT_FLOW_VALIDATED === "true";
}
