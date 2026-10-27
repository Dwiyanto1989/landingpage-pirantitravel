import { readdir, readFile } from 'node:fs/promises';
import { resolve, relative } from 'node:path';

const root = resolve('content/tour-sources/paket-wisata');
const allowed = new Set([
  'wisata-indonesia',
  'wisata-asia',
  'wisata-multi-negara',
  'promo-dan-liburan',
]);
const dirs = await readdir(root, { withFileTypes: true });
let total = 0;
let published = 0;
for (const dir of dirs) {
  if (!dir.isDirectory() || !allowed.has(dir.name))
    throw new Error(`Folder kategori tidak valid: ${dir.name}`);
  const files = await readdir(resolve(root, dir.name), { withFileTypes: true });
  for (const file of files) {
    if (!file.isFile() || !/^[a-z0-9]+(?:-[a-z0-9]+)*\.md$/.test(file.name))
      throw new Error(
        `Berkas paket tidak valid: ${relative(root, resolve(root, dir.name, file.name))}`,
      );
    const body = await readFile(resolve(root, dir.name, file.name), 'utf8');
    if (!body.includes(`category: ${dir.name}`))
      throw new Error(`Category tidak cocok: ${file.name}`);
    if (
      /<(?:script|iframe|object|embed|style)\b|\son\w+\s*=|javascript:/i.test(
        body,
      )
    )
      throw new Error(`Markup berbahaya: ${file.name}`);
    total++;
    if (/^published:\s*true\s*$/m.test(body)) published++;
  }
}
console.log(
  `Content audit OK: ${total} paket (${published} published, ${total - published} draft)`,
);
