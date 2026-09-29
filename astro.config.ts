import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'static',
  site:
    process.env.PUBLIC_SITE_ENV === 'production'
      ? 'https://piranti-travel.com'
      : 'https://piranti.east.local',
  vite: { plugins: [tailwindcss()] },
});
