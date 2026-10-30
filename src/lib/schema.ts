import { SITE, SERVICES } from '../data/site';
import geo from '../data/geo.json';

const ORG_ID = `${SITE.url}/#entreprise`;
const SITE_ID = `${SITE.url}/#site`;
const PERSON_ID = `${SITE.url}/a-propos#raphael-bardan`;

export const abs = (path: string) => new URL(path, SITE.url).href.replace(/\/$/, path === '/' ? '/' : '');

export function organization() {
  return {
    '@type': ['GeneralContractor', 'RoofingContractor'],
    '@id': ORG_ID,
    name: SITE.name,
    legalName: SITE.legal.denomination,
    description:
      'Entreprise artisanale du bâtiment dirigée par Raphaël Bardan à Champagne-Vigny (Charente) : charpente, couverture, plaquisterie, isolation, menuiserie, ossature bois, bardage, aménagement intérieur, nettoyage de toiture et rénovation. Activité créée en 2017, société par actions simplifiée depuis novembre 2025.',
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
    knowsAbout: SERVICES.map((s) => s.label),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Travaux réalisés par BR 16 BATIMENT',
      itemListElement: SERVICES.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.label, url: abs(`/services/${s.slug}`) },
      })),
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
  return { '@type': 'WebSite', '@id': SITE_ID, url: `${SITE.url}/`, name: SITE.name, inLanguage: 'fr-FR', publisher: { '@id': ORG_ID } };
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

export function service(path: string, name: string, description: string) {
  return {
    '@type': 'Service',
    '@id': `${abs(path)}#service`,
    name,
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
