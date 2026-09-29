import type { Destination } from '../../types';

export const singapore: Destination = {
  slug: 'singapore',
  name: 'Singapore',
  eyebrow: 'Transport grup di Singapore',
  title: 'HiAce, Coaster, dan Bus untuk perjalanan Singapore',
  description:
    'Pilih kendaraan 12, 22, atau 48 kursi untuk tur 4–10 jam, transfer satu arah, serta kebutuhan grup.',
  summary:
    'Pilihan 12, 22, dan 48 kursi untuk tur, transfer, serta perjalanan grup.',
  accent: 'coral',
  heroImage: '/images/hero-singapore.webp',
  bookingImage: '/images/section-info.webp',
  highlights: [
    'Pilihan 12–48 kursi',
    'Durasi 4, 6, 8 & 10 jam',
    'Transfer dan checkpoint tertentu',
  ],
  fleet: ['Van HiAce', 'Coaster', 'Bus'],
  vehicles: [
    {
      name: 'Van HiAce',
      capacity: '12-seater combi',
      services: [
        { service: 'Full Day Tour - 10 hours', price: 6280000 },
        { service: 'Full Day Tour - 8 hours', price: 4990000 },
        { service: 'Full Day Tour - 6 hours', price: 4250000 },
        { service: 'Half Day Tour - 4 hours', price: 3550000 },
        { service: 'One-way transfer / arrival-departure', price: 1850000 },
        { service: 'Midnight charge 23:00-07:00', price: 400000 },
        { service: 'Disposal / hourly disposal (min 6h)', price: 950000 },
      ],
      includes: ['Bahan bakar', 'Tol', 'Parkir', 'Driver'],
      excludes: ['Tipping driver'],
    },
    {
      name: 'Coaster',
      capacity: '22-seater combi',
      services: [
        { service: 'Full Day Tour - 10 hours', price: 7950000 },
        { service: 'Full Day Tour - 8 hours', price: 6215000 },
        { service: 'Full Day Tour - 6 hours', price: 5650000 },
        { service: 'Half Day Tour - 4 hours', price: 4950000 },
        { service: 'One-way transfer / arrival-departure', price: 2750000 },
        { service: 'Midnight charge 23:00-07:00', price: 399000 },
        { service: 'Disposal (min 6h)', price: 1080000 },
        {
          service: 'One-way Woodland/Tuas Checkpoint (Singapore side)',
          price: 3180000,
        },
      ],
      includes: ['Bahan bakar', 'Tol', 'Parkir', 'Driver'],
      excludes: ['Guide', 'Tipping driver', 'Tipping guide'],
    },
    {
      name: 'Bus',
      capacity: '48-seater',
      services: [
        { service: 'Full Day Tour - 10 hours', price: 10150000 },
        { service: 'Full Day Tour - 8 hours', price: 8150000 },
        { service: 'Full Day Tour - 6 hours', price: 6700000 },
        { service: 'Half Day Tour - 4 hours', price: 5280000 },
        { service: 'One-way transfer departure/arrival', price: 3150000 },
        { service: 'Midnight charge 23:00-07:00', price: 500000 },
        { service: 'Disposal (min 6h)', price: 1350000, unit: 'per hour' },
        {
          service: 'One-way Woodland/Tuas Checkpoint (Singapore side)',
          price: 3800000,
        },
      ],
      includes: ['Bahan bakar', 'Tol', 'Parkir', 'Driver'],
      excludes: ['Guide', 'Tipping driver', 'Tipping guide'],
    },
  ],
  faqs: [
    {
      question: 'Kendaraan mana yang cocok untuk grup saya?',
      answer:
        'HiAce berkapasitas 12 kursi, Coaster 22 kursi, dan Bus 48 kursi. Konfirmasikan jumlah penumpang serta bagasi sebelum booking.',
    },
    {
      question: 'Apakah ada layanan tengah malam?',
      answer:
        'Ada biaya midnight charge untuk layanan pukul 23.00–07.00, dengan tarif berbeda per kendaraan.',
    },
    {
      question: 'Apakah tol dan parkir termasuk?',
      answer:
        'Ya. Pada ketiga kendaraan, bahan bakar, tol, parkir, dan driver tercantum sebagai inklusi.',
    },
  ],
  seo: {
    title: 'Sewa HiAce, Coaster & Bus Singapore | Piranti Travel',
    description:
      'Cek harga transport Singapore dengan HiAce 12 seat, Coaster 22 seat, dan Bus 48 seat untuk tur serta transfer.',
  },
};
