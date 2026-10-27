import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import {
  copyFileSync,
  existsSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { after, test } from 'node:test';

const asiaTarget =
  'content/tour-sources/paket-wisata/wisata-asia/paket-tour-malaysia-2-hari.md';
const promoTarget =
  'content/tour-sources/paket-wisata/promo-dan-liburan/contoh-liburan-lebaran.md';
const realPromo =
  'content/tour-sources/paket-wisata/promo-dan-liburan/5d-special-lebaran-bangkok-pattaya.md';
const build = () =>
  execFileSync('npm', ['run', 'build'], {
    stdio: 'pipe',
    env: { ...process.env, PUBLIC_SITE_ENV: 'development' },
  });
after(() => {
  rmSync(asiaTarget, { force: true });
  rmSync(promoTarget, { force: true });
  build();
});

test('published fixtures auto-generate canonical detail, destination, and promo routes', () => {
  copyFileSync('tests/fixtures/paket-tour-malaysia-2-hari.md', asiaTarget);
  copyFileSync('tests/fixtures/contoh-liburan-lebaran.md', promoTarget);
  build();
  assert.ok(
    existsSync('dist/wisata-asia/paket-tour-malaysia-2-hari/index.html'),
  );
  assert.ok(
    existsSync('dist/promo-dan-liburan/contoh-liburan-lebaran/index.html'),
  );
  assert.match(
    readFileSync('dist/wisata-asia/index.html', 'utf8'),
    /destinasi\/malaysia/,
  );
  assert.match(readFileSync('dist/index.html', 'utf8'), /Liburan Rekomendasi/);
  assert.match(
    readFileSync('dist/index.html', 'utf8'),
    /Paket Wisata ke Destinasi Favorit/,
  );
  assert.match(
    readFileSync('dist/promo-dan-liburan/tema/lebaran/index.html', 'utf8'),
    /contoh-liburan-lebaran/,
  );
  assert.match(
    readFileSync('dist/sitemap.xml', 'utf8'),
    /paket-tour-malaysia-2-hari/,
  );
});

test('folder and frontmatter category mismatch fails the build', () => {
  const original = readFileSync(asiaTarget, 'utf8');
  writeFileSync(
    asiaTarget,
    original.replace('category: wisata-asia', 'category: wisata-indonesia'),
  );
  assert.throws(() => build());
  copyFileSync('tests/fixtures/paket-tour-malaysia-2-hari.md', asiaTarget);
});

test('a reviewed promo source keeps its fourth-category canonical URL', () => {
  const original = readFileSync(realPromo, 'utf8');
  try {
    writeFileSync(
      realPromo,
      original.replace('published: false', 'published: true'),
    );
    build();
    assert.ok(
      existsSync(
        'dist/promo-dan-liburan/5d-special-lebaran-bangkok-pattaya/index.html',
      ),
    );
    assert.match(
      readFileSync('dist/promo-dan-liburan/tema/lebaran/index.html', 'utf8'),
      /5d-special-lebaran-bangkok-pattaya/,
    );
  } finally {
    writeFileSync(realPromo, original);
  }
});
