export const TOUR_CATEGORIES = [
  'wisata-indonesia',
  'wisata-asia',
  'wisata-multi-negara',
  'promo-dan-liburan',
] as const;

export const PROMO_THEMES = [
  'lebaran',
  'akhir-tahun',
  'liburan-sekolah',
] as const;

export type TourCategory = (typeof TOUR_CATEGORIES)[number];
export type PromoTheme = (typeof PROMO_THEMES)[number];

export interface TourDeparture {
  date: string;
  seasonTags: string[];
  dateNeedsVerification?: boolean;
  prices: {
    general?: number | null;
    adultTwinTriple?: number | null;
    childWithExtraBed?: number | null;
    childNoBed?: number | null;
    singleSupplement?: number | null;
  };
  [key: string]: unknown;
}

export interface TourEntryLike {
  id: string;
  data: {
    category: TourCategory;
    published: boolean;
    featured: boolean;
    bookingMode: 'scheduled' | 'by-request';
    destinations: string[];
    departures: TourDeparture[];
    [key: string]: unknown;
  };
}

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function getTourIdentity(id: string, frontmatterCategory: string) {
  const normalizedId = id.replace(/\.md$/, '');
  const parts = normalizedId.split('/');
  const category = parts[0];
  const slug = parts[1];

  if (
    parts.length !== 2 ||
    !TOUR_CATEGORIES.includes(category as TourCategory) ||
    !slugPattern.test(slug ?? '') ||
    slug === 'index' ||
    category !== frontmatterCategory
  ) {
    throw new Error(
      `Path paket wisata tidak valid atau tidak cocok dengan category: ${id}`,
    );
  }

  return {
    category: category as TourCategory,
    slug,
    url: `/${category}/${slug}`,
  };
}

export function getCanonicalTourUrl(entry: TourEntryLike) {
  return getTourIdentity(entry.id, entry.data.category).url;
}

function validated(entries: TourEntryLike[]) {
  for (const entry of entries) getCanonicalTourUrl(entry);
  return entries;
}

export function getPublishedTours<T extends TourEntryLike>(entries: T[]) {
  return validated(entries).filter((entry) => entry.data.published) as T[];
}

export function getFeaturedTours<T extends TourEntryLike>(entries: T[]) {
  return getPublishedTours(entries).filter((entry) => entry.data.featured);
}

export function getToursByCategory<T extends TourEntryLike>(
  entries: T[],
  category: TourCategory,
) {
  return getPublishedTours(entries).filter(
    (entry) => entry.data.category === category,
  );
}

export function getToursByDestination<T extends TourEntryLike>(
  entries: T[],
  destination: string,
) {
  return getPublishedTours(entries).filter((entry) =>
    entry.data.destinations.includes(destination),
  );
}

function dateInJakarta(date: Date) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Jakarta',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date);
  const value = Object.fromEntries(
    parts.map(({ type, value }) => [type, value]),
  );
  return `${value.year}-${value.month}-${value.day}`;
}

export function getUpcomingDepartures(entry: TourEntryLike, now = new Date()) {
  if (entry.data.bookingMode !== 'scheduled') return [];
  const today = dateInJakarta(now);
  return entry.data.departures
    .filter(
      (departure) =>
        departure.date >= today && departure.dateNeedsVerification !== true,
    )
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function getStartingPrice(entry: TourEntryLike, now = new Date()) {
  const prices = getUpcomingDepartures(entry, now).flatMap(({ prices }) =>
    [
      prices.general,
      prices.adultTwinTriple,
      prices.childWithExtraBed,
      prices.childNoBed,
    ].filter(
      (price): price is number => typeof price === 'number' && price > 0,
    ),
  );
  return prices.length ? Math.min(...prices) : null;
}

export function getPromoDepartures(
  entry: TourEntryLike,
  theme: PromoTheme,
  now = new Date(),
) {
  if (entry.data.category !== 'promo-dan-liburan') return [];
  return getUpcomingDepartures(entry, now).filter((departure) =>
    departure.seasonTags.includes(theme),
  );
}
