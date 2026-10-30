// Contrôle qualité du site généré, lancé à chaque build (npm run build).
// Une erreur bloque le déploiement : un site cassé ne doit jamais partir en production.
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { parse } from 'node-html-parser';

const DIST = new URL('../dist/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const SITE = 'https://br16batiment.com';

// La palette de l'identité, à la valeur près. Aucune autre couleur n'est admise.
const PALETTE = new Set(['#e7cf25', '#282425', '#1a1718', '#f8f8f8', '#ffffff', '#fff', '#666666', '#666', '#cccccc', '#ccc', '#333333', '#333', '#155724', '#d4edda', '#721c24', '#f8d7da']);
const PALETTE_RGB = new Set(['231 207 37', '40 36 37', '26 23 24', '248 248 248', '255 255 255']);

// Seuils de contenu par type de page (contrôles qualité du skill claude-seo).
const MIN_WORDS = [
  [/^\/$/, 450],
  [/^\/services\/.+/, 650],
  [/^\/zone-intervention\/.+/, 450],
  [/^\/guides\/.+/, 900],
  [/^\/faq$/, 700],
  [/^\/a-propos$/, 350],
];

// Les besoins que l'entreprise veut couvrir : chaque page emploie les mots de ses clients.
const BESOINS = {
  '/services/plaquisterie': ['plaquiste', 'placo', 'cloison', 'doublage', 'charente'],
  '/services/isolation-interieure': ['isolation intérieure', "murs par l'intérieur", 'rge', 'charente'],
  '/services/menuiserie': ['menuiserie intérieure', 'fenêtre', 'porte', 'charente'],
  '/services/renovation-interieure': ['rénovation intérieure', 'artisan', 'charente'],
  '/services/parquet-lino': ['parquet flottant', 'lino', 'charente'],
  '/services/dressing-amenagement-interieur': ['dressing', 'aménagement intérieur', 'charente'],
  '/services/pose-cuisine': ['pose de cuisine', 'charente'],
  '/services/demoussage-toiture': ['démoussage', 'toiture', 'charente'],
  '/services/hydrofuge-toiture': ['hydrofuge', 'toiture', 'charente'],
  '/zone-intervention/angouleme': ['plaquiste', 'angoulême'],
};

const errors = [];
const warnings = [];
const fail = (page, msg) => errors.push(`${page} : ${msg}`);
const warn = (page, msg) => warnings.push(`${page} : ${msg}`);

const walk = (dir) => readdirSync(dir).flatMap((f) => {
  const p = join(dir, f);
  return statSync(p).isDirectory() ? walk(p) : [p];
});
const files = walk(DIST);
// Le fichier de vérification de la Search Console n'est pas une page du site.
const htmlFiles = files.filter((f) => f.endsWith('.html') && !/google[0-9a-f]+\.html$/.test(f));

const urlOf = (file) => {
  const rel = `/${relative(DIST, file).split(sep).join('/')}`;
  if (rel === '/index.html') return '/';
  return rel.replace(/\/index\.html$/, '').replace(/\.html$/, '');
};

const exists = new Set(files.map((f) => `/${relative(DIST, f).split(sep).join('/')}`));
const resolves = (path) => path === '/' || exists.has(path) || exists.has(`${path}.html`) || exists.has(`${path}/index.html`);

const titles = new Map();
const descriptions = new Map();
const zoneTexts = new Map();
const serviceTexts = new Map();
const indexable = new Set();
const inbound = new Map();

for (const file of htmlFiles) {
  const page = urlOf(file);
  const html = readFileSync(file, 'utf8');
  const root = parse(html);
  const is404 = page === '/404';

  if (root.querySelector('html')?.getAttribute('lang') !== 'fr') fail(page, 'lang="fr" absent');

  const title = root.querySelector('title')?.text.trim() ?? '';
  if (!title) fail(page, 'titre absent');
  else if (title.length < 30 || title.length > 60) fail(page, `titre de ${title.length} caractères (30-60) : « ${title} »`);
  if (/BR 16(?! BATIMENT)/.test(title)) fail(page, `nom de l'entreprise tronqué dans le titre : « ${title} »`);
  if (titles.has(title)) fail(page, `titre identique à ${titles.get(title)}`);
  titles.set(title, page);

  const desc = root.querySelector('meta[name="description"]')?.getAttribute('content') ?? '';
  if (desc.length < 120 || desc.length > 160) fail(page, `description de ${desc.length} caractères (120-160)`);
  if (descriptions.has(desc)) fail(page, `description identique à ${descriptions.get(desc)}`);
  descriptions.set(desc, page);

  const canonical = root.querySelector('link[rel="canonical"]')?.getAttribute('href');
  const expected = page === '/' ? `${SITE}/` : `${SITE}${page}`;
  if (!is404 && canonical !== expected) fail(page, `canonical « ${canonical} », attendu « ${expected} »`);

  const robots = root.querySelector('meta[name="robots"]')?.getAttribute('content') ?? '';
  const noindex = robots.includes('noindex');
  if (!noindex) indexable.add(page);

  const h1 = root.querySelectorAll('h1');
  if (h1.length !== 1) fail(page, `${h1.length} balises h1 (1 attendue)`);

  // Hiérarchie : pas de saut de niveau dans le contenu principal.
  const main = root.querySelector('main');
  if (!main) fail(page, '<main> absent');
  let prev = 1;
  for (const h of main?.querySelectorAll('h1,h2,h3,h4') ?? []) {
    const level = Number(h.tagName[1]);
    if (level > prev + 1) warn(page, `saut de titre h${prev} → h${level} (« ${h.text.trim().slice(0, 40)} »)`);
    prev = level;
  }

  for (const s of root.querySelectorAll('script[type="application/ld+json"]')) {
    try {
      const data = JSON.parse(s.text);
      if (!data['@context'] || !data['@graph']) fail(page, 'JSON-LD sans @context ou @graph');
    } catch {
      fail(page, 'JSON-LD invalide');
    }
  }

  for (const img of root.querySelectorAll('img')) {
    if (img.getAttribute('alt') === undefined) fail(page, `image sans alt : ${img.getAttribute('src')}`);
    if (!img.getAttribute('width') || !img.getAttribute('height')) warn(page, `image sans dimensions : ${img.getAttribute('src')}`);
  }

  for (const a of root.querySelectorAll('a[href]')) {
    const href = a.getAttribute('href');
    if (!href || href.startsWith('tel:') || href.startsWith('mailto:') || href.startsWith('#') || /^https?:/.test(href)) continue;
    const clean = href.split(/[?#]/)[0].replace(/\/$/, '') || '/';
    if (!resolves(clean)) fail(page, `lien interne cassé : ${href}`);
    if (!inbound.has(clean)) inbound.set(clean, new Set());
    if (clean !== page) inbound.get(clean).add(page);
  }

  // Le contenu doit exister dans le HTML brut, sans JavaScript.
  const text = (main?.text ?? '').replace(/\s+/g, ' ').trim();
  const words = text.split(' ').length;
  const rule = MIN_WORDS.find(([re]) => re.test(page));
  if (rule && !noindex && words < rule[1]) fail(page, `${words} mots dans le HTML brut (minimum ${rule[1]})`);

  if (/br16batiment\.fr|netlify\.app|contact@br16/.test(html)) fail(page, 'référence à un ancien domaine ou email');
  if (/833 ?229 ?727 ?00015|FR66833229727/.test(html)) fail(page, 'ancien SIRET ou ancienne TVA');

  // Le site parle avec la voix de l'artisan : pas de tournures de chercheur.
  const voice = text.match(/je n.ai (pas trouvé|trouvé aucune?|pas pu|pas vérifié|pas de donnée|pas identifié)|sources? (ouvertes?|consultées?)|pu être consultés?|reprises? par wikipédia/i);
  if (voice) fail(page, `tournure à reformuler : « ${voice[0]} »`);

  if (/BR 16(?! BATIMENT)/.test(text)) fail(page, `nom de l'entreprise tronqué : « ${text.match(/.{0,30}BR 16(?! BATIMENT).{0,20}/)[0]} »`);

  // Ce que l'entreprise ne fait pas ne doit jamais ressembler à une offre.
  const promise = text.match(/rge à ce jour|dites-le dès|traitement (curatif|anti-termites) (de|du|des) |éligibles? aux aides/i);
  if (promise) fail(page, `promesse à retirer : « ${promise[0]} »`);

  const lower = text.toLowerCase().replace(/\u00a0/g, ' ').replace(/’/g, "'");
  for (const term of BESOINS[page] ?? []) {
    if (!lower.includes(term)) fail(page, `besoin non couvert : « ${term} » absent`);
  }

  // Les prix de l'entreprise sont sur devis : un montant n'apparaît que dans un guide, annoncé comme une fourchette de comparaison.
  if (/€/.test(text)) {
    if (page === '/' || /^\/(services|zone-intervention)(\/|$)/.test(page)) fail(page, 'un montant affiché hors des guides ressemble à un tarif');
    if (page.startsWith('/guides/') && !/sur devis/.test(text)) fail(page, 'montants affichés sans la mention « prix sur devis »');
    const answer = root.querySelector('.ph__answer')?.text ?? '';
    if (/€/.test(answer) && !/sur devis/.test(answer)) fail(page, 'résumé avec un montant, sans la mention « sur devis »');
  }

  // Chaque page service suit le même fil : problème, exemples, preuves, zone, devis.
  if (/^\/services\/.+/.test(page)) {
    for (const part of ['problemes', 'exemples', 'preuves', 'zone']) {
      if (!root.querySelector(`[data-section="${part}"]`)) fail(page, `section « ${part} » absente`);
    }
    if (!root.querySelector('.cta')) fail(page, 'appel à devis absent');
    serviceTexts.set(page, (main?.querySelector('article')?.text ?? '').toLowerCase());
  }

  if (page.startsWith('/zone-intervention/')) zoneTexts.set(page, (main?.querySelector('article')?.text ?? '').toLowerCase());
}

// Anti-pages satellites : deux pages locales ne doivent pas se ressembler.
const shingles = (t) => {
  const w = t.split(/\s+/).filter(Boolean);
  const out = new Set();
  for (let i = 0; i + 4 < w.length; i++) out.add(w.slice(i, i + 5).join(' '));
  return out;
};
const compare = (texts) => {
  const list = [...texts].map(([p, t]) => [p, shingles(t)]);
  for (let i = 0; i < list.length; i++) {
    for (let j = i + 1; j < list.length; j++) {
      const [pa, a] = list[i];
      const [pb, b] = list[j];
      const inter = [...a].filter((x) => b.has(x)).length;
      const sim = inter / Math.max(1, Math.min(a.size, b.size));
      if (sim > 0.4) fail(pa, `texte trop proche de ${pb} (${Math.round(sim * 100)} %)`);
    }
  }
  return list;
};
compare(serviceTexts);
const zones = compare(zoneTexts);
if (zones.length >= 30) warn('zones', `${zones.length} pages locales : au-delà de 30, surveiller le risque de pages satellites`);

// Pas de page orpheline.
for (const page of indexable) {
  if (page === '/' || page === '/404') continue;
  if (!inbound.get(page)?.size) fail(page, 'page orpheline : aucun lien interne');
}

// Sitemap complet et sans page exclue.
const sitemapFile = join(DIST, 'sitemap-0.xml');
if (!existsSync(sitemapFile)) {
  fail('sitemap', 'sitemap-0.xml absent');
} else {
  const locs = new Set([...readFileSync(sitemapFile, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));
  for (const page of indexable) {
    if (page === '/404') continue;
    const url = page === '/' ? `${SITE}/` : `${SITE}${page}`;
    if (!locs.has(url)) fail('sitemap', `page absente : ${url}`);
  }
  for (const loc of locs) {
    const page = loc.replace(SITE, '') || '/';
    if (!indexable.has(page)) fail('sitemap', `page non indexable ou inexistante : ${loc}`);
  }
}

// robots.txt et llms.txt.
const robots = existsSync(join(DIST, 'robots.txt')) ? readFileSync(join(DIST, 'robots.txt'), 'utf8') : '';
if (!robots.includes(`Sitemap: ${SITE}/sitemap-index.xml`)) fail('robots.txt', 'ligne Sitemap incorrecte');
if (/^Disallow:\s*\/\s*$/m.test(robots)) fail('robots.txt', 'le site est bloqué');
if (!existsSync(join(DIST, 'llms.txt'))) fail('llms.txt', 'absent');

// Palette : toute couleur livrée doit appartenir à l'identité.
for (const file of files.filter((f) => /\.(css|html|svg)$/.test(f))) {
  const src = readFileSync(file, 'utf8');
  const name = relative(DIST, file);
  for (const m of src.matchAll(/#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b/g)) {
    const before = src[m.index - 1];
    if (before === '&' || /[\w-]/.test(before ?? '')) continue;
    const near = src.slice(Math.max(0, m.index - 8), m.index);
    if (/url\(|href=|["'(]$/.test(near) && !/:\s*$/.test(near) && /href|url/.test(near)) continue;
    if (!PALETTE.has(m[0].toLowerCase())) fail(name, `couleur hors identité : ${m[0]}`);
  }
  for (const m of src.matchAll(/rgba?\(\s*(\d+)[ ,]+(\d+)[ ,]+(\d+)/g)) {
    const key = `${m[1]} ${m[2]} ${m[3]}`;
    if (!PALETTE_RGB.has(key)) fail(name, `couleur hors identité : rgb(${key})`);
  }
}

const count = htmlFiles.length;
if (warnings.length) console.log(`\n${warnings.length} avertissement(s) :\n${[...new Set(warnings)].map((w) => `  - ${w}`).join('\n')}`);
if (errors.length) {
  console.error(`\n${errors.length} erreur(s) sur ${count} pages :\n${[...new Set(errors)].map((e) => `  ✗ ${e}`).join('\n')}\n`);
  process.exit(1);
}
console.log(`\n✓ Contrôle SEO réussi : ${count} pages, ${indexable.size} indexables, palette respectée.\n`);
