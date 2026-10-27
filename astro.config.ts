import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';

export default defineConfig({
  output: 'static',
  integrations: [icon()],
  site:
    process.env.PUBLIC_SITE_ENV === 'production'
      ? 'https://pirantitravel.web.id'
      : 'https://piranti.east.local',
  vite: { plugins: [tailwindcss()] },
});
