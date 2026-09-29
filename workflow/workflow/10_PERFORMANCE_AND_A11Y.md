# 10 — Performance & Accessibility

## Performance budget

Targets on mobile:
- Lighthouse Performance >= 90
- Accessibility >= 95
- Best Practices >= 95
- SEO >= 95

Prefer:
- static HTML
- minimal JS
- optimized images
- responsive `srcset`
- WebP/AVIF when appropriate
- lazy-load below-fold images
- preload only critical assets

## LCP

The hero image, if any:
- must have explicit dimensions
- must not be lazy-loaded
- avoid oversized photography

## Fonts

Prefer system font or one optimized font family.
Use `font-display: swap`.

## Accessibility

Test:
- keyboard-only navigation
- focus visibility
- color contrast
- heading order
- form labels if forms are introduced
- reduced-motion preference
- alt text

Do not use flags as the only destination label.
