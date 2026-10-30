import { COMPLEMENTS, SITE, SPECIALITES } from '../data/site';
import geo from '../data/geo.json';

const ORG_ID = `${SITE.url}/#entreprise`;
const SITE_ID = `${SITE.url}/#site`;
const PERSON_ID = `${SITE.url}/a-propos#raphael-bardan`;

export const abs = (path: string) => new URL(path, SITE.url).href.replace(/\/$/, path === '/' ? '/' : '');

// Les termes employés par les clients pour décrire les spécialités de l'entreprise.
const KNOWS_ABOUT = [
  'Plaquisterie', 'Pose de placo', 'Cloisons', 'Doublage', 'Plafonds en plaques de plâtre',
  'Isolation intérieure', 'Isolation des murs par l\'intérieur', 'Isolation des combles',
  'Menuiserie intérieure', 'Menuiserie extérieure', 'Remplacement de fenêtres',
  'Démoussage de toiture', 'Traitement hydrofuge de toiture',
  'Rénovation intérieure', 'Pose de parquet flottant', 'Pose de lino', 'Création de dressing', 'Aménagement intérieur', 'Pose de cuisine',
];

const catalog = (name: string, services: readonly { slug: string; label: string }[]) => ({
  '@type': 'OfferCatalog',
  name,
  itemListElement: services.map((s) => ({
    '@type': 'Offer',
    itemOffered: { '@type': 'Service', name: s.label, url: abs(`/services/${s.slug}`) },
  })),
});

export function organization() {
  return {
    '@type': 'HomeAndConstructionBusiness',
    '@id': ORG_ID,
    name: SITE.name,
    legalName: SITE.legal.denomination,
    alternateName: SITE.alternateNames,
    slogan: SITE.tagline,
    description:
      'Entreprise artisanale du bâtiment dirigée par Raphaël Bardan à Champagne-Vigny (Charente). Spécialités : plaquisterie, isolation intérieure, menuiserie, démoussage et traitement hydrofuge de toiture, rénovation intérieure (parquet flottant, lino, dressing, pose de cuisine). Réalise aussi, en complément, l\'aménagement de combles, le bardage, la charpente, la couverture et l\'ossature bois. Non qualifiée RGE. Activité créée en 2017, société par actions simplifiée depuis novembre 2025.',
    url: `${SITE.url}/`,
    logo: abs('/logo.png'),
    image: abs('/og-image.png'),
    telephone: SITE.phoneE164,
    email: SITE.email,
    vatID: SITE.legal.vat,
    iso6523Code: `0009:${SITE.legal.siretRaw}`,
    identifier: { '@type': 'PropertyValue', propertyID: 'SIRET', value: SITE.legal.siretRaw },
    foundingDate: '2017-11-10',
    founder: { '@id': PERSON_ID },
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.street,
      postalCode: SITE.address.postalCode,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      addressCountry: SITE.address.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: SITE.geo.lat, longitude: SITE.geo.lon },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: SITE.hours.days,
      opens: SITE.hours.opens,
      closes: SITE.hours.closes,
    },
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Charente' },
      { '@type': 'AdministrativeArea', name: 'Charente-Maritime' },
      { '@type': 'AdministrativeArea', name: 'Dordogne' },
      ...geo.communes.map((c) => ({ '@type': 'City', name: c.name })),
    ],
    knowsAbout: KNOWS_ABOUT,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Travaux réalisés par BR 16 BATIMENT',
      itemListElement: [
        catalog('Spécialités : intérieur de la maison', SPECIALITES.filter((s) => s.place === 'interieur')),
        catalog('Spécialités : entretien de la toiture', SPECIALITES.filter((s) => s.place === 'toit')),
        catalog('Travaux réalisés en complément', COMPLEMENTS),
      ],
    },
  };
}

export function person() {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: SITE.owner,
    jobTitle: 'Président de BR 16 BATIMENT, artisan du bâtiment',
    worksFor: { '@id': ORG_ID },
    url: abs('/a-propos'),
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      name: 'Baccalauréat professionnel menuiserie',
      credentialCategory: 'degree',
      dateCreated: '1999',
    },
  };
}

export function website() {
  return { '@type': 'WebSite', '@id': SITE_ID, url: `${SITE.url}/`, name: SITE.name, alternateName: SITE.alternateNames, inLanguage: 'fr-FR', publisher: { '@id': ORG_ID } };
}

export function webpage(path: string, title: string, description: string, modified?: Date) {
  return {
    '@type': 'WebPage',
    '@id': `${abs(path)}#page`,
    url: abs(path),
    name: title,
    description,
    inLanguage: 'fr-FR',
    isPartOf: { '@id': SITE_ID },
    about: { '@id': ORG_ID },
    ...(modified ? { dateModified: modified.toISOString().slice(0, 10) } : {}),
  };
}

export function breadcrumbList(crumbs: { name: string; href: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: abs(c.href) })),
  };
}

export function service(path: string, name: string, description: string, names: string[] = []) {
  return {
    '@type': 'Service',
    '@id': `${abs(path)}#service`,
    name,
    ...(names.length ? { alternateName: names } : {}),
    description,
    url: abs(path),
    serviceType: name,
    provider: { '@id': ORG_ID },
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Charente' },
      { '@type': 'AdministrativeArea', name: 'Charente-Maritime' },
      { '@type': 'AdministrativeArea', name: 'Dordogne' },
    ],
  };
}

export function article(path: string, headline: string, description: string, published: Date, updated: Date) {
  return {
    '@type': 'Article',
    '@id': `${abs(path)}#article`,
    headline,
    description,
    url: abs(path),
    mainEntityOfPage: abs(path),
    image: abs('/og-image.png'),
    inLanguage: 'fr-FR',
    datePublished: published.toISOString().slice(0, 10),
    dateModified: updated.toISOString().slice(0, 10),
    author: { '@id': PERSON_ID },
    publisher: { '@id': ORG_ID },
  };
}

export const graph = (nodes: object[]) => ({ '@context': 'https://schema.org', '@graph': nodes });
