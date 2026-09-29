# Piranti Travel — Codex Workflow Pack

Target: build a fast, SEO-friendly Google Ads landing site for **Piranti Travel**.

Development host:
- Ubuntu 24.04 physical host
- Host Nginx terminates TLS
- Wildcard certificate for `*.east.local`
- Development hostname: `piranti.east.local`
- Application runs in Docker
- Production domain later: `piranti-travel.com`

Recommended stack:
- Astro
- Tailwind CSS
- TypeScript
- Static output
- nginx:alpine runtime container
- Docker Compose
- Host Nginx reverse proxy
- Google Tag Manager / GA4 / Google Ads conversion hooks prepared but disabled until IDs are supplied

Primary conversion:
- WhatsApp click / inquiry

Destinations:
- Japan
- Korea
- Bangkok
- Singapore

This pack is designed so Codex can execute the project from phase 00 through production deployment without inventing requirements.

## Start here

1. Read `AGENTS.md`.
2. Read `workflow/00_PROJECT_START.md`.
3. Execute phases in numeric order.
4. Do not skip acceptance checks.
5. Keep all prices/content in structured data files rather than hardcoding them in page markup.
6. Use placeholders for any business information not yet supplied (WhatsApp number, legal entity, social links, analytics IDs).
