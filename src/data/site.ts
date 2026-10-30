// Source unique des informations sur l'entreprise.
// Vérifié le 30/10/2026 : registre SIRENE, BODACC (23/11/2025), VIES.
// Toute information affichée sur le site doit venir d'ici : c'est la cohérence
// de ces données d'une page à l'autre qui rend l'entreprise identifiable par les moteurs.

export const SITE = {
  url: 'https://br16batiment.com',
  name: 'BR 16 BATIMENT',
  owner: 'Raphaël Bardan',
  tagline: 'Charpente, couverture et rénovation en Charente',
  phone: '06 67 11 67 60',
  phoneHref: 'tel:+33667116760',
  phoneE164: '+33667116760',
  email: 'br16batiment@gmail.com',
  address: {
    street: '3 Les Vignes de Chez Rullier',
    postalCode: '16250',
    city: 'Champagne-Vigny',
    department: 'Charente',
    region: 'Nouvelle-Aquitaine',
    country: 'FR',
  },
  geo: { lat: 45.50348, lon: 0.0399 },
  hours: {
    text: 'Du lundi au vendredi, de 8 h à 18 h. Le samedi sur rendez-vous.',
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:00',
    closes: '18:00',
  },
  legal: {
    denomination: 'BR 16 BATIMENT',
    form: 'Société par actions simplifiée (SAS)',
    capital: '38 873 €',
    rcs: 'RCS Angoulême 994 082 071',
    siren: '994 082 071',
    siret: '994 082 071 00014',
    siretRaw: '99408207100014',
    naf: '43.31Z, travaux de plâtrerie',
    vat: 'FR43994082071',
    registered: '20 novembre 2025',
    president: 'Raphaël Bardan',
    previous: 'Entreprise individuelle de Raphaël Bardan, SIREN 833 229 727, créée le 10 novembre 2017 et fermée le 31 octobre 2025.',
  },
  formspree: 'https://formspree.io/f/xeokbklz',
  responseDelay: 'sous 48 h',
  zone: {
    main: 'la Charente (16)',
    extended: 'la Charente-Maritime (17) et la Dordogne (24)',
  },
  credit: 'Une réalisation Théo Multimédia',
} as const;

// Parcours : chaque date vient du site d'origine ou d'un registre public.
export const TIMELINE = [
  { year: '1999', title: 'Bac professionnel menuiserie', text: 'Le point de départ : la formation au travail du bois.' },
  { year: '2001', title: 'Sur les chantiers', text: 'Formation sur le terrain en menuiserie, charpente, couverture, plâtrerie, isolation et ossature bois.' },
  { year: '2013', title: 'Au service de vos projets', text: 'Raphaël Bardan met son expertise au service des projets de second œuvre de ses clients.' },
  { year: '2017', title: 'Création de BR 16 BATIMENT', text: 'L\'entreprise est créée à Champagne-Vigny, le 10 novembre.' },
  { year: '2019', title: 'L\'année du neuf', text: 'Un grand nombre de projets de maisons neuves.' },
  { year: '2023', title: 'Cap sur la rénovation', text: 'Les services s\'élargissent à la rénovation.' },
  { year: '2024', title: 'Priorité aux particuliers', text: 'Un engagement renforcé auprès des particuliers.' },
  { year: '2025', title: 'BR 16 BATIMENT devient une SAS', text: 'L\'activité se poursuit sous forme de société, immatriculée à Angoulême en novembre.' },
] as const;

// Années calculées pour que le site ne vieillisse pas : 2001 → aujourd'hui.
export const yearsSince = (year: number) => new Date().getFullYear() - year;

export const NAV = [
  { href: '/services', label: 'Services' },
  { href: '/zone-intervention', label: 'Zone d\'intervention' },
  { href: '/guides', label: 'Guides' },
  { href: '/a-propos', label: 'À propos' },
  { href: '/contact', label: 'Contact' },
] as const;

// Ordre et libellés courts des services, y compris pour la maison en coupe de l'accueil.
export const SERVICES = [
  { slug: 'charpente', label: 'Charpente', short: 'Traditionnelle ou fermettes, neuve ou réparée.' },
  { slug: 'couverture', label: 'Couverture', short: 'Tuiles, réfection, fuites et zinguerie.' },
  { slug: 'nettoyage-toiture', label: 'Nettoyage de toiture', short: 'Démoussage et traitement pour faire durer le toit.' },
  { slug: 'isolation', label: 'Isolation', short: 'Thermique et phonique, des combles aux murs.' },
  { slug: 'amenagement-combles', label: 'Aménagement de combles', short: 'Gagner une pièce sous le toit.' },
  { slug: 'plaquisterie', label: 'Plaquisterie', short: 'Cloisons, doublages et plafonds.' },
  { slug: 'menuiserie', label: 'Menuiserie', short: 'Fenêtres et portes en PVC, aluminium ou bois.' },
  { slug: 'amenagement-interieur', label: 'Aménagement intérieur', short: 'Cuisines, placards et parquets flottants.' },
  { slug: 'ossature-bois', label: 'Ossature bois', short: 'Maison ou extension, construction durable.' },
  { slug: 'bardage', label: 'Bardage', short: 'Habillage extérieur en bois.' },
  { slug: 'renovation', label: 'Rénovation', short: 'L\'amélioration de votre habitat, poste par poste.' },
] as const;

export type ServiceSlug = (typeof SERVICES)[number]['slug'];
