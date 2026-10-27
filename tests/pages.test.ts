import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync, rmSync } from 'node:fs';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('..', import.meta.url));
const dist = fileURLToPath(new URL('../dist', import.meta.url));

rmSync(dist, { recursive: true, force: true });
execFileSync('npm', ['run', 'build'], {
  cwd: projectRoot,
  env: { ...process.env, PUBLIC_SITE_ENV: 'production' },
  stdio: 'pipe',
});

test('production build emits the contact page', () => {
  assert.equal(existsSync(`${dist}/contact/index.html`), true);
});

test('contact page relies on its contact cards instead of a duplicate sticky CTA', () => {
  const contactPage = readFileSync(`${dist}/contact/index.html`, 'utf8');
  assert.doesNotMatch(contactPage, /data-placement="sticky-mobile"/);
});

test('production build emits the about page', () => {
  assert.equal(existsSync(`${dist}/about/index.html`), true);
});

test('homepage renders the approved revision copy', () => {
  const homepage = readFileSync(`${dist}/index.html`, 'utf8');
  assert.match(homepage, /Liburan ke Mana\? Temukan Paket Wisata Impianmu!/);
  assert.match(homepage, /Sewa Mobil & Private Transport di Destinasi Favorit/);
  assert.match(homepage, /Sewa Mobil Luar Negeri, Liburan Tanpa Ribet/);
  assert.match(homepage, /Booking Transportasi Semudah Ini!/);
});

test('homepage category cards render their assigned images', () => {
  const homepage = readFileSync(`${dist}/index.html`, 'utf8');

  for (const image of [
    'paket-wisata-indonesia.webp',
    'paket-tour-asia.webp',
    'tour-multi-negara.webp',
    'promo-liburan.webp',
  ]) {
    assert.match(homepage, new RegExp(`/category-images/${image}`));
  }
});

test('every tour source explicitly defines an OG image matching its primary image', () => {
  const sourceRoot = `${projectRoot}/content/tour-sources/paket-wisata`;
  const sources = readdirSync(sourceRoot, { recursive: true })
    .filter((path) => path.toString().endsWith('.md'))
    .map((path) => readFileSync(`${sourceRoot}/${path}`, 'utf8'));

  assert.ok(sources.length > 0);
  for (const source of sources) {
    const image = source.match(/^image:\s*(.+)$/m)?.[1];
    const ogImage = source.match(/^ogImage:\s*(.+)$/m)?.[1];

    assert.ok(ogImage, 'tour source is missing ogImage');
    assert.equal(ogImage, image, 'ogImage must match the first package image');
  }
});

test('pages use their first hero image for Open Graph and Twitter cards', () => {
  const cases = [
    ['index.html', '/images/home-hero.webp'],
    ['about/index.html', '/images/home-hero.webp'],
    ['contact/index.html', '/images/home-hero.webp'],
    ['privacy/index.html', '/images/home-hero.webp'],
    ['terms/index.html', '/images/home-hero.webp'],
    ['paket-wisata/index.html', '/images/home-hero.webp'],
    ['sewa-mobil/index.html', '/images/home-hero.webp'],
    ['japan/index.html', '/images/hero-japan.webp'],
    ['wisata-asia/index.html', '/category-images/paket-tour-asia.webp'],
    [
      'wisata-asia/4d-phuket-krabi-island-getaway/index.html',
      '/paket-wisata/wisata-asia/4d-phuket-krabi-island-getaway.webp',
    ],
  ];

  for (const [path, image] of cases) {
    const page = readFileSync(`${dist}/${path}`, 'utf8');
    const absoluteImage = `https://pirantitravel.web.id${image}`;

    assert.match(
      page,
      new RegExp(`<meta property="og:image" content="${absoluteImage}"`),
    );
    assert.match(
      page,
      new RegExp(`<meta name="twitter:image" content="${absoluteImage}"`),
    );
  }
});

