import "server-only";

export function inquirySendingEnabled() {
  return process.env.CONTACT_FORM_ENABLED === "true"
    && Boolean(process.env.RESEND_API_KEY && process.env.RESEND_EMAIL_DOMAIN);
}
