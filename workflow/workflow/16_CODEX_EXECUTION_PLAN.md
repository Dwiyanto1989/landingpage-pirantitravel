# 16 — Codex Execution Plan

Run this project in small, reviewable passes.

## Pass 1 — Bootstrap
Prompt:
`Read AGENTS.md and workflow 00-06. Bootstrap the Astro + Tailwind project, typed site configuration, structured destination data, and basic layout. Do not design the final pages yet. Run checks and report changed files.`

## Pass 2 — Homepage
Prompt:
`Implement the homepage according to workflow 01-07. Use the supplied Piranti Travel logo, mobile-first layout, semantic HTML, no fabricated claims, and reusable components. Run build/check.`

## Pass 3 — Destination pages
Prompt:
`Implement /japan, /korea, /bangkok, and /singapore from the structured data. Show inclusions/exclusions and relevant price caveats. Do not silently repair source ambiguities. Run build/check.`

## Pass 4 — Conversion
Prompt:
`Implement WhatsApp CTA generation from environment config, destination-specific prefilled messages, mobile sticky CTA, and data attributes/event hooks from workflow 08. Do not invent a phone number.`

## Pass 5 — SEO
Prompt:
`Implement SEO metadata, canonical handling, Open Graph tags, sitemap/robots behavior, and truthful JSON-LD according to workflow 09. Dev must be noindex.`

## Pass 6 — Polish
Prompt:
`Review visual consistency, mobile layout, accessibility, image sizing, focus states, and Core Web Vitals risks. Fix issues without adding unnecessary JS.`

## Pass 7 — Docker
Prompt:
`Implement the multi-stage Dockerfile, app Nginx config, and docker-compose from workflow 12. Bind only to 127.0.0.1:8085. Build and test the container.`

## Pass 8 — Host integration
Prompt:
`Prepare, but do not automatically overwrite, the host Nginx vhost for piranti.east.local using workflow 13. Validate syntax and provide exact deployment commands.`

## Pass 9 — Final QA
Prompt:
`Execute every applicable item in workflow/14_ACCEPTANCE_CHECKLIST.md. Fix failures. Produce a concise QA report with unresolved business inputs separated from technical issues.`

## Pass 10 — Production prep
Prompt:
`Prepare production config for piranti-travel.com from workflow 15, but keep launch gated on final business values, price verification, analytics IDs, DNS and TLS readiness.`
