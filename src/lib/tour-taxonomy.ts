import type { TourCategory, PromoTheme } from './tours';

export const categoryMeta: Record<
  TourCategory,
  { title: string; description: string }
> = {
  'wisata-indonesia': {
    title: 'Wisata Indonesia',
    description:
      'Temukan paket perjalanan pilihan untuk menjelajahi destinasi di Indonesia.',
  },
  'wisata-asia': {
    title: 'Wisata Asia',
    description:
      'Jelajahi beragam destinasi Asia melalui paket perjalanan yang dipublikasikan Piranti Travel.',
  },
  'wisata-multi-negara': {
    title: 'Wisata Multi-Negara',
    description:
      'Pilihan perjalanan yang menggabungkan lebih dari satu negara dalam satu rangkaian.',
  },
  'promo-dan-liburan': {
    title: 'Promo dan Liburan',
    description:
      'Pilihan paket bertema musim liburan berdasarkan jadwal keberangkatan yang tersedia.',
  },
};

export const promoThemeMeta: Record<
  PromoTheme,
  { title: string; description: string }
> = {
  lebaran: {
    title: 'Paket Libur Lebaran',
    description:
      'Paket dengan jadwal keberangkatan bertema libur Lebaran yang masih tersedia.',
  },
  'akhir-tahun': {
    title: 'Paket Libur Akhir Tahun',
    description:
      'Paket dengan jadwal keberangkatan bertema libur akhir tahun yang masih tersedia.',
  },
  'liburan-sekolah': {
    title: 'Paket Liburan Sekolah',
    description:
      'Paket dengan jadwal keberangkatan bertema liburan sekolah yang masih tersedia.',
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
