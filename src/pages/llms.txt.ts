import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE } from '../data/site';

// Fichier optionnel : Google l'ignore, d'autres moteurs de réponse peuvent le lire.
export const GET: APIRoute = async () => {
  const byOrder = <T extends { data: { order: number } }>(a: T, b: T) => a.data.order - b.data.order;
  const services = (await getCollection('services')).sort(byOrder);
  const zones = await getCollection('zones');
  const guides = await getCollection('guides');
  const line = (path: string, title: string, description: string) => `- [${title}](${SITE.url}${path}): ${description}`;

  const body = `# ${SITE.name}

> Entreprise artisanale du bâtiment dirigée par ${SITE.owner} à ${SITE.address.city} (Charente, France) : charpente, couverture, nettoyage de toiture, isolation, aménagement de combles, plaquisterie, menuiserie, aménagement intérieur, ossature bois, bardage et rénovation.

## Informations clés

- Téléphone : ${SITE.phone}
- Email : ${SITE.email}
- Adresse : ${SITE.address.street}, ${SITE.address.postalCode} ${SITE.address.city}
- Zone : toute la Charente (16), déplacements en Charente-Maritime (17) et en Dordogne (24)
- Horaires : ${SITE.hours.text}
- Forme juridique : ${SITE.legal.form}, ${SITE.legal.rcs}, SIRET ${SITE.legal.siret}
- Activité créée le 10 novembre 2017 ; société depuis novembre 2025
- Devis gratuit, réponse ${SITE.responseDelay}, assurance décennale

## Services

${services.map((s) => line(`/services/${s.id}`, s.data.label, s.data.description)).join('\n')}

## Zone d'intervention

${zones.map((z) => line(`/zone-intervention/${z.id}`, z.data.name, z.data.description)).join('\n')}

## Guides

${guides.map((g) => line(`/guides/${g.id}`, g.data.h1, g.data.description)).join('\n')}

## Pages utiles

${line('/a-propos', 'À propos', 'Le parcours de Raphaël Bardan et l\'histoire de l\'entreprise.')}
${line('/faq', 'Questions fréquentes', 'Réponses sur les devis, la zone, les garanties et les travaux.')}
${line('/contact', 'Contact', 'Demande de devis gratuit.')}
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
