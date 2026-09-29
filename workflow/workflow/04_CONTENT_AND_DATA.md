# 04 — Content & Data Model

## Rule

Pricing and service terms must be data-driven.

Create:
- `src/data/site.ts`
- `src/data/destinations/japan.ts`
- `src/data/destinations/korea.ts`
- `src/data/destinations/bangkok.ts`
- `src/data/destinations/singapore.ts`

Use `content/normalized-pricing.json` as the initial transcription source.

## Required types

Define TypeScript types for:
- Destination
- ServicePrice
- Vehicle
- Inclusion
- Exclusion
- FAQ
- CTAConfig

## Currency formatting

Create one formatter:
- Locale: `id-ID`
- Currency: `IDR`
- Do not manually concatenate commas/periods.

## Pricing disclaimer

At minimum:
`Harga dapat berubah sesuai tanggal perjalanan, musim, rute, durasi, dan ketersediaan. Konfirmasi harga final melalui Piranti Travel sebelum booking.`

Show destination-specific caveats where present.

## Korea data warning

The source line for Jeju Tour contains stray text `270,000` before `IDR 5,950,000`.
Do not silently reinterpret it.
Use IDR 5,950,000 as the displayed main figure only if approved, and keep a code comment / content QA note until business confirmation.

## Unknown content

Do not fabricate:
- testimonials
- star ratings
- customer counts
- "trusted by X"
- exact response time
- company address
- legal registration
