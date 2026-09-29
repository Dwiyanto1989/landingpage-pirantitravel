import type { APIRoute } from 'astro';
import { siteConfig } from '../config/site';

export const GET: APIRoute = () =>
  new Response(
    siteConfig.isProduction
      ? `User-agent: *\nAllow: /\nSitemap: ${siteConfig.prodOrigin}/sitemap.xml\n`
      : 'User-agent: *\nDisallow: /\n',
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
