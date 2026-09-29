import type { Destination } from '../../types';

export const japan: Destination = {
  slug: 'japan',
  name: 'Japan',
  eyebrow: 'Private transport di Jepang',
  title: 'Jelajahi Jepang dengan kendaraan privat dan driver',
  description:
    'City tour Tokyo, Osaka, Kyoto, perjalanan ke Mt. Fuji, serta transfer Narita, Haneda, Kansai, dan Itami.',
  summary:
    'Alphard dan HiAce untuk city tour, day trip, serta airport transfer.',
  accent: 'sakura',
  highlights: [
    'Tokyo, Osaka & Kyoto',
    'Mt. Fuji day trip',
    '4 pilihan airport transfer',
  ],
  fleet: ['Toyota Alphard', 'Toyota HiAce'],
  priceColumns: ['Alphard', 'HiAce'],
  services: [
    {
      service: 'Osaka/Tokyo/Kyoto City Tour',
      prices: { Alphard: 7450000, HiAce: 8600000 },
    },
    {
      service: 'Mt. Fuji One Day Trip',
      prices: { Alphard: 9200000, HiAce: 9800000 },
    },
    {
      service: 'Narita Airport Transfer',
      prices: { Alphard: 3680000, HiAce: 3800000 },
    },
    {
      service: 'Haneda Airport Transfer',
      prices: { Alphard: 2650000, HiAce: 2900000 },
    },
    {
      service: 'Kansai Airport Transfer',
      prices: { Alphard: 3250000, HiAce: 3450000 },
    },
    {
      service: 'Itami Airport Transfer',
      prices: { Alphard: 2990000, HiAce: 3200000 },
    },
  ],
  inclusions: ['Driver', 'Parkir', 'Tol', 'Bahan bakar', 'Makan driver'],
  exclusions: ['Tiket masuk objek wisata'],
  terms: [
    'Durasi tur 10 jam.',
    'Maksimal overtime 2 jam per hari.',
    'Ketersediaan bahasa driver terbatas.',
    'Harga dapat berubah mengikuti musim.',
  ],
  faqs: [
    {
      question: 'Berapa lama durasi city tour Jepang?',
      answer:
        'Durasi city tour pada daftar harga adalah 10 jam, dengan maksimal overtime 2 jam per hari.',
    },
    {
      question: 'Apakah tiket wisata termasuk?',
      answer:
        'Tidak. Tiket masuk objek wisata belum termasuk dalam harga transport.',
    },
    {
      question: 'Bandara apa saja yang dilayani?',
      answer:
        'Tersedia referensi harga transfer Narita, Haneda, Kansai, dan Itami.',
    },
  ],
  seo: {
    title: 'Sewa Mobil Jepang dengan Driver | Piranti Travel',
    description:
      'Cek referensi harga Alphard dan HiAce untuk city tour Jepang, Mt. Fuji, serta airport transfer bersama Piranti Travel.',
  },
};