test('every generated HTML page exposes non-placeholder social images', () => {
  const htmlFiles = readdirSync(dist, { recursive: true }).filter((path) =>
    path.toString().endsWith('.html'),
  );

  assert.ok(htmlFiles.length > 0);
  for (const path of htmlFiles) {
    const page = readFileSync(`${dist}/${path}`, 'utf8');
    const ogImage = page.match(
      /<meta property="og:image" content="([^"]+)"/,
    )?.[1];
    const twitterImage = page.match(
      /<meta name="twitter:image" content="([^"]+)"/,
    )?.[1];

    assert.ok(ogImage, `${path} is missing og:image`);
    assert.equal(
      twitterImage,
      ogImage,
      `${path} has inconsistent social images`,
    );
    assert.doesNotMatch(ogImage, /piranti-travel-logo|PLACEHOLDER/i);
  }
});

test('every generated page has unique, focused SEO metadata', () => {
  const htmlFiles = readdirSync(dist, { recursive: true }).filter((path) =>
    path.toString().endsWith('.html'),
  );
  const titles = new Map<string, string>();

  for (const path of htmlFiles) {
    const page = readFileSync(`${dist}/${path}`, 'utf8');
    const title = (page.match(/<title>(.*?)<\/title>/s)?.[1] ?? '').replaceAll(
      '&amp;',
      '&',
    );
    const description =
      page.match(/<meta name="description" content="([^"]+)"/)?.[1] ?? '';
    const keywords =
      page.match(/<meta name="keywords" content="([^"]+)"/)?.[1] ?? '';

    assert.ok(title.length >= 25, `${path} has a title that is too short`);
    assert.ok(title.length <= 65, `${path} has a title that is too long`);
    assert.equal(titles.has(title), false, `${path} has a duplicate title`);
    assert.ok(
      description.length >= 80,
      `${path} has a description that is too short`,
    );
    assert.ok(
      description.length <= 170,
      `${path} has a description that is too long`,
    );
    assert.ok(keywords.split(',').length >= 3, `${path} is missing keywords`);
    titles.set(title, path.toString());
  }
});

test('tour copy avoids repeated admin prompts and report-style wording', () => {
  const sourceRoot = `${projectRoot}/content/tour-sources/paket-wisata`;
  const sources = readdirSync(sourceRoot, { recursive: true })
    .filter((path) => path.toString().endsWith('.md'))
    .map((path) => [
      path.toString(),
      readFileSync(`${sourceRoot}/${path}`, 'utf8'),
    ]);

  for (const [path, source] of sources) {
    assert.doesNotMatch(
      source,
      /tanya admin/gi,
      `${path} repeats an admin prompt`,
    );
    assert.doesNotMatch(
      source,
      /(?:Tanya admin untuk detail terbaru dan pilihan yang paling sesuai\.\s*){2,}/gi,
      `${path} contains duplicated CTA copy`,
    );
    const body = source.split('---').slice(2).join('---');
    assert.doesNotMatch(
      body,
      /catatan data|berdasarkan (?:dokumen|sumber)|dokumen sumber|rincian perjalanan menyebut/gi,
      `${path} reads like an internal report`,
    );
  }
});

test('plain-content pages render the homepage image behind their hero titles', () => {
  for (const path of [
    'about',
    'contact',
    'privacy',
    'terms',
    'paket-wisata',
    'sewa-mobil',
  ]) {
    const page = readFileSync(`${dist}/${path}/index.html`, 'utf8');
    const hero =
      page.match(/<section[^>]*data-page-hero[\s\S]*?<\/section>/)?.[0] ?? '';

    assert.match(hero, /\/images\/home-hero\.webp/);
    assert.match(hero, /linear-gradient/);
    assert.match(hero, /<h1/);
  }
});

test('main navigation hides the all car rentals link', () => {
  const homepage = readFileSync(`${dist}/index.html`, 'utf8');
  const header = homepage.match(/<header[\s\S]*?<\/header>/)?.[0] ?? '';

  assert.doesNotMatch(header, /Semua Sewa Mobil/);
  assert.doesNotMatch(header, /href="\/sewa-mobil"/);
});

