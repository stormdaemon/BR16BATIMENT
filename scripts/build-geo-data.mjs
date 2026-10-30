// Régénère src/data/geo.json : communes desservies (INSEE, population, intercommunalité),
// distances routières depuis Champagne-Vigny (IGN Géoplateforme) et tracés SVG de la carte.
// Usage : node scripts/build-geo-data.mjs
import { writeFileSync } from 'node:fs';

const BASE = { name: 'Champagne-Vigny', lat: 45.50348, lon: 0.0399 };

const COMMUNES = [
  { slug: 'angouleme', insee: '16015' },
  { slug: 'cognac', insee: '16102' },
  { slug: 'barbezieux-saint-hilaire', insee: '16028' },
  { slug: 'coteaux-du-blanzacais', insee: '16046' },
  { slug: 'villebois-lavalette', insee: '16408' },
  { slug: 'montmoreau', insee: '16230' },
  { slug: 'chalais', insee: '16073' },
  { slug: 'aubeterre-sur-dronne', insee: '16020' },
  { slug: 'jarnac', insee: '16167' },
  { slug: 'chateauneuf-sur-charente', insee: '16090' },
  { slug: 'segonzac', insee: '16366' },
  { slug: 'la-couronne', insee: '16113' },
  { slug: 'soyaux', insee: '16374' },
  { slug: 'ruelle-sur-touvre', insee: '16291' },
];

const DEPARTEMENTS = [
  { code: '16', name: 'charente', file: '16-charente/departement-16-charente' },
  { code: '17', name: 'charente-maritime', file: '17-charente-maritime/departement-17-charente-maritime' },
  { code: '24', name: 'dordogne', file: '24-dordogne/departement-24-dordogne' },
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const json = async (url) => {
  const r = await fetch(url, { headers: { 'User-Agent': 'br16batiment-site-build' } });
  if (!r.ok) throw new Error(`${r.status} ${url}`);
  return r.json();
};

const communes = [];
for (const c of COMMUNES) {
  const g = await json(`https://geo.api.gouv.fr/communes/${c.insee}?fields=nom,code,codesPostaux,centre,population,epci,departement`);
  const [lon, lat] = g.centre.coordinates;
  let km = null;
  let minutes = null;
  try {
    const route = await json(`https://data.geopf.fr/navigation/itineraire?resource=bdtopo-valhalla&profile=car&optimization=fastest&start=${BASE.lon},${BASE.lat}&end=${lon},${lat}&distanceUnit=kilometer&timeUnit=minute`);
    km = Math.round(route.distance);
    minutes = Math.round(route.duration);
  } catch (e) {
    console.warn('route failed', c.slug, e.message);
  }
  communes.push({ slug: c.slug, insee: g.code, name: g.nom, postalCode: g.codesPostaux[0], lat, lon, population: g.population, epci: g.epci?.nom ?? null, km, minutes });
  console.log(g.nom, g.code, g.population, g.epci?.nom, km, minutes);
  await sleep(150);
}

// Douglas-Peucker on [x, y] rings.
const perpDist = (p, a, b) => {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  if (dx === 0 && dy === 0) return Math.hypot(p[0] - a[0], p[1] - a[1]);
  return Math.abs(dy * p[0] - dx * p[1] + b[0] * a[1] - b[1] * a[0]) / Math.hypot(dx, dy);
};
const simplify = (pts, eps) => {
  if (pts.length < 3) return pts;
  let max = 0;
  let idx = 0;
  for (let i = 1; i < pts.length - 1; i++) {
    const d = perpDist(pts[i], pts[0], pts[pts.length - 1]);
    if (d > max) { max = d; idx = i; }
  }
  if (max <= eps) return [pts[0], pts[pts.length - 1]];
  return [...simplify(pts.slice(0, idx + 1), eps).slice(0, -1), ...simplify(pts.slice(idx), eps)];
};

// Equirectangular projection centred on the Charente, viewBox 0 0 800 760.
const LAT0 = 45.7;
const LON0 = 0.2;
const K = 800 / 1.75;
const COS = Math.cos((LAT0 * Math.PI) / 180);
const project = (lon, lat) => [
  +(400 + (lon - LON0) * COS * K * 1.0).toFixed(1),
  +(380 - (lat - LAT0) * K).toFixed(1),
];

const paths = {};
for (const d of DEPARTEMENTS) {
  const g = await json(`https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/departements/${d.file}.geojson`);
  const geom = g.type === 'FeatureCollection' ? g.features[0].geometry : g.geometry;
  const polys = geom.type === 'MultiPolygon' ? geom.coordinates : [geom.coordinates];
  const parts = [];
  for (const poly of polys) {
    const ring = poly[0].map(([x, y]) => project(x, y));
    const s = simplify(ring, 0.9);
    if (s.length < 6) continue;
    parts.push(`M${s.map((p) => p.join(' ')).join('L')}Z`);
  }
  paths[d.name] = parts.join('');
  console.log(d.name, 'path length', paths[d.name].length);
}

const out = {
  viewBox: '0 0 800 760',
  base: { ...BASE, xy: project(BASE.lon, BASE.lat) },
  communes: communes.map((c) => ({ ...c, xy: project(c.lon, c.lat) })),
  paths,
  sources: {
    communes: 'geo.api.gouv.fr',
    routes: 'IGN Géoplateforme, service d\'itinéraire bdtopo-valhalla',
    contours: 'france-geojson (gregoiredavid), données Etalab',
  },
};
writeFileSync(new URL('../src/data/geo.json', import.meta.url), JSON.stringify(out, null, 1));
console.log('written src/data/geo.json');
