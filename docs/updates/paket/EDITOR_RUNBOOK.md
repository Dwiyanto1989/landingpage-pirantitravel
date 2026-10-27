# Runbook konten paket wisata

1. Buat satu berkas Markdown langsung di `content/tour-sources/paket-wisata/<kategori>/<slug>.md`. Kategori hanya `wisata-indonesia`, `wisata-asia`, `wisata-multi-negara`, atau `promo-dan-liburan`; slug wajib lowercase kebab-case.
2. Salin struktur dari `workflow-update-paket/examples/`, isi hanya fakta yang sudah diverifikasi, dan pastikan `category` sama dengan nama folder.
3. Gunakan `published: false` selama review. Periksa jadwal, tier harga, biaya wajib/opsional, penalti, pajak, itinerary, serta hak penggunaan gambar.
4. Jalankan `npm run content:audit`, `npm test`, `npm run lint`, dan `npm run build`.
5. Setelah persetujuan bisnis, ubah menjadi `published: true`, rebuild, lalu periksa URL `/<kategori>/<slug>`, listing kategori/destinasi, sitemap, canonical, mobile, dan prefill WhatsApp.
6. Deploy image Docker yang sudah diuji melalui pipeline operator. Menyalin `.md` saja tidak memperbarui HTML static.

Mengubah judul tidak mengubah URL. Mengganti nama file atau memindahkan kategori mengubah canonical dan memerlukan review redirect. Untuk menarik paket, set `published: false`, rebuild, dan tentukan kebijakan URL lama. Jangan memasukkan DOCX ke runtime, membuat nested folder, menduplikasi paket, atau menambahkan harga/jadwal yang belum disetujui.
