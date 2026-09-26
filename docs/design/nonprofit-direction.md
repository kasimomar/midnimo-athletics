# Nonprofit visual direction — preserve scrollytelling

On September 26, the owner approved the warm palette with an explicit correction: preserve the current video, scrolling interactions, and page layout. Midnimo is both a nonprofit website and a demonstration of technical skills. The earlier static mockup below is a color study, not the approved layout. Item 14 applies the palette to the existing scrollytelling page.

Keep the existing logo, Fraunces headings, and Inter body text. Use warm cream (#F8F5ED) for the main background, forest green (#275D40) for actions, soft sage (#E5ECDF) for supporting panels, and deep green (#173A2B) for text and occasional dark sections. Body copy uses #506357. Buttons have clear outlines and at least 44px targets. Use the real logo and simple shapes until approved program photographs are supplied.

The superseded layout preview explored a static opening, mission copy, and a program card. The implementation retains the configured video, sticky 200vh hero, Framer Motion headline transforms, section order, cards, spacing, and existing typefaces. Cream/sage content sections alternate with deep-green hero, mission, and footer surfaces; light green and warm gold keep text readable on dark surfaces. It does not introduce new program facts, funding claims, or participant photography.

![Desktop direction](visual-direction-desktop.png)

<img src="visual-direction-mobile.png" width="300" alt="Mobile preview of the cream and green direction" />

## Selected content still pending

- **9 — real inquiry form:** Google Workspace is the receiving inbox. A website sending provider still needs to be chosen and configured. Resend was proposed; the current site continues to prepare email drafts and makes no delivery claim.
- **14 — apply visual style:** palette approved; preserve the current scrollytelling layout and video.
- **16 — team:** the initial Coach Osman bio uses the owner's supplied name, Head Coach/CEO role, and more than 20 years working with underrepresented and underprivileged youth in San Diego. Full name, founding story, coaching approach, and any photos are awaiting further details.
- **17 — support:** deferred at the owner's request while the organization settles its identity. No support section or donation processing is introduced.

## Accessibility verification

The current implementation adds a skip link and page landmarks, corrects heading levels, increases form text/border contrast and mobile menu targets, exposes autofill hints and a persistent draft-status region, and removes entrance/hover movement from content sections. The decorative hero video can be hidden; reduced-motion visitors never load it. A constant dark veil keeps hero copy legible over media.

Playwright checks keyboard navigation, the accessible names/roles exposed in Chromium's accessibility tree, reduced-motion behavior, and axe WCAG A/AA rules on desktop/mobile with the menu open and closed. These automated checks do not replace a manual VoiceOver/NVDA session or usability testing with participants; those remain outstanding.
