// Affiche le bilan des prises de contact du site.
// Usage : npm run mesures            (30 derniers jours)
//         npm run mesures -- 90      (90 derniers jours)
// La clé se lit dans MESURES_CLE, ou dans le fichier .env.local (non versionné).
import { readFileSync } from 'node:fs';

const SITE = process.env.MESURES_SITE ?? 'https://br16batiment.com';
let cle = process.env.MESURES_CLE;
if (!cle) {
  try {
    cle = readFileSync(new URL('../.env.local', import.meta.url), 'utf8').match(/^MESURES_CLE=(.+)$/m)?.[1]?.trim();
  } catch { /* pas de fichier */ }
}
if (!cle) {
  console.error('Clé manquante : définissez MESURES_CLE ou ajoutez MESURES_CLE=... dans .env.local.');
  process.exit(1);
}

const jours = Number(process.argv[2] ?? 30);
const reponse = await fetch(`${SITE}/api/mesures?jours=${jours}`, { headers: { Authorization: `Bearer ${cle}` } });
if (!reponse.ok) {
  console.error(`Échec ${reponse.status} : ${await reponse.text()}`);
  process.exit(1);
}
const b = await reponse.json();

const ligne = (o) => `${o.devis ?? 0} devis, ${o.appel ?? 0} appels, ${o.email ?? 0} emails`;
const trier = (o) => Object.entries(o).sort(([, x], [, y]) => (y.devis ?? 0) * 3 + (y.appel ?? 0) * 3 + (y.email ?? 0) - ((x.devis ?? 0) * 3 + (x.appel ?? 0) * 3 + (x.email ?? 0)));

console.log(`\nPrises de contact depuis le ${b.depuis} (${b.jours} jours) : ${ligne(b.total)}\n`);
console.log('Par jour');
for (const j of b.parJour) console.log(`  ${j.jour}  ${ligne(j)}`);
console.log('\nPar origine de la visite');
for (const [s, o] of trier(b.parSource)) console.log(`  ${s.padEnd(28)} ${ligne(o)}`);
console.log('\nPar page');
for (const [p, o] of trier(b.parPage)) console.log(`  ${p.padEnd(48)} ${ligne(o)}`);
if (Object.keys(b.parProjet).length) {
  console.log('\nProjets demandés en devis');
  for (const [p, n] of Object.entries(b.parProjet).sort(([, x], [, y]) => y - x)) console.log(`  ${p.padEnd(40)} ${n}`);
}
console.log('');
