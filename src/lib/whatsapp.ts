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
