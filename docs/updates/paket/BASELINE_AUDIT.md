# Baseline audit

Audit dilakukan sebelum implementasi terhadap aplikasi Astro static yang sudah ada. Arsitektur, empat halaman sewa mobil (`/japan`, `/korea`, `/bangkok`, `/singapore`), konfigurasi Docker/Nginx, SEO environment, analytics opsional, dan alur WhatsApp dipertahankan.

Komponen yang digunakan kembali: `BaseLayout`, `SeoHead`, `Header`, `Footer`, `WhatsAppCTA`, `DestinationCard`, data destinasi, dan seluruh halaman legal/perusahaan. Pengembangan dilakukan sebagai lapisan content collection dan komponen paket wisata, bukan rebuild.

Risiko yang dilindungi:

- Frontmatter dan folder yang tidak cocok harus menggagalkan build.
- Draft tidak boleh menghasilkan halaman, kartu unggulan, atau sitemap.
- Nama berkas adalah permalink; perubahan judul tidak mengubah URL.
- Static site perlu rebuild setelah perubahan Markdown.
- Nilai bisnis, harga, jadwal, biaya, dan status publikasi tidak boleh dikarang.
- Development tetap `noindex,nofollow`; host produksi tetap `https://pirantitravel.web.id`.

Baseline sebelum perubahan: test dan Astro check lulus. Lint awal hanya terhambat format berkas sumber workflow/content yang sengaja dipertahankan apa adanya; direktori sumber tersebut kemudian dikecualikan dari Prettier.
