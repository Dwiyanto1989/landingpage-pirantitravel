import { getCollection, type CollectionEntry } from 'astro:content';
import { readFile, readdir } from 'node:fs/promises';
import { resolve, relative, sep } from 'node:path';
import { getCanonicalTourUrl } from './tours';

export type TourEntry = CollectionEntry<'tours'>;

export async function getTourEntries() {
  const root = resolve('content/tour-sources/paket-wisata');
  const files = await readdir(root, { recursive: true, withFileTypes: true });
  for (const file of files) {
    if (file.isSymbolicLink()) {
      throw new Error(`Symlink tidak diizinkan di konten paket: ${file.name}`);
    }
    if (!file.isFile() || !file.name.endsWith('.md')) continue;
    const relativePath = relative(root, resolve(file.parentPath, file.name))
      .split(sep)
      .join('/');
    if (
      !/^(wisata-indonesia|wisata-asia|wisata-multi-negara|promo-dan-liburan)\/[a-z0-9]+(?:-[a-z0-9]+)*\.md$/.test(
        relativePath,
      )
    ) {
      throw new Error(
        `Lokasi atau nama berkas paket wisata tidak valid: ${relativePath}`,
      );
    }
    const source = await readFile(resolve(file.parentPath, file.name), 'utf8');
    if (
      /<(?:script|iframe|object|embed|style)\b|\son\w+\s*=|javascript:/i.test(
        source,
      )
    ) {
      throw new Error(`Markup paket wisata tidak aman: ${relativePath}`);
    }
  }
  const entries = await getCollection('tours');
  const urls = new Set<string>();
  for (const entry of entries) {
    const url = getCanonicalTourUrl(entry);
    if (urls.has(url)) throw new Error(`URL paket wisata duplikat: ${url}`);
    urls.add(url);
  }
  return entries;
}
