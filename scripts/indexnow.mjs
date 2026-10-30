// Signale les pages du site à Bing et aux autres moteurs IndexNow, sans compte.
// La clé est publique par nature : elle prouve seulement que le site est bien le nôtre.
// usage : npm run indexnow                 toutes les pages du sitemap en production
//         npm run indexnow -- faq guides   seulement ces pages, après une modification (. pour l'accueil)
// Les chemins s'écrivent sans barre au début : Git Bash transforme /faq en chemin Windows.
const HOST = 'br16batiment.com';
const SITE = `https://${HOST}`;
const KEY = 'fdff29a28660573eb57d0a44bd49c9cb';

let urlList = process.argv.slice(2).map((path) => new URL(path.replace(/^\/+/, ''), `${SITE}/`).href);
const foreign = urlList.filter((url) => !url.startsWith(`${SITE}/`));
if (foreign.length) {
  console.error(`Adresses hors du site, rien n'est envoyé : ${foreign.join(', ')}`);
  process.exit(1);
}
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
