import type { FAQ } from '../types';

export const generalPriceDisclaimer =
  'Harga dapat berubah sesuai tanggal perjalanan, musim, rute, durasi, dan ketersediaan. Konfirmasi harga final melalui Piranti Travel sebelum booking.';

export const navigation = [
  { href: '/japan', label: 'Japan' },
  { href: '/korea', label: 'Korea' },
  { href: '/bangkok', label: 'Bangkok' },
  { href: '/singapore', label: 'Singapore' },
] as const;

export const contacts = [
  {
    display: '0838 9783 6369',
    whatsapp: '6283897836369',
    telephone: '+6283897836369',
  },
  {
    display: '0838 7335 5999',
    whatsapp: '6283873355999',
    telephone: '+6283873355999',
  },
] as const;

export const homeFaqs: FAQ[] = [
  {
    question: 'Apakah harga yang tertera sudah final?',
    answer:
      'Belum. Harga adalah referensi awal dan dapat berubah mengikuti tanggal, musim, rute, durasi, serta ketersediaan kendaraan. Kami akan mengirimkan penawaran final sebelum booking.',
  },
  {
    question: 'Apa saja yang termasuk dalam harga?',
    answer:
      'Cakupan berbeda untuk setiap destinasi dan layanan. Rincian inklusi, eksklusi, durasi, serta biaya tambahan ditampilkan pada halaman destinasi.',
  },
  {
    question: 'Apakah bisa request penjemputan bandara?',
    answer:
      'Bisa. Tersedia pilihan airport transfer di Jepang, Korea, Bangkok, dan Singapore sesuai rute serta ketersediaan kendaraan.',
  },
  {
    question: 'Apakah bisa untuk rombongan?',
    answer:
      'Bisa. Pilihan kendaraan tersedia dari Alphard dan van hingga Coaster dan bus. Sampaikan jumlah penumpang agar pilihan kendaraan dapat disesuaikan.',
  },
  {
    question: 'Bagaimana cara cek ketersediaan?',
    answer:
      'Kirim destinasi, tanggal, rute, dan jumlah penumpang melalui WhatsApp. Piranti Travel akan memeriksa pilihan yang tersedia dan mengirimkan penawaran.',
  },
];

export const bookingSteps = [
  {
    title: 'Pilih destinasi',
    text: 'Lihat rute, kendaraan, dan referensi harga yang sesuai perjalanan Anda.',
  },
  {
    title: 'Kirim detail perjalanan',
    text: 'Sampaikan tanggal, rute, titik pickup, dan jumlah penumpang.',
  },
  {
    title: 'Terima penawaran',
    text: 'Kami cek ketersediaan, kirim harga final, lalu bantu proses konfirmasi.',
  },
] as const;
