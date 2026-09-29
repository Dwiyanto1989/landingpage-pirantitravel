# 03 — Design System

## Direction

Clean, modern, travel-oriented, conversion-first.

Use the supplied Piranti Travel logo as the visual anchor.

## Brand palette

Derive exact colors from the logo during implementation.

Suggested semantic tokens:
- `brand-primary`: teal/dark cyan sampled from logo
- `brand-accent`: orange sampled from mascot
- `surface`: white
- `surface-muted`: light neutral
- `text`: charcoal
- `text-muted`: cool gray
- `success`: use a restrained green only where semantically needed

Do not turn the site into a multi-color marketplace UI.

## Typography

Use a high-performance web-safe/system-first stack or a locally optimized web font.
Avoid loading multiple font families.

Recommended:
- Headings: modern geometric sans
- Body: clean sans

## Layout

- Max content width: 1200–1280px
- Mobile-first
- Generous white space
- 8px spacing scale
- Rounded cards, moderate radius
- Clear visual hierarchy
- Large tap targets (>= 44px)

## Buttons

Primary:
- strong brand/accent contrast
- label examples:
  - `Cek Harga & Availability`
  - `Chat via WhatsApp`

Secondary:
- outline/ghost variant

## Card types

- DestinationCard
- ServiceCard
- PriceCard
- FleetCard
- FeatureCard
- FAQItem

## Accessibility

- WCAG-aware contrast
- keyboard focus rings
- semantic headings
- buttons are buttons; links are links
- no text baked into generated decorative images
