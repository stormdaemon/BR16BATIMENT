// Relie les chantiers de src/data/preuves.ts à leurs fichiers image.
// Une photo dont le fichier manque n'est pas affichée ; un chantier sans photo non plus.
import type { ImageMetadata } from 'astro';
import { REALISATIONS, type Photo, type Realisation } from '../data/preuves';

const files = import.meta.glob<{ default: ImageMetadata }>('../assets/realisations/*.{jpg,jpeg,png,webp}', { eager: true });

export interface Cliche extends Photo { image: ImageMetadata }
export interface Chantier extends Realisation { cliches: Cliche[]; une: Cliche }

export const CHANTIERS: Chantier[] = REALISATIONS.flatMap((r) => {
  const cliches = r.photos.flatMap((p) => {
    const image = files[`../assets/realisations/${p.fichier}`]?.default;
    return image ? [{ ...p, image }] : [];
  });
  return cliches.length ? [{ ...r, cliches, une: cliches.find((c) => c.une) ?? cliches[0] }] : [];
});

export const TOTAL_PHOTOS = CHANTIERS.reduce((n, c) => n + c.cliches.length, 0);

// Les photos d'un service : d'abord celle qui représente chaque chantier, puis les autres.
export function selection(service?: string, max = 3): Cliche[] {
  const chantiers = CHANTIERS.filter((c) => !service || c.services.some((s) => s === service));
  const unes = chantiers.map((c) => c.une);
  const autres = chantiers.flatMap((c) => c.cliches).filter((c) => !unes.includes(c));
  return [...unes, ...autres].slice(0, max);
}
