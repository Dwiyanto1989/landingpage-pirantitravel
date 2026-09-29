import type { Destination } from '../../types';

export const bangkok: Destination = {
  slug: 'bangkok',
  name: 'Bangkok',
  eyebrow: 'VIP Van di Thailand',
  title: 'Sewa VIP Van Bangkok untuk perjalanan privat hingga 13 penumpang',
  description:
    'Pilihan transfer dan layanan 12 jam ke Bangkok, Damnoen, Ayutthaya, Pattaya, atau Khao Yai.',
  summary: 'VIP Van 2–13 penumpang untuk transfer dan perjalanan 12 jam.',
  accent: 'gold',
  highlights: [
    'Kapasitas 2–13 pax',
    'Layanan transport 12 jam',
    'Driver & bahan bakar termasuk',
  ],
  fleet: ['VIP Van'],
  services: [
    { service: 'Transfer In / Out Per Way', price: 1150000 },
    { service: 'Bangkok Only', price: 2190000 },
    { service: 'Bangkok - Damnoen', price: 2350000 },
    { service: 'Bangkok - Ayutthaya', price: 2350000 },
    { service: 'Bangkok - Pattaya', price: 2550000 },
    { service: 'Bangkok - Khao Yai', price: 2850000 },
  ],
  inclusions: ['Layanan transport 12 jam', 'Driver profesional', 'Bahan bakar'],
  additional: [
    'Tour guide (English, Indonesia, Malaysia): IDR 800.000/hari',
    'Tipping guide: IDR 100.000/pax/hari, dibayar pada invoice sebelum tur',
  ],
  exclusions: [
    'Overtime: IDR 250.000/jam',
    'Biaya tol dan parkir',
    'Kamar guide & overnight di luar Bangkok: IDR 800.000/trip',
  ],
  faqs: [
    {
      question: 'Berapa kapasitas VIP Van?',
      answer: 'VIP Van pada daftar harga melayani 2–13 penumpang.',
    },
    {
      question: 'Berapa durasi layanan?',
      answer:
        'Layanan perjalanan tercantum selama 12 jam. Overtime dikenakan IDR 250.000 per jam.',
    },
    {
      question: 'Apakah tol dan parkir termasuk?',
      answer:
        'Tidak. Biaya tol dan parkir tercantum sebagai biaya di luar harga layanan.',
    },
  ],
  seo: {
    title: 'Sewa VIP Van Bangkok | Piranti Travel',
    description:
      'Cek harga VIP Van Bangkok 2–13 pax untuk airport transfer, Damnoen, Ayutthaya, Pattaya, dan Khao Yai.',
  },
};
