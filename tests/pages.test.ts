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
