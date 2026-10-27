import assert from 'node:assert/strict';
import test from 'node:test';

import {
  getCanonicalTourUrl,
  getFeaturedTours,
  getPromoDepartures,
  getPublishedTours,
  getRelatedTours,
  getStartingPrice,
  getTourIdentity,
  getToursByCategory,
  getToursByDestination,
  getUpcomingDepartures,
} from '../src/lib/tours.ts';
import {
  buildTourWhatsAppLink,
  buildTourWhatsAppMessage,
} from '../src/lib/whatsapp.ts';
import { resolveTourImages, TOUR_PLACEHOLDER } from '../src/lib/tour-media.ts';

const scheduledTour = {
  id: 'promo-dan-liburan/liburan-asia',
  data: {
    category: 'promo-dan-liburan',
    published: true,
    featured: true,
    bookingMode: 'scheduled',
    destinations: ['jepang'],
    departures: [
      {
        date: '2026-11-30',
        seasonTags: ['akhir-tahun'],
        prices: { adultTwinTriple: 9_000_000 },
      },
      {
        date: '2026-12-20',
        seasonTags: ['akhir-tahun'],
        prices: {
          adultTwinTriple: 10_000_000,
          childNoBed: 8_500_000,
          singleSupplement: 2_000_000,
        },
      },
      {
        date: '2027-03-10',
        seasonTags: ['lebaran'],
        prices: { adultTwinTriple: 12_000_000 },
      },
    ],
  },
} as any;

const draftTour = {
  id: 'wisata-asia/draft-tour',
  data: {
    category: 'wisata-asia',
    published: false,
    featured: true,
    bookingMode: 'by-request',
    destinations: ['jepang'],
    departures: [],
  },
} as any;

test('derives category, slug, and canonical URL from the content id', () => {
  assert.deepEqual(getTourIdentity('wisata-asia/paket-jepang', 'wisata-asia'), {
    category: 'wisata-asia',
    slug: 'paket-jepang',
    url: '/wisata-asia/paket-jepang',
  });
  assert.equal(
    getCanonicalTourUrl(scheduledTour),
    '/promo-dan-liburan/liburan-asia',
  );
});

test('rejects unsafe or mismatched content paths', () => {
  for (const [id, category] of [
    ['wisata-asia/Nama-Tour', 'wisata-asia'],
    ['wisata-asia/subfolder/nama-tour', 'wisata-asia'],
    ['../wisata-asia/nama-tour', 'wisata-asia'],
    ['wisata-asia/index', 'wisata-asia'],
    ['kategori-lain/nama-tour', 'kategori-lain'],
    ['wisata-asia/nama-tour', 'wisata-indonesia'],
  ]) {
    assert.throws(() => getTourIdentity(id, category), /paket wisata/i);
  }
});

test('keeps drafts out of published and featured selectors', () => {
  assert.deepEqual(getPublishedTours([scheduledTour, draftTour]), [
    scheduledTour,
  ]);
  assert.deepEqual(getFeaturedTours([scheduledTour, draftTour]), [
    scheduledTour,
  ]);
});

test('filters published tours by storage category and discoverable destination', () => {
  assert.deepEqual(
    getToursByCategory([scheduledTour, draftTour], 'promo-dan-liburan'),
    [scheduledTour],
  );
  assert.deepEqual(
    getToursByDestination([scheduledTour, draftTour], 'jepang'),
    [scheduledTour],
  );
});

test('related tours prioritize shared destinations and exclude current or draft entries', () => {
  const current = {
    ...scheduledTour,
    id: 'wisata-asia/current-tour',
    data: {
      ...scheduledTour.data,
      category: 'wisata-asia',
      destinations: ['jepang', 'tokyo'],
      tags: ['winter', 'family'],
    },
  } as any;
  const sharedDestination = {
    ...scheduledTour,
    id: 'wisata-asia/shared-destination',
    data: {
      ...current.data,
      destinations: ['jepang'],
      tags: ['family'],
    },
  } as any;
  const sharedTag = {
    ...scheduledTour,
    id: 'wisata-asia/shared-tag',
    data: {
      ...current.data,
      destinations: ['korea-selatan'],
      tags: ['winter'],
    },
  } as any;
  const sameCategory = {
    ...scheduledTour,
    id: 'wisata-asia/same-category',
    data: {
      ...current.data,
      destinations: ['vietnam'],
      tags: [],
    },
  } as any;

  assert.deepEqual(
    getRelatedTours(
      [current, sharedTag, draftTour, sameCategory, sharedDestination],
      current,
      3,
    ).map((entry) => entry.id),
    [sharedDestination.id, sharedTag.id, sameCategory.id],
  );
});

test('derives availability and starting price only from upcoming dated tiers', () => {
  const now = new Date('2026-12-01T00:00:00+07:00');
  assert.deepEqual(
    getUpcomingDepartures(scheduledTour, now).map(({ date }: any) => date),
    ['2026-12-20', '2027-03-10'],
  );
  assert.equal(getStartingPrice(scheduledTour, now), 8_500_000);
  assert.equal(getStartingPrice(draftTour, now), null);
});

test('promo themes expose only matching upcoming departure offers', () => {
  const now = new Date('2026-12-01T00:00:00+07:00');
  assert.deepEqual(
    getPromoDepartures(scheduledTour, 'akhir-tahun', now).map(
      ({ date }: any) => date,
    ),
    ['2026-12-20'],
  );
  assert.deepEqual(
    getPromoDepartures(scheduledTour, 'lebaran', now).map(
      ({ date }: any) => date,
    ),
    ['2027-03-10'],
  );
});

test('tour inquiry preserves package context without inventing customer details', () => {
  const message = buildTourWhatsAppMessage(
    'Paket Jepang',
    'https://piranti.east.local/wisata-asia/paket-jepang',
  );
  assert.match(message, /Paket: Paket Jepang/);
  assert.match(message, /URL: https:\/\/piranti\.east\.local/);
  assert.match(
    buildTourWhatsAppLink('+62 838-7335-5999', 'Paket Jepang', '/paket') ?? '',
    /^https:\/\/wa\.me\/6283873355999\?/,
  );
});

test('missing or unsafe media resolves to the truthful local placeholder', () => {
  assert.equal(
    resolveTourImages('/missing.webp', [], 'Paket Uji')[0]?.src,
    TOUR_PLACEHOLDER,
  );
  assert.equal(
    resolveTourImages('https://example.com/hotlink.jpg', [], 'Paket Uji')[0]
      ?.src,
    TOUR_PLACEHOLDER,
  );
});
