# QA report

Validated on 2026-09-29 against `workflow/workflow/14_ACCEPTANCE_CHECKLIST.md`.

## Passed

- Brand logo renders from `public/brand/piranti-travel-logo.png`; no fabricated claims, reviews, ratings, registrations, or contact values.
- Required routes return HTTP 200: `/`, `/japan`, `/korea`, `/bangkok`, `/singapore`, `/privacy`, and `/terms`.
- `robots.txt` and `sitemap.xml` return HTTP 200.
- Responsive screenshots reviewed at 360, 390, 768, 1024, and 1440 px. Header, cards, pricing, CTA hierarchy, and footer remain readable without page-level horizontal overflow.
- Mobile pricing uses stacked rows; desktop pricing uses semantic tables.
- Pricing integrity test passes against `workflow/content/normalized-pricing.json` for all four destinations.
- Destination terms, exclusions, general disclaimer, and the unresolved Korea Jeju warning are visible.
- WhatsApp URL generation strips non-digits and URL-encodes destination-aware inquiry text.
- WhatsApp values come only from environment configuration; empty configuration renders a clear disabled state and hides the unusable mobile sticky bar.
- Active CTAs expose conversion, destination, and placement data attributes and push `whatsapp_click` to `dataLayer`.
- Each page has a unique title, description, canonical, Open Graph/Twitter metadata, and truthful structured data without ratings.
- Development output uses `noindex,nofollow` and disallows crawling in `robots.txt`.
- Production output switches to `piranti-travel.com`, is indexable, and contains no development hostname in canonical metadata.
- Static output contains no application JavaScript bundle; only the small analytics/CTA hook is inline.
- Docker image uses a Node build stage and `nginx:alpine` runtime stage.
- Container Nginx configuration syntax passes.
- Compose binds only `127.0.0.1:8085`, uses `restart: unless-stopped`, and serves all required routes.
- Prepared host Nginx vhost syntax passes after replacing certificate placeholders with temporary test certificate paths.
- `.env` is ignored and no secrets are committed.

## Commands run

- `npm ci` / `npm install`
- `npm test`
- `npm run check`
- `npm run lint`
- `npm run build`
- `PUBLIC_SITE_ENV=production npm run build`
- `docker compose up -d --build`
- `docker exec piranti-travel-web nginx -t`
- HTTP 200 smoke tests against every required route
- Playwright Chromium screenshots at the five required responsive widths
- Lighthouse mobile audit against the Docker endpoint

## Lighthouse

| Build                      | Performance | Accessibility | Best Practices | SEO |
| -------------------------- | ----------: | ------------: | -------------: | --: |
| Development                |         100 |           100 |            100 |  69 |
| Production-mode validation |         100 |           100 |            100 | 100 |

The development SEO score is intentionally reduced by `noindex,nofollow`, which is a project requirement rather than a defect.

## Host-only handoff

Host Nginx enablement, real wildcard certificate paths, and hostname resolution remain outside the application repository. The checked-in vhost is ready at `deploy/nginx/piranti.east.local.conf`.
