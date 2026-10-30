// Source unique des informations sur l'entreprise.
// Vérifié le 30/10/2026 : registre SIRENE, BODACC (23/11/2025), VIES.
// Toute information affichée sur le site doit venir d'ici : c'est la cohérence
// de ces données d'une page à l'autre qui rend l'entreprise identifiable par les moteurs.

export const SITE = {
  url: 'https://br16batiment.com',
  name: 'BR 16 BATIMENT',
  // L'écriture officielle est celle du logo et des registres ; les clients écrivent aussi :
  alternateNames: ['BR16 Bâtiment', 'BR 16 Bâtiment', 'BR16 BATIMENT'],
  owner: 'Raphaël Bardan',
  tagline: 'Plaquisterie, isolation, menuiserie et démoussage en Charente',
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

// Les priorités de l'entreprise : tier 1, ce qu'elle veut faire et mettre en avant ;
// tier 2, ce qu'elle réalise aussi, en complément, sans le pousser.
// Chaque service part du problème du client (problem) et dit ce qu'elle y fait (short).
export const SERVICES = [
  { slug: 'plaquisterie', label: 'Plaquisterie', tier: 1, place: 'interieur', problem: 'Une pièce à redécouper, des cloisons à refaire ?', short: 'Je monte vos cloisons, doublages et plafonds en placo, prêts à peindre.' },
  { slug: 'isolation-interieure', label: 'Isolation intérieure', tier: 1, place: 'interieur', problem: 'Des murs froids, une pièce difficile à chauffer ?', short: 'J\'isole vos murs par l\'intérieur, vos combles et vos rampants.' },
  { slug: 'menuiserie', label: 'Menuiserie', tier: 1, place: 'interieur', problem: 'Des fenêtres qui laissent passer l\'air, des portes à changer ?', short: 'Je remplace fenêtres et portes, et je réalise vos menuiseries intérieures.' },
  { slug: 'demoussage-toiture', label: 'Démoussage de toiture', tier: 1, place: 'toit', problem: 'De la mousse qui envahit le toit ?', short: 'Je démousse la toiture et je vide les gouttières, sans abîmer les tuiles.' },
  { slug: 'hydrofuge-toiture', label: 'Traitement hydrofuge', tier: 1, place: 'toit', problem: 'Des tuiles qui restent gorgées d\'eau ?', short: 'J\'applique un hydrofuge sur des tuiles encore saines, et je vous dis quand il ne sert à rien.' },
  { slug: 'renovation-interieure', label: 'Rénovation intérieure', tier: 1, place: 'interieur', problem: 'Tout l\'intérieur à reprendre ?', short: 'Cloisons, isolation, sols, menuiseries, cuisine : un seul interlocuteur, pièce par pièce.' },
  { slug: 'parquet-lino', label: 'Parquet flottant et lino', tier: 1, place: 'interieur', problem: 'Un sol usé à remplacer ?', short: 'Je pose votre parquet flottant ou votre lino, avec plinthes et finitions.' },
  { slug: 'dressing-amenagement-interieur', label: 'Dressing et aménagement intérieur', tier: 1, place: 'interieur', problem: 'Plus assez de rangement ?', short: 'Je crée votre dressing ou vos placards, y compris sous une pente de toit.' },
  { slug: 'pose-cuisine', label: 'Pose de cuisine', tier: 1, place: 'interieur', problem: 'Une cuisine à installer ?', short: 'Je monte et je pose votre cuisine, et je prépare les murs si besoin.' },
  { slug: 'amenagement-combles', label: 'Aménagement de combles', tier: 2, place: 'interieur', problem: 'Des combles à transformer en pièce ?', short: 'Isolation, placo, fenêtres de toit et finitions.' },
  { slug: 'bardage', label: 'Bardage', tier: 2, place: 'exterieur', problem: 'Une façade à habiller ?', short: 'Pose de bardage bois sur une maison, une extension ou une annexe.' },
  { slug: 'charpente', label: 'Charpente', tier: 2, place: 'exterieur', problem: 'Une charpente à réparer ?', short: 'Réparation, renfort ou charpente neuve, en complément de mes autres travaux.' },
  { slug: 'couverture', label: 'Couverture', tier: 2, place: 'exterieur', problem: 'Des tuiles à remplacer, une fuite ?', short: 'Réparation et réfection de toiture, en complément de mes autres travaux.' },
  { slug: 'ossature-bois', label: 'Ossature bois', tier: 2, place: 'exterieur', problem: 'Une extension en bois ?', short: 'Extension ou annexe à ossature bois.' },
] as const;

export const SPECIALITES = SERVICES.filter((s) => s.tier === 1);
export const COMPLEMENTS = SERVICES.filter((s) => s.tier === 2);

export type ServiceSlug = (typeof SERVICES)[number]['slug'];
