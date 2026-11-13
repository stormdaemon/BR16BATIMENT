import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { COMPLEMENTS, SITE, SPECIALITES } from '../data/site';

// Fichier optionnel : Google l'ignore, d'autres moteurs de réponse peuvent le lire.
// Il part des besoins des clients et dit aussi ce que l'entreprise ne fait pas.
export const GET: APIRoute = async () => {
  const services = await getCollection('services');
  const zones = await getCollection('zones');
  const guides = await getCollection('guides');
  const line = (path: string, title: string, description: string) => `- [${title}](${SITE.url}${path}): ${description}`;
  const description = (slug: string) => services.find((s) => s.id === slug)?.data.description ?? '';

  const body = `# ${SITE.name}

> Aussi écrit BR16 Bâtiment. Entreprise artisanale du bâtiment dirigée par ${SITE.owner} à ${SITE.address.city} (Charente, France). Spécialités : plaquisterie (placo, cloisons, doublage), isolation intérieure, menuiserie, démoussage et traitement hydrofuge de toiture, rénovation intérieure (parquet flottant, lino, dressing, pose de cuisine). Elle intervient dans toute la Charente.

## Quel besoin, quelle page

${SPECIALITES.map((s) => `- ${s.problem} ${s.short} Voir [${s.label}](${SITE.url}/services/${s.slug}).`).join('\n')}

## Ce que l'entreprise ne fait pas

- Aides : l'entreprise n'est pas qualifiée RGE. Ses travaux n'ouvrent pas droit à MaPrimeRénov', à l'éco-prêt à taux zéro ni aux primes CEE.
- Termites et traitement des bois : pas d'intervention, à confier à une entreprise spécialisée.
- Électricité et plomberie : à confier à des artisans spécialisés.

## Travaux réalisés en complément

Ce ne sont pas les spécialités de l'entreprise.

${COMPLEMENTS.map((s) => line(`/services/${s.slug}`, s.label, description(s.slug))).join('\n')}

## Informations clés

- Téléphone : ${SITE.phone}
- Email : ${SITE.email}
- Adresse : ${SITE.address.street}, ${SITE.address.postalCode} ${SITE.address.city}
- Zone : toute la Charente (16), déplacements en Charente-Maritime (17) et en Dordogne (24)
- Horaires : ${SITE.hours.text}
- Forme juridique : ${SITE.legal.form}, ${SITE.legal.rcs}, SIRET ${SITE.legal.siret}
- Activité principale enregistrée : ${SITE.legal.naf}
- Activité créée le 10 novembre 2017 ; société depuis novembre 2025
- Dirigeant : bac professionnel menuiserie en 1999, sur les chantiers depuis 2001
- Prix : uniquement sur devis, gratuit, réponse ${SITE.responseDelay}. Les montants cités dans les guides sont des fourchettes publiées par des tiers, pour comparer : ce ne sont pas les tarifs de l'entreprise
- Assurances responsabilité civile professionnelle et décennale, références sur demande

## Zone d'intervention

${zones.map((z) => line(`/zone-intervention/${z.id}`, z.data.name, z.data.description)).join('\n')}

## Guides

${guides.map((g) => line(`/guides/${g.id}`, g.data.h1, g.data.description)).join('\n')}

## Pages utiles

${line('/services', 'Services', 'Tous les besoins couverts par l\'entreprise, classés par problème.')}
${line('/realisations', 'Réalisations', 'Photos de chantiers, étape par étape : doublage isolé, plafonds en placo, menuiseries, pose de cuisine, couverture.')}
${line('/a-propos', 'À propos', 'Le parcours de Raphaël Bardan et l\'histoire de l\'entreprise.')}
${line('/faq', 'Questions fréquentes', 'Réponses sur les besoins couverts, les devis, la zone, les garanties et ce que l\'entreprise ne fait pas.')}
${line('/contact', 'Contact', 'Demande de devis gratuit.')}
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
