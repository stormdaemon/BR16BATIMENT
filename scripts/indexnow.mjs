// Signale les pages du site à Bing et aux autres moteurs IndexNow, sans compte.
// La clé est publique par nature : elle prouve seulement que le site est bien le nôtre.
// usage : npm run indexnow                  toutes les pages du sitemap en production
//         npm run indexnow -- /faq /guides  seulement ces pages, après une modification
const HOST = 'br16batiment.com';
const SITE = `https://${HOST}`;
const KEY = 'fdff29a28660573eb57d0a44bd49c9cb';

const paths = process.argv.slice(2);
let urlList = paths.map((path) => `${SITE}${path}`);
if (!urlList.length) {
  const sitemap = await (await fetch(`${SITE}/sitemap-0.xml`)).text();
  urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
}

const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList }),
});

console.log(`${urlList.length} adresses envoyées, réponse ${response.status}`);
if (!response.ok) process.exit(1);
