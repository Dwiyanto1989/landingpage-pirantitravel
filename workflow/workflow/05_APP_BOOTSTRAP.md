# 05 — Astro Application Bootstrap

## Create application

Use Astro with TypeScript strict mode.

Install:
- Astro
- Tailwind CSS integration
- optional icon package only if tree-shakable
- ESLint / Prettier if desired

Do not install a UI framework unless necessary.

## Output mode

Static output.

## Recommended scripts

- `dev`
- `build`
- `preview`
- `check`
- `lint`
- `format`
- `test` if automated tests are added

## Base components

Create:
- `Header.astro`
- `Footer.astro`
- `Hero.astro`
- `DestinationCard.astro`
- `ServiceCard.astro`
- `PriceTable.astro` or `PriceCards.astro`
- `FleetCard.astro`
- `FeatureGrid.astro`
- `BookingSteps.astro`
- `FAQ.astro`
- `WhatsAppCTA.astro`
- `MobileStickyCTA.astro`
- `SeoHead.astro`

## Layout

Create:
- `BaseLayout.astro`

It must support:
- title
- description
- canonical URL
- Open Graph metadata
- optional noindex for development
