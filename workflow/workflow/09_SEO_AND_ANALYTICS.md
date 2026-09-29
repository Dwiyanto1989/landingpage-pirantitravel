# 09 — SEO & Analytics

## Development environment

`piranti.east.local` must be NOINDEX.

Implement:
- `<meta name="robots" content="noindex,nofollow">`
- optionally host-level `X-Robots-Tag: noindex, nofollow`

## Production

Production should be indexable only after launch approval.

## Titles

Examples:
- Home: `Piranti Travel | Private Transport Jepang, Korea, Bangkok & Singapore`
- Japan: `Sewa Mobil Jepang dengan Driver | Piranti Travel`
- Korea: `Sewa Mobil Korea & Airport Transfer | Piranti Travel`
- Bangkok: `Sewa VIP Van Bangkok | Piranti Travel`
- Singapore: `Sewa HiAce, Coaster & Bus Singapore | Piranti Travel`

Review titles for length before final launch.

## Metadata

Each page:
- unique title
- unique meta description
- canonical
- OG title/description/image
- Twitter card metadata
- favicon
- theme-color

## Structured data

Use suitable schema.org JSON-LD such as:
- Organization / TravelAgency where truthful
- Service for destination services
- FAQPage only when visible FAQ content is present

Do not add AggregateRating without real rating data.

## Analytics

Prepare conditional integration for:
- GTM
- GA4
- Google Ads conversions

All IDs from environment variables.
