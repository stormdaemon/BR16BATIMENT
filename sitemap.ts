// Tableau des routes copié ici pour éviter tout conflit d'import/export
const routes = [
  { path: '/', component: undefined, exact: true },
  { path: '/a-propos', component: undefined },
  { path: '/services', component: undefined },
  { path: '/contact', component: undefined },
  { path: '/mentions-legales', component: undefined },
  { path: '/politique-confidentialite', component: undefined },
];
import { writeFileSync } from 'fs';

const generateSitemap = () => {
  const baseUrl = 'https://br16batiment.netlify.app';
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${routes
    .map((route) => {
      return `
    <url>
      <loc>${baseUrl}${route.path}</loc>
      <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.8</priority>
    </url>`;
    })
    .join('')}
</urlset>`;

  writeFileSync('public/sitemap.xml', sitemap);
  console.log('Sitemap generated successfully!');
};

generateSitemap();