test('destination pages do not render the fleet section', () => {
  for (const destination of ['japan', 'korea', 'bangkok', 'singapore']) {
    const page = readFileSync(`${dist}/${destination}/index.html`, 'utf8');

    assert.doesNotMatch(page, />Armada</);
    assert.doesNotMatch(page, /Kendaraan untuk perjalanan/);
  }
});

test('Sumba tour pages render their assigned package images', () => {
  const packageImages = {
    '4d3n-open-trip-sumba': 'open-trip-sumba-4d3n.webp',
    '4d3n-private-tour-sumba': 'private-tour-sumba-4d3n.webp',
    '5d4n-private-tour-sumba': 'private-tour-sumba-5d4n.webp',
  };

  for (const [slug, image] of Object.entries(packageImages)) {
    const page = readFileSync(
      `${dist}/wisata-indonesia/${slug}/index.html`,
      'utf8',
    );

    assert.match(page, new RegExp(`/paket-wisata/wisata-domestik/${image}`));
  }
});

test('Asia tour pages render their assigned package images', () => {
  const packageImages = {
    '4d-phuket-krabi-island-getaway': '4d-phuket-krabi-island-getaway.webp',
    '4d3n-special-chiang-mai-chiang-rai':
      '4d3n-special-chiang-mai-chiang-rai.webp',
    '5d-amazing-danang-hue-ba-na-hills':
      '5d-amazing-danang-hue-ba-na-hills.webp',
    '5d-crazy-sale-hongkong-shenzhen-zhuhai-macau-garuda-indonesia':
      '5d-crazy-sale-hong-kong-shenzhen-zhuhai-macau.webp',
    '5d-crazy-sale-korea-special-support-tour-program':
      '5d-crazy-sale-korea.webp',
    '5d-exciting-sale-complete-guangdong-hongkong-shenzhen-guangzhou-foshan-zhuhai-macau':
      '5d-exciting-sale-complete-guangdong.webp',
    '5d-exotic-phu-quoc': '5d-exotic-phu-quoc.webp',
    '5d-mega-sale-hongkong-shenzhen-zhuhai-macau-malaysia-airlines':
      '5d-mega-sale-hong-kong-shenzhen-zhuhai-macau.webp',
    '5d-new-deal-japan-fukuoka-yufuin-beppu': '5d-new-deal-jepang-fukuoka.webp',
    '5d-wonderful-vietnam-hanoi-sapa-fansipan-halong-bay-cruise':
      '5d-wonderful-vietnam-hanoi-sapa-fansipan-halong-bay-cruise.webp',
    '5d4n-amazing-bangkok-pattaya': '5d4n-amazing-bangkok-pattaya.webp',
    '5d4n-special-bangkok-pattaya-khao-yai':
      '5d4n-special-bangkok-pattaya-khao-yai.webp',
    '6d-best-of-hanoi-halong-bay-fansipan':
      '6d-best-of-hanoi-halong-bay-fansipan.webp',
    '6d-grand-sale-korea-4-kota-keberangkatan': '6d-grand-sale-korea.webp',
    '6d-halal-tour-korea-ansan-nami-island-seoul': '6d-halal-tour-korea.webp',
    '7d-complete-beauty-hanoi-halong-bay-fansipan':
      '7d-complete-beauty-hanoi-halong-bay-fansipan.webp',
    '7d-shocking-sale-japan-shirakawago':
      '7d-shocking-sale-jepang-golden-route-shirakawago.webp',
    '7d-super-sale-golden-route-japan-shirakawago-multi-kota':
      '7d-super-sale-jepang-golden-route-shirakawago.webp',
    '8d-china-harbin-snow-town-beijing':
      '8d-china-harbin-snow-town-beijing.webp',
    '9d-winter-complete-vietnam': '9d-winter-complete-vietnam.webp',
  };

  for (const [slug, image] of Object.entries(packageImages)) {
    const page = readFileSync(`${dist}/wisata-asia/${slug}/index.html`, 'utf8');

    assert.match(page, new RegExp(`/paket-wisata/wisata-asia/${image}`));
  }
});

