import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, rmSync } from 'node:fs';
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

test('tour detail uses the approved highlight heading', () => {
  const detail = readFileSync(
    `${dist}/wisata-indonesia/4d3n-open-trip-sumba/index.html`,
    'utf8',
  );
  assert.match(detail, /Highlight Perjalanan/);
  assert.doesNotMatch(detail, /Sorotan perjalanan/);
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
