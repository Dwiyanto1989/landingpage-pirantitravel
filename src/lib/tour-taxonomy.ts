import type { TourCategory, PromoTheme } from './tours';

export const categoryMeta: Record<
  TourCategory,
  { title: string; seoTitle: string; description: string; keywords: string[] }
> = {
  'wisata-indonesia': {
    title: 'Wisata Indonesia',
    seoTitle: 'Paket Wisata Indonesia | Piranti Travel',
    description:
      'Temukan paket wisata Indonesia untuk liburan domestik, mulai dari open trip hingga private tour dengan rute dan harga yang mudah dibandingkan.',
    keywords: [
      'paket wisata Indonesia',
      'open trip Indonesia',
      'private tour Indonesia',
    ],
  },
  'wisata-asia': {
    title: 'Wisata Asia',
    seoTitle: 'Paket Wisata Asia Terbaru | Piranti Travel',
    description:
      'Jelajahi paket wisata Asia ke Jepang, Korea, Thailand, Vietnam, China, dan destinasi favorit lainnya dengan jadwal serta pilihan harga yang jelas.',
    keywords: ['paket wisata Asia', 'tour Asia', 'liburan Asia'],
  },
  'wisata-multi-negara': {
    title: 'Wisata Multi-Negara',
    seoTitle: 'Paket Tour Multi-Negara | Piranti Travel',
    description:
      'Temukan paket tour multi-negara untuk mengunjungi beberapa destinasi Asia dalam satu perjalanan yang praktis, terencana, dan nyaman.',
    keywords: [
      'paket tour multi-negara',
      'wisata beberapa negara',
      'tour Asia multi-negara',
    ],
  },
  'promo-dan-liburan': {
    title: 'Promo dan Liburan',
    seoTitle: 'Promo Paket Liburan Terbaru | Piranti Travel',
    description:
      'Temukan promo paket liburan untuk Lebaran, akhir tahun, dan liburan sekolah berdasarkan jadwal keberangkatan yang tersedia.',
    keywords: ['promo paket liburan', 'promo wisata', 'paket liburan terbaru'],
  },
};

export const promoThemeMeta: Record<
  PromoTheme,
  { title: string; seoTitle: string; description: string; keywords: string[] }
> = {
  lebaran: {
    title: 'Paket Libur Lebaran',
    seoTitle: 'Paket Wisata Libur Lebaran | Piranti Travel',
    description:
      'Temukan paket wisata libur Lebaran dengan jadwal keberangkatan yang tersedia, pilihan destinasi menarik, dan rincian harga untuk dibandingkan.',
    keywords: ['paket libur Lebaran', 'wisata Lebaran', 'promo tour Lebaran'],
  },
  'akhir-tahun': {
    title: 'Paket Libur Akhir Tahun',
    seoTitle: 'Paket Wisata Akhir Tahun | Piranti Travel',
    description:
      'Pilih paket wisata akhir tahun ke destinasi Asia favorit dengan jadwal keberangkatan, itinerary, fasilitas, dan harga yang mudah dibandingkan.',
    keywords: [
      'paket libur akhir tahun',
      'wisata akhir tahun',
      'tour tahun baru',
    ],
  },
  'liburan-sekolah': {
    title: 'Paket Liburan Sekolah',
    seoTitle: 'Paket Wisata Liburan Sekolah | Piranti Travel',
    description:
      'Rencanakan liburan keluarga dengan paket wisata liburan sekolah, pilihan destinasi Asia, jadwal keberangkatan, dan rincian harga yang tersedia.',
    keywords: [
      'paket liburan sekolah',
      'wisata keluarga',
      'tour liburan sekolah',
    ],
  },
};

export const requiredDestinations: Record<TourCategory, string[]> = {
  'wisata-indonesia': ['sumba'],
  'wisata-asia': [
    'china',
    'hong-kong',
    'jepang',
    'korea-selatan',
    'thailand',
    'vietnam',
  ],
  'wisata-multi-negara': [],
  'promo-dan-liburan': [],
};

export const titleFromSlug = (slug: string) =>
  slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