test('multi-country tour page renders its assigned package image', () => {
  const page = readFileSync(
    `${dist}/wisata-multi-negara/7d6n-tour-3-negara-malaysia-singapura-thailand-hatyai/index.html`,
    'utf8',
  );

  assert.match(
    page,
    /\/paket-wisata\/wisata-multi-negara\/7d6n-tour-3-negara-malaysia-singapura-thailand\.webp/,
  );
});

test('promo tour pages render their assigned package images', () => {
  const packageImages = {
    '10d-new-year-adventure-vietnam-kuala-lumpur':
      '10d-new-year-adventure-vietnam-kuala-lumpur.webp',
    '5d-premium-phuket-year-end-holiday':
      '5d-premium-phuket-year-end-holiday.webp',
    '5d-special-lebaran-bangkok-pattaya':
      '5d-special-lebaran-bangkok-pattaya.webp',
    '5d-year-end-bangkok-pattaya': '5d-year-end-bangkok-pattaya.webp',
    '6d-crazy-sale-hainan': '6d-crazy-sale-hainan-haikou-xinglong-sanya.webp',
    '6d-hosezhuma-after-new-year-disneyland':
      '6d-hosezhuma-after-new-year-hong-kong-disneyland.webp',
    '6d-special-year-end-vietnam-hanoi-sapa-fansipan-halong-bay-cruise':
      '6d-special-year-end-vietnam-hanoi-sapa-fansipan-halong-bay-cruise.webp',
    '6d-winter-holiday-hongkong-shenzhen-guangzhou-zhuhai-disneyland':
      '6d-winter-holiday-hong-kong-shenzhen-guangzhou-zhuhai-disneyland.webp',
    '7d-adorable-year-end-golden-route-japan-disneysea-universal-studio-fujiten-ski-resort':
      '7d-adorable-year-end-golden-route-japan-disneysea-universal-studios-fujiten.webp',
    '7d-sparkling-winter-holiday-hanoi-sapa-halong-bay':
      '7d-sparkling-winter-holiday-hanoi-sapa-halong-bay.webp',
    '7d-special-lebaran-hongkong-zhuhai-macau-shenzhen-disneyland':
      '7d-special-lebaran-hong-kong-zhuhai-macau-shenzhen-disneyland.webp',
    '7d-special-year-end-hongkong-shenzhen-guangzhou-foshan-zhuhai-macau-disneyland':
      '7d-special-year-end-hong-kong-shenzhen-guangzhou-zhuhai-macau-disneyland.webp',
    '7d-winter-sale-chongqing-chengdu':
      '7d-winter-sale-chongqing-dujiangyan-chengdu.webp',
    '7d-winter-school-holiday-japan-shirakawago-disneyland':
      '7d-winter-school-holiday-japan-shirakawago-tokyo-disneyland.webp',
    '7d-year-end-winter-memories-korea-lotte-world':
      '7d-year-end-winter-memories-korea-lotte-world.webp',
    '8d-avatar-fantasy-chongqing-fenghuang-zhangjiajie':
      '8d-avatar-fantasy-chongqing-fenghuang-zhangjiajie.webp',
    '8d-lebaran-getaway-guangzhou-chongqing-zhangjiajie':
      '8d-lebaran-getaway-guangzhou-chongqing-zhangjiajie.webp',
    '8d-new-supersale-china-beijing-shanghai':
      '8d-new-super-sale-china-beijing-suzhou-hangzhou-shanghai.webp',
    '8d-winter-school-holiday-beijing-shanghai-universal-studios':
      '8d-winter-school-holiday-beijing-suzhou-hangzhou-shanghai-universal-studios.webp',
    '8d-winter-school-holiday-hanoi-danang':
      '8d-winter-school-holiday-vietnam-danang-hanoi-sapa-halong-bay.webp',
    '9d-complete-vietnam-year-end-journey':
      '9d-complete-vietnam-year-end-journey.webp',
    '9d-great-lebaran-journey-china-beijing-shanghai':
      '9d-great-lebaran-journey-china-tianjin-beijing-shanghai-suzhou-hangzhou.webp',
  };

  for (const [slug, image] of Object.entries(packageImages)) {
    const page = readFileSync(
      `${dist}/promo-dan-liburan/${slug}/index.html`,
      'utf8',
    );

    assert.match(page, new RegExp(`/paket-wisata/promo-dan-liburan/${image}`));
  }
});

