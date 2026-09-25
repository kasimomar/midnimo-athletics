# Deployment configuration

Copy `.env.example` to `.env.local` for local development. Next.js embeds `NEXT_PUBLIC_*` values into browser bundles at build time, so rebuild after changing them. These values are **public**, never credentials.

| Variable | Purpose | When absent or invalid |
| --- | --- | --- |
| `NEXT_PUBLIC_HERO_VIDEO_URL` | Optional HTTPS background-video URL | Gradient hero |

Blank, malformed, non-HTTPS, and credential-bearing URLs are treated as unconfigured. Reduced-motion visitors receive the static gradient even when a video URL is configured. The browser checks the visitor's preference before adding the video.

## Program inquiries and contact

The organization-provided email is `admin@midnimoathletics.com`, defined once in `lib/contact.ts`. Program-interest links open the visitor's email app. The contact form prepares an encoded email draft, then offers an explicit **Open Email App** link. Visitors review and send from their own email service. Editing the form clears an outdated draft.

The website does not send email, confirm delivery, store inquiries, or confirm enrollment. Visitors without a configured email app can copy the displayed address and message into their email service. No diagnosis or athlete records are collected in the initial program-interest section.

## Migration from the former checkout flow

The nonprofit community-program update removes the old registration form, no-CORS submission, monthly-billing agreement, price panel, and Stripe redirect/link. `NEXT_PUBLIC_REGISTRATION_ENDPOINT` and `NEXT_PUBLIC_STRIPE_PAYMENT_URL` are no longer read by the application. Remove those unused deployment variables after the new version is deployed; retain the hero-video setting.

Removing website checkout does not change existing subscriptions, external registration records, or the organization's current participation costs. Families are directed to the team for availability, participation details, and any costs before enrolling. The website does not claim that programs are free or already grant-funded.

Browser tests run with and without video configuration. The configured fixture also supplies retired integration variables to ensure that stale deployment settings cannot restore the checkout flow. Unexpected outbound requests and all registration/payment requests are blocked and fail the tests. Email drafts are inspected without opening an email client or sending a message.

Reference: [Next.js environment variables](https://nextjs.org/docs/app/guides/environment-variables).
