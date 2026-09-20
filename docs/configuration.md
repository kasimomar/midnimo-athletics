# Deployment configuration

Copy `.env.example` to `.env.local` for local development. Set the same variables in the deployment platform before building. Restart the dev server or rebuild/redeploy after changing them: Next.js embeds `NEXT_PUBLIC_*` values into browser bundles at build time. These values are **public**, never API keys or passwords.

| Variable | Purpose | When absent or invalid |
| --- | --- | --- |
| `NEXT_PUBLIC_HERO_VIDEO_URL` | HTTPS URL of the background MP4 | Gradient hero |
| `NEXT_PUBLIC_REGISTRATION_ENDPOINT` | HTTPS Google Apps Script web-app endpoint accepting the registration JSON | Registration disabled |
| `NEXT_PUBLIC_STRIPE_PAYMENT_URL` | HTTPS Stripe hosted payment link | Registration disabled |

Blank, malformed, non-HTTPS, and credential-bearing URLs are treated as unconfigured. Registration fields, submit action, and payment link require both registration/payment URLs. Contact remains available.

## Migration checklist

1. Configure the video URL and your own Apps Script endpoint in each environment.
2. Configure a Stripe **test** payment link in development/preview, and the intended live link in production. URL validation does not determine whether Stripe is in live mode; verify this in Stripe.
3. Rebuild and verify the configured state before deploying. A build without integration variables intentionally disables registration.
4. Use synthetic data and a mocked endpoint for local browser testing. Never submit real athlete details as a test.

The current deployment preserves the site's existing Stripe **test** link. Moving it into an environment variable does not enable live billing. A verified live payment link is still needed before accepting real payments. Preview builds can leave the registration and payment variables blank to disable submissions while the site is reviewed.

## Existing integration limits

The browser sends JSON via `fetch` with `mode: "no-cors"`. Responses are opaque: a resolved request does **not** prove the registration was stored. Network errors are caught and the existing flow still continues to payment. This repository has no registration backend, payment webhook, or association between payment status and registration. The Apps Script implementation is maintained outside this repository.

A future server-side registration API should validate input, return confirmed persistence, handle retry/idempotency, and reconcile Stripe webhooks before displaying a registration success message. The contact form opens the visitor's email application via `mailto:`; it does not send email itself.

Reference: [Next.js environment variables](https://nextjs.org/docs/app/guides/environment-variables).
