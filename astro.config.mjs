// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const NOINDEX = new Set(['/mentions-legales', '/politique-confidentialite']);

export default defineConfig({
  site: 'https://br16batiment.com',
  trailingSlash: 'never',
  build: { format: 'file' },
  compressHTML: true,
  devToolbar: { enabled: false },
  integrations: [
    sitemap({
      filter: (page) => !NOINDEX.has(new URL(page).pathname.replace(/\/$/, '')) && !page.includes('/404'),
    }),
  ],
  fonts: [
    {
      name: 'Bricolage Grotesque',
      cssVariable: '--font-display',
      provider: fontProviders.local(),
      fallbacks: ['Arial Narrow', 'sans-serif'],
      options: {
        variants: [
          { weight: '200 800', style: 'normal', src: ['./src/assets/fonts/bricolage-grotesque-latin-wdth-normal.woff2'] },
        ],
      },
    },
    {
      name: 'Instrument Sans',
      cssVariable: '--font-body',
      provider: fontProviders.local(),
      fallbacks: ['sans-serif'],
      options: {
        variants: [
          { weight: '400 700', style: 'normal', src: ['./src/assets/fonts/instrument-sans-latin-wght-normal.woff2'] },
        ],
      },
    },
    {
      name: 'DM Mono',
      cssVariable: '--font-mono',
      provider: fontProviders.local(),
      fallbacks: ['monospace'],
      options: {
        variants: [
          { weight: 400, style: 'normal', src: ['./src/assets/fonts/dm-mono-latin-400-normal.woff2'] },
        ],
      },
    },
  ],
});
