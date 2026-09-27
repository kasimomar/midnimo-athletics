# Deployment configuration

Copy `.env.example` to `.env.local` for local development. Next.js embeds `NEXT_PUBLIC_*` values into browser bundles at build time, so rebuild after changing them. These values are **public**, never credentials.

| Variable | Purpose | When absent or invalid |
| --- | --- | --- |
| `NEXT_PUBLIC_HERO_VIDEO_URL` | Optional HTTPS background-video URL | Gradient hero |
| `RESEND_API_KEY` | Server-only key provisioned by Resend | Online sending disabled |
| `RESEND_EMAIL_DOMAIN` | Verified sender domain provisioned by Resend | Online sending disabled |
| `CONTACT_FORM_ENABLED` | Explicit `true` to enable the verified form | Email-draft fallback |
| `SITE_URL` | Server-side HTTPS public origin for canonical and sharing links, e.g. your verified public domain | Vercel production domain, or localhost outside Vercel |

Blank, malformed, non-HTTPS, and credential-bearing URLs are treated as unconfigured. Reduced-motion visitors receive the static gradient even when a video URL is configured. The browser checks the visitor's preference before adding the video.

`SITE_URL` must be an origin without credentials, a path, query parameters, or fragment; invalid explicit values fail the build. Set it in Production and Preview to the same canonical public domain. It is public metadata, but does not need a `NEXT_PUBLIC_` prefix.

## Program inquiries and contact

The organization-provided recipient is `admin@midnimoathletics.com`, defined in `lib/contact.ts`. Google Workspace remains the receiving inbox. Resend sends from `inquiries@<RESEND_EMAIL_DOMAIN>` with the visitor's validated email as Reply-To. The API fixes the recipient on the server; visitors cannot choose arbitrary recipients or sender addresses.

The Vercel Marketplace Resend integration provisions `RESEND_API_KEY` and `RESEND_EMAIL_DOMAIN`. Use a dedicated sending subdomain, verify its DKIM/SPF/bounce DNS records, and preserve the root domain's Google Workspace MX/SPF records. Sending does not require enabling Resend inbound email. Do not commit environment files or expose keys to client components.

Set `CONTACT_FORM_ENABLED=true` only after verifying the sender and checking the preview. Rebuild after changing it: the server-rendered page chooses the online form at build time; the API also checks configuration at request time. With the flag off or credentials absent, the existing email-draft form remains available. To disable online sending, turn the flag off and redeploy.

The online form collects a name, reply email, program choice, and optional question. It requests no diagnosis, medical history, payment, or athlete record. The copy explains who receives the message. Resend and the receiving Google Workspace inbox process the inquiry; the app does not store it in a database or log its contents.

`POST /api/inquiry` requires same-origin JSON, bounds the actual request stream, validates field types/lengths and a fixed program list, rejects a filled honeypot, and checks Vercel BotID Basic before calling Resend. BotID is initialized in `instrumentation-client.ts` and proxied with `withBotId` in the Next config. Deep Analysis is not enabled. No client-supplied bypass or recipient override exists. Vercel Preview deployments always route submissions to Resend’s `delivered@resend.dev` simulator and display a preview notice and test-only confirmation; Production sends to the organization. This behavior uses Vercel’s server-only `VERCEL_ENV`, never a request parameter.

A request ID survives retries until the form changes; the server adds a content hash to the Resend idempotency key, preventing duplicate sends of an unchanged request within Resend's 24-hour window. Pending submissions disable controls. Errors retain entered text and direct visitors to the email address. A successful response means Resend accepted the email, not that the team read it or that enrollment is confirmed. Delivery/bounce status remains available in Resend; no delivery webhook or automatic visitor receipt is implemented.

## Verification without contacting families

`npm run test:unit` covers server validation, size limits, origin/content-type restrictions, bot checks, fixed recipients, plain-text messages, idempotency, and provider failures using injected dependencies. Browser tests use dummy server credentials and intercept inquiry requests and BotID challenges; they cannot deliver mail. The blank configuration checks the email-draft fallback; the configured one checks submission, pending state, errors, and retry behavior.

For deployment checks, inspect the form, verify the sender in Resend, and exercise the Preview flow against its fixed simulator recipient. Production smoke checks must intercept submissions. Do not send real inquiries to the organization or families without explicit authorization. A simulator result is not proof of delivery into Google Workspace.

## Migration from the former checkout flow

The nonprofit community-program update removes the old registration form, no-CORS submission, monthly-billing agreement, price panel, and Stripe redirect/link. `NEXT_PUBLIC_REGISTRATION_ENDPOINT` and `NEXT_PUBLIC_STRIPE_PAYMENT_URL` are no longer read by the application. Remove those unused deployment variables after the new version is deployed; retain the hero-video setting.

Removing website checkout does not change existing subscriptions, external registration records, or the organization's current participation costs. Families are directed to the team for availability, participation details, and any costs before enrolling. The website does not claim that programs are free or already grant-funded.

Browser tests run with and without video configuration. The configured fixture also supplies retired integration variables to ensure that stale deployment settings cannot restore the checkout flow. Unexpected outbound requests and all registration/payment requests are blocked and fail the tests. Inquiry requests are intercepted; email drafts are inspected without opening an email client.

Reference: [Next.js environment variables](https://nextjs.org/docs/app/guides/environment-variables).
