# 11 — Testing

## Static checks

Run:
- `npm run check`
- lint
- format check
- production build

## Manual responsive widths

Test at least:
- 360px
- 390px
- 768px
- 1024px
- 1440px

## Browser sanity

At minimum:
- Chrome
- Firefox
- Safari-compatible rendering if available

## Functional checks

- All navigation links work.
- All destination routes return 200.
- All CTA buttons behave correctly.
- WhatsApp link encodes text correctly.
- No CTA contains a fake phone number.
- Price formatting is consistent.
- No horizontal overflow on mobile.
- Sticky CTA does not cover footer/legal text.
- `piranti.east.local` is noindex.
- Production build contains no dev-only hostname in canonical URLs when built for production.

## Content QA

Cross-check every price against `content/normalized-pricing.json`.
Do not publish unresolved Korea Jeju anomaly without owner review.