test('category pages render their assigned hero backgrounds', () => {
  const categoryImages = {
    'wisata-indonesia': 'paket-wisata-indonesia.webp',
    'wisata-asia': 'paket-tour-asia.webp',
    'wisata-multi-negara': 'tour-multi-negara.webp',
    'promo-dan-liburan': 'promo-liburan.webp',
  };

  for (const [category, image] of Object.entries(categoryImages)) {
    const page = readFileSync(`${dist}/${category}/index.html`, 'utf8');

    assert.match(page, new RegExp(`/category-images/${image}`));
    assert.match(page, /data-category-hero/);
  }
});

test('tour detail uses the approved highlight heading', () => {
  const detail = readFileSync(
    `${dist}/wisata-indonesia/4d3n-open-trip-sumba/index.html`,
    'utf8',
  );
  assert.match(detail, /Highlight Perjalanan/);
  assert.doesNotMatch(detail, /Sorotan perjalanan/);
});

test('tour gallery keeps clear spacing before travel highlights', () => {
  const detail = readFileSync(
    `${dist}/wisata-indonesia/4d3n-open-trip-sumba/index.html`,
    'utf8',
  );

  assert.match(detail, /class="[^"]*mt-10[^"]*" data-tour-highlights/);
});

test('category destination tags render below the tour card grid without icons', () => {
  const page = readFileSync(`${dist}/wisata-asia/index.html`, 'utf8');
  const gridPosition = page.indexOf('data-tour-grid');
  const tagsPosition = page.indexOf('data-destination-tags');
  const tags =
    page.match(/<nav[^>]*data-destination-tags[\s\S]*?<\/nav>/)?.[0] ?? '';

  assert.ok(gridPosition >= 0);
  assert.ok(tagsPosition > gridPosition);
  assert.doesNotMatch(tags, /data-icon=/);
  assert.match(tags, /text-xs/);
});

test('tour detail renders up to three related package cards at the end', () => {
  const detail = readFileSync(
    `${dist}/wisata-asia/4d-phuket-krabi-island-getaway/index.html`,
    'utf8',
  );
  const related =
    detail.match(/<section[^>]*data-related-tours[\s\S]*?<\/section>/)?.[0] ??
    '';

  assert.match(related, /Paket wisata terkait/i);
  assert.equal((related.match(/data-tour-card/g) ?? []).length, 3);
});

test('primary navigation uses semantic Phosphor icons', () => {
  const homepage = readFileSync(`${dist}/index.html`, 'utf8');
  const header = homepage.match(/<header[\s\S]*?<\/header>/)?.[0] ?? '';

  for (const icon of [
    'ph:house',
    'ph:suitcase-rolling',
    'ph:car-profile',
    'ph:ticket',
    'ph:buildings',
    'ph:chat-circle-text',
    'ph:caret-down',
    'ph:list',
  ]) {
    assert.match(header, new RegExp(`data-icon="${icon}"`));
  }

  assert.doesNotMatch(header, /⌄|＋/);
});

test('category and service cards use Phosphor icons instead of emoji', () => {
  const homepage = readFileSync(`${dist}/index.html`, 'utf8');

  for (const icon of [
    'ph:island-duotone',
    'ph:globe-hemisphere-east-duotone',
    'ph:map-trifold-duotone',
    'ph:users-three-duotone',
  ]) {
    assert.match(homepage, new RegExp(`data-icon="${icon}"`));
  }

  assert.doesNotMatch(homepage, /✈|🗺|🚐|👥/);
});

const sitemap = readFileSync(`${dist}/sitemap.xml`, 'utf8');

test('sitemap includes the contact page', () => {
  assert.match(sitemap, /<loc>[^<]+\/contact<\/loc>/);
});

test('sitemap includes the about page', () => {
  assert.match(sitemap, /<loc>[^<]+\/about<\/loc>/);
});

test('production sitemap uses the public domain', () => {
  assert.match(sitemap, /<loc>https:\/\/pirantitravel\.web\.id\//);
});
