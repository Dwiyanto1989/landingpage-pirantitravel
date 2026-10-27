const BRAND_SUFFIX = ' | Piranti Travel';

export const buildSeoTitle = (title: string, maxLength = 65) => {
  const normalized = title.replace(/\s+/g, ' ').trim();
  if (normalized.endsWith(BRAND_SUFFIX) && normalized.length <= maxLength) {
    return normalized;
  }

  const available = maxLength - BRAND_SUFFIX.length;
  const base = normalized.endsWith(BRAND_SUFFIX)
    ? normalized.slice(0, -BRAND_SUFFIX.length)
    : normalized;
  if (base.length <= available) return `${base}${BRAND_SUFFIX}`;

  const shortened = base
    .slice(0, available + 1)
    .replace(/\s+\S*$/, '')
    .trim();
  return `${shortened}${BRAND_SUFFIX}`;
};
