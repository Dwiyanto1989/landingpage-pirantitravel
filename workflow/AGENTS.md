# AGENTS.md — Instructions for Codex

You are implementing the Piranti Travel landing-site project.

## Non-negotiable architecture

- Framework: Astro
- Language: TypeScript
- Styling: Tailwind CSS
- Output: static HTML
- Runtime container: nginx:alpine
- TLS: terminated by Nginx on the Ubuntu host, not inside the app container
- Development hostname: `piranti.east.local`
- Development binding: app container exposed only to `127.0.0.1`
- Production domain: `piranti-travel.com`
- No database in v1
- No login/authentication
- No booking engine in v1
- Primary CTA: WhatsApp inquiry

## Engineering rules

- Mobile-first.
- Prioritize Lighthouse/Core Web Vitals.
- Avoid unnecessary client-side JavaScript.
- Prefer Astro components and semantic HTML.
- All repeated content belongs in typed data structures.
- Prices must live in `src/data/`.
- Do not invent unavailable business claims, ratings, review counts, certifications, years of experience, or customer totals.
- Do not display a price as guaranteed/final when source terms indicate seasonality or additional charges.
- Add clear price disclaimers.
- Accessibility: keyboard navigation, visible focus, meaningful alt text, sufficient contrast.
- SEO: unique title/meta description/canonical per page, Open Graph tags, structured data where appropriate.
- Images should use proper dimensions and lazy loading except the LCP image.
- Use only the supplied Piranti Travel logo as the brand source unless additional assets are provided.
- Do not modify host firewall, DNS, or TLS files unless explicitly told to.

## Business/content rules

Brand: Piranti Travel  
Dev domain: `https://piranti.east.local`  
Production domain: `https://piranti-travel.com`

Destinations:
- Japan
- Korea
- Bangkok
- Singapore

Primary page routes:
- `/`
- `/japan`
- `/korea`
- `/bangkok`
- `/singapore`
- `/privacy`
- `/terms`

The homepage is a brand/destination overview.
Paid-search campaigns should land on destination-specific pages.

## Unknowns that MUST remain placeholders

- WhatsApp phone number
- Email address
- Physical office address
- Social media links
- Legal company name
- Google Tag Manager ID
- GA4 Measurement ID
- Google Ads Conversion ID / Label
- Testimonials/reviews
- Official business registration details

Use a single config file for these values so they can be filled later.

## Definition of done

The work is not complete until all checks in `workflow/14_ACCEPTANCE_CHECKLIST.md` pass.
