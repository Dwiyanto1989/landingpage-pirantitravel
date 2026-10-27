import { existsSync } from 'node:fs';
import { resolve, sep } from 'node:path';

export const TOUR_PLACEHOLDER = '/images/PLACEHOLDER.webp';
export type TourImage = { src: string; alt: string };

export function isPublicAsset(src: string, publicRoot = resolve('public')) {
  if (!src.startsWith('/') || src.startsWith('//')) return false;
  const file = resolve(publicRoot, `.${src}`);
  return file.startsWith(`${resolve(publicRoot)}${sep}`) && existsSync(file);
}

export function resolveTourImages(
  cover: string,
  images: TourImage[],
  title: string,
  publicRoot = resolve('public'),
) {
  const valid = images.filter((image) => isPublicAsset(image.src, publicRoot));
  if (valid.length) return valid;
  if (isPublicAsset(cover, publicRoot))
    return [{ src: cover, alt: `Gambar paket ${title}` }];
  return [{ src: TOUR_PLACEHOLDER, alt: `Gambar sementara paket ${title}` }];
}
