# 14 — Acceptance Checklist

Do not call v1 complete until all applicable items pass.

## Brand
- [ ] Piranti Travel logo renders correctly.
- [ ] Brand name is spelled consistently.
- [ ] No invented brand claims.

## Routes
- [ ] `/`
- [ ] `/japan`
- [ ] `/korea`
- [ ] `/bangkok`
- [ ] `/singapore`
- [ ] `/privacy`
- [ ] `/terms`

## Mobile
- [ ] 360px layout has no horizontal overflow.
- [ ] Header works.
- [ ] Cards are readable.
- [ ] Pricing is readable.
- [ ] Sticky WhatsApp CTA works and does not cover content.

## Content
- [ ] Japan prices verified.
- [ ] Korea prices verified.
- [ ] Bangkok prices verified.
- [ ] Singapore prices verified.
- [ ] Destination terms/exclusions are shown.
- [ ] General price disclaimer is visible.
- [ ] Korea Jeju source anomaly is resolved before public production launch.

## Conversion
- [ ] WhatsApp number comes from environment config.
- [ ] No fake number is committed.
- [ ] WhatsApp prefilled message is URL encoded.
- [ ] CTA placement context is trackable.
- [ ] `whatsapp_click` event hook exists.

## SEO
- [ ] Unique title per page.
- [ ] Unique description per page.
- [ ] Canonical per page.
- [ ] OG metadata.
- [ ] Dev site is noindex.
- [ ] Production environment can be switched to indexable.
- [ ] No fake ratings in structured data.

## Performance
- [ ] Production build succeeds.
- [ ] Lighthouse Performance >= 90 mobile target.
- [ ] Accessibility >= 95 target.
- [ ] Images optimized.
- [ ] Minimal client JS.

## Docker
- [ ] Multi-stage Docker build works.
- [ ] Runtime image contains no Node runtime requirement.
- [ ] Container is reachable on `127.0.0.1:8085`.
- [ ] Container restarts automatically.

## Host Nginx
- [ ] `nginx -t` passes.
- [ ] HTTP redirects to HTTPS.
- [ ] HTTPS proxies successfully.
- [ ] Dev response sends `X-Robots-Tag: noindex, nofollow`.

## Git
- [ ] `.env` is ignored.
- [ ] No secrets committed.
- [ ] README has local run instructions.
- [ ] Final branch is clean.
