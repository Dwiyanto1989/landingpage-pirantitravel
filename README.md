# Piranti Travel landing page

Static, mobile-first landing site for Piranti Travel. It uses Astro, strict TypeScript, Tailwind CSS, and an `nginx:alpine` runtime container. The primary conversion is a destination-aware WhatsApp inquiry.

## Local development

Requirements: Node.js 22.12+ and npm.

```bash
cp .env.example .env
npm ci
npm run dev
```

Without `PUBLIC_WHATSAPP_NUMBER`, WhatsApp CTAs intentionally render disabled. Supply digits with an international country code in `.env`; do not commit `.env`.

## Validation

```bash
npm test
npm run check
npm run lint
npm run build
```

## Docker development runtime

```bash
cp .env.example .env
docker compose up -d --build
curl -I http://127.0.0.1:8085/
```

The port is bound only to host loopback. TLS is not configured in the application container.

## Host Nginx for `piranti.east.local`

The prepared vhost is at `deploy/nginx/piranti.east.local.conf`. Replace the two `/PATH/TO/WILDCARD/` certificate placeholders, then install and enable it on the host:

```bash
sudo cp deploy/nginx/piranti.east.local.conf /etc/nginx/sites-available/piranti.east.local
sudo ln -s /etc/nginx/sites-available/piranti.east.local /etc/nginx/sites-enabled/piranti.east.local
sudo nginx -t
sudo systemctl reload nginx
curl -Ik https://piranti.east.local/
```

The development build emits `noindex,nofollow`; the host vhost also sends `X-Robots-Tag: noindex, nofollow`.

## Production build

Set approved values in `.env`, including `PUBLIC_SITE_ENV=production`, then rebuild the image. Astro values are embedded at build time, so changing `.env` requires a rebuild.

```bash
docker compose build --no-cache
docker compose up -d
```

Production canonical URLs use `https://piranti-travel.com`. Do not launch until pricing, legal copy, contact details, DNS/TLS, and analytics values have been approved. Google Ads conversion IDs are configuration placeholders only; no conversion is fired until an approved implementation is configured.

## Content model

- Shared configuration: `src/config/site.ts`
- Shared page content: `src/data/site.ts`
- Destination pricing and terms: `src/data/destinations/`
- Original normalized source: `workflow/content/normalized-pricing.json`

The Korea Jeju source anomaly remains visibly noted and must be resolved before public production launch.
