# QA dan handoff paket wisata

## Cakupan implementasi

- Content collection Astro untuk empat kategori canonical.
- Detail statis otomatis `/<kategori>/<filename-slug>` hanya untuk `published: true`.
- Katalog, empat kategori, listing destinasi, tema promo, dan `/sewa-mobil`.
- Mega menu desktop, accordion mobile, footer, homepage dua jalur produk, WhatsApp kontekstual, sitemap dinamis, canonical, schema, dan fallback media lokal.
- Rute sewa mobil lama, legal, tentang, kontak, analytics opsional, dan development noindex dipertahankan.

## Status konten

Inventaris repository berisi 46 Markdown yang aktif: 3 `wisata-indonesia`, 20 `wisata-asia`, 1 `wisata-multi-negara`, dan 22 `promo-dan-liburan`. Seluruh paket menggunakan `published: true` sesuai arahan pemilik. Daftar lengkap dan sumber ada langsung dalam empat folder canonical serta `workflow-update-paket/SOURCE_ZIP_INVENTORY.csv`.

Seluruh paket tetap `featured: false` sampai pilihan unggulan ditentukan pemilik. Semua peringatan harga, tanggal, pajak, visa, shopping penalty, minimum peserta, serta anomali sumber tetap dipertahankan dan ditampilkan dari frontmatter/isi masing-masing. Inventaris workflow menyebut 47 DOCX, sedangkan input Markdown yang tersedia berjumlah 46; berkas yang belum tersedia tidak direkonstruksi.

## Route map

Public listing: `/paket-wisata`, `/wisata-indonesia`, `/wisata-asia`, `/wisata-multi-negara`, `/promo-dan-liburan`; destinasi berada di `/<kategori>/destinasi/<slug>`; tema promo di `/promo-dan-liburan/tema/{lebaran,akhir-tahun,liburan-sekolah}`; detail mengikuti `/<kategori>/<filename-slug>`. Rental tetap `/sewa-mobil`, `/japan`, `/korea`, `/bangkok`, `/singapore`.

## Operasional dan rollback

Build static wajib dijalankan setiap ada perubahan Markdown. Deployment produksi tidak dilakukan dari sesi pengembangan ini. Sebelum release, simpan commit/image terakhir yang teruji, deploy image baru, cek origin dan domain, lalu rollback ke commit/image sebelumnya dan rebuild jika health check gagal. Jangan mengubah host Nginx, TLS, `.env`, DNS, atau analytics token dari repository.

Target Lighthouse mobile: Performance ≥90, Accessibility ≥95, SEO ≥95. Nilai tidak dicantumkan sebagai hasil karena Lighthouse laboratorium tidak menjadi dependency project; validasi fungsional, layout viewport, dan aksesibilitas dilakukan melalui test/build dan pemeriksaan browser lokal.
