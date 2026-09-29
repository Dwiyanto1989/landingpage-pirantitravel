# 15 — Production Deployment

Production target:
`https://piranti-travel.com`

## Before deployment

Obtain:
- production DNS access
- production TLS certificate strategy (e.g. Let's Encrypt)
- WhatsApp number
- business email
- approved legal text
- final image assets
- GTM/GA4/Google Ads IDs
- final price validation

## Deployment sequence

1. Merge approved code.
2. Build production image.
3. Run container on loopback, preferably a dedicated port.
4. Create production Nginx vhost.
5. Obtain/install TLS certificate.
6. Set production origin.
7. Remove dev noindex behavior.
8. Add production analytics IDs.
9. Smoke test all routes.
10. Validate canonical URLs.
11. Validate robots/sitemap.
12. Test WhatsApp conversions.
13. Run Lighthouse.
14. Only then point Google Ads to production landing URLs.

## Recommended production URLs for Ads

- `https://piranti-travel.com/japan`
- `https://piranti-travel.com/korea`
- `https://piranti-travel.com/bangkok`
- `https://piranti-travel.com/singapore`

## Rollback

Keep previous image tag available.
Rollback should be:
1. start previous image
2. verify localhost response
3. reload host Nginx only if upstream changes
