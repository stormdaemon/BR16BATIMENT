// Les preuves réelles : photos de chantiers et avis de clients.
// Tant que ces listes sont vides, rien ne s'affiche : ni photo d'illustration, ni avis inventé.
//
// Ajouter une réalisation : déposer la photo dans src/assets/realisations/, puis ajouter une ligne ici.
// Ajouter un avis : le recopier tel quel depuis sa source, avec l'accord du client.
import type { ServiceSlug } from './site';

export interface Realisation {
  service: ServiceSlug;
  titre: string;
  commune: string;
  annee: number;
  photo: string; // nom du fichier dans src/assets/realisations/
  alt: string;
}

export interface Avis {
  service?: ServiceSlug;
  texte: string;
  auteur: string;
  commune?: string;
  source: string; // Google, par exemple
  date: string;
}

export const REALISATIONS: Realisation[] = [];

export const AVIS: Avis[] = [];
