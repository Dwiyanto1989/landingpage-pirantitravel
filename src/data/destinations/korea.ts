import type { Destination } from '../../types';

export const korea: Destination = {
  slug: 'korea',
  name: 'Korea',
  eyebrow: 'Private transport di Korea',
  title: 'Airport transfer dan private tour Korea dengan Hyundai Staria',
  description:
    'Atur perjalanan Seoul, Nami Island, Busan, Jeju, hingga transfer Incheon dalam satu kendaraan privat.',
  summary:
    'Hyundai Staria untuk Incheon transfer serta tur Seoul, Nami, Busan, dan Jeju.',
  accent: 'sky',
  highlights: [
    'Incheon airport transfer',
    'Seoul & Nami Island',
    'Busan & Jeju',
  ],
  fleet: ['Hyundai Staria'],
  services: [
    {
      service: 'Airport (ICN) Pick-up / Sending',
      display: 'IDR 2,200,000 / IDR 3,850,000',
    },
    { service: 'Airport (ICN) + Seoul Tour (10h)', price: 6890000 },
    { service: 'Seoul Tour (10h)', price: 6200000 },
    { service: 'Nami Island (10h)', price: 6880000 },
    { service: 'Busan Tour (8+1h)', price: 6599000 },
    { service: 'Jeju Airport + Jeju Tour (8+1h)', price: 6200000 },
    // Source contains stray “270,000” before IDR 5,950,000. Keep this note until owner confirmation.
    {
      service: 'Jeju Tour (8+1h)',
      price: 5950000,
      note: 'Harga Jeju Tour menunggu konfirmasi akhir karena terdapat anomali pada sumber.',
    },
  ],
  terms: [
    'Harga utama Jeju Tour mengikuti angka IDR 5.950.000 pada sumber, namun masih memerlukan konfirmasi pemilik bisnis sebelum publikasi produksi.',
  ],
  faqs: [
    {
      question: 'Kendaraan apa yang digunakan?',
      answer: 'Daftar harga Korea menggunakan Hyundai Staria.',
    },
    {
      question: 'Apakah tersedia transfer Incheon?',
      answer:
        'Ya. Tersedia airport pick-up/sending dan opsi Incheon Airport + Seoul Tour.',
    },
    {
      question: 'Apakah harga Jeju sudah final?',
      answer:
        'Belum. Salah satu baris sumber harga Jeju memiliki anomali dan perlu dikonfirmasi sebelum publikasi produksi.',
    },
  ],
  seo: {
    title: 'Sewa Mobil Korea & Airport Transfer | Piranti Travel',
    description:
      'Cek transport privat Hyundai Staria untuk Incheon, Seoul, Nami Island, Busan, dan Jeju bersama Piranti Travel.',
  },
};
