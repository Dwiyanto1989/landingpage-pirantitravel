export const buildWhatsAppMessage = (
  destination = '',
) => `Halo Piranti Travel, saya ingin cek transport${destination ? ` ${destination}` : ''}.

Destinasi: ${destination}
Layanan:
Tanggal:
Jumlah penumpang:
Pickup:
Drop-off:
Catatan:`;

export const buildWhatsAppLink = (number: string, destination = '') => {
  const digits = number.replace(/\D/g, '');
  return digits
    ? `https://wa.me/${digits}?text=${encodeURIComponent(buildWhatsAppMessage(destination))}`
    : undefined;
};

export const buildTourWhatsAppMessage = (title: string, url: string) =>
  `Halo Piranti Travel, saya ingin menanyakan paket wisata.\n\nProduk: paket-wisata\nPaket: ${title}\nURL: ${url}\nTanggal keberangkatan (YYYY-MM-DD):\nJumlah dewasa:\nJumlah anak:\nTipe harga:\nKeperluan: konsultasi paket\nCatatan:`;

export const buildTourWhatsAppLink = (
  number: string,
  title: string,
  url: string,
) => {
  const digits = number.replace(/\D/g, '');
  return digits
    ? `https://wa.me/${digits}?text=${encodeURIComponent(buildTourWhatsAppMessage(title, url))}`
    : undefined;
};
