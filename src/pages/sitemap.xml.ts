import type { APIRoute } from 'astro';
import { siteConfig } from '../config/site';
import { getTourEntries } from '../lib/tour-content';
import {
  getCanonicalTourUrl,
  getPublishedTours,
  PROMO_THEMES,
  TOUR_CATEGORIES,
} from '../lib/tours';
import { requiredDestinations } from '../lib/tour-taxonomy';

const fixedRoutes = [
  '',
  'paket-wisata',
  'wisata-indonesia',
  'wisata-asia',
  'wisata-multi-negara',
  'promo-dan-liburan',
  'sewa-mobil',
  'japan',
  'korea',
  'bangkok',
  'singapore',
  'about',
  'contact',
  'privacy',
  'terms',
];
const escapeXml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');

export const GET: APIRoute = async () => {
  const entries = getPublishedTours(await getTourEntries());
  const dynamic = [
    ...entries.map(getCanonicalTourUrl),
    ...entries.flatMap((entry) =>
      entry.data.destinations.map(
        (destination) => `/${entry.data.category}/destinasi/${destination}`,
      ),
    ),
    ...PROMO_THEMES.map((theme) => `/promo-dan-liburan/tema/${theme}`),
    ...TOUR_CATEGORIES.flatMap((category) =>
      requiredDestinations[category].map(
        (destination) => `/${category}/destinasi/${destination}`,
      ),
    ),
  ];
  const routes = [
    ...new Set([...fixedRoutes.map((route) => `/${route}`), ...dynamic]),
  ];
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map((route) => `<url><loc>${escapeXml(new URL(route, siteConfig.origin).toString())}</loc></url>`).join('')}</urlset>`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
};
