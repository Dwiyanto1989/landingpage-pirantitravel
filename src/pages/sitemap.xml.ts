import type { APIRoute } from 'astro';
import { siteConfig } from '../config/site';

const routes = [
  '',
  'japan',
  'korea',
  'bangkok',
  'singapore',
  'privacy',
  'terms',
];
export const GET: APIRoute = () =>
  new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map((route) => `<url><loc>${siteConfig.origin}/${route}</loc></url>`).join('')}</urlset>`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
