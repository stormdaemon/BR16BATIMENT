// Les preuves réelles : photos de chantiers et avis de clients.
// Rien d'inventé : ni photo d'illustration, ni avis, ni lieu ou date supposés.
//
// Ajouter une photo : la déposer dans src/assets/realisations/, puis l'ajouter à un chantier ci-dessous.
//   - alt décrit ce que l'on voit, legende est la phrase affichée sous la photo ;
//   - commune et annee ne se renseignent que si elles sont connues ;
//   - pas de visage, de plaque d'immatriculation ni de nom de client à l'image.
// Ajouter un avis : le recopier tel quel depuis sa source, avec l'accord du client.
import type { ServiceSlug } from './site';

export interface Photo {
  fichier: string; // nom du fichier dans src/assets/realisations/
  alt: string;
  legende: string;
  etape?: string; // pour un chantier photographié dans l'ordre des travaux
  une?: boolean; // la photo qui représente le chantier
}

export interface Etape {
  titre: string;
  texte: string;
  fichier: string;
}

export interface Realisation {
  slug: string;
  services: ServiceSlug[]; // les pages service où le chantier apparaît
  titre: string;
  texte: string;
  commune?: string;
  annee?: number;
  photos: Photo[];
  recit?: Etape[]; // le chantier raconté en étapes sur l'accueil (un seul chantier)
}

export interface Avis {
  service?: ServiceSlug;
  texte: string;
  auteur: string;
  commune?: string;
  source: string; // Google, par exemple
  date: string;
}

// L'ordre suit les priorités de l'entreprise : placo et isolation d'abord.
export const REALISATIONS: Realisation[] = [
  {
    slug: 'doublage-maison-en-pierre',
    services: ['plaquisterie', 'isolation-interieure', 'renovation-interieure'],
    titre: 'Doublage isolé et plafond en placo dans une maison en pierre',
    texte: 'Les murs en pierre sont doublés sur une ossature métallique, avec un isolant en laine minérale, et le plafond est refait en plaques de plâtre. Les photos suivent le chantier dans l\'ordre : l\'ossature, les plaques, puis les bandes.',
    annee: 2026,
    recit: [
      { titre: 'L\'ossature et l\'isolant', texte: 'Je monte une ossature métallique devant le mur en pierre, puis je pose l\'isolant.', fichier: 'doublage-pierre-ossature.jpg' },
      { titre: 'Les plaques', texte: 'Je visse les plaques de plâtre sur l\'ossature, aux murs comme au plafond.', fichier: 'doublage-pierre-plaques.jpg' },
      { titre: 'Les bandes', texte: 'J\'enduis les joints et les têtes de vis. Après ponçage, les murs sont prêts à peindre.', fichier: 'doublage-pierre-bandes.jpg' },
    ],
    photos: [
      { fichier: 'doublage-pierre-ossature.jpg', etape: 'Ossature et isolant', alt: 'Ossature métallique montée devant un mur en pierre, avec de la laine minérale posée à droite', legende: 'L\'ossature métallique est montée devant le mur en pierre. L\'isolant commence à droite.' },
      { fichier: 'doublage-pierre-ossature-detail.jpg', etape: 'Ossature et isolant', alt: 'Montants métalliques alignés le long d\'un mur en pierre, sous un plafond en plaques de plâtre', legende: 'Les montants sont alignés le long du mur, sous le plafond déjà plaqué.' },
      { fichier: 'doublage-pierre-plaques.jpg', etape: 'Plaques', alt: 'Pièce dont les murs sont couverts de plaques de plâtre vissées, avant les bandes', legende: 'Les plaques sont vissées sur l\'ossature.' },
      { fichier: 'doublage-pierre-plaques-plafond.jpg', etape: 'Plaques', alt: 'Murs et plafond en plaques de plâtre, avec les gaines électriques qui ressortent du plafond', legende: 'Murs et plafond sont plaqués. Les gaines de l\'électricien ressortent aux emplacements prévus.' },
      { fichier: 'doublage-pierre-bandes.jpg', etape: 'Bandes', une: true, alt: 'Grande pièce doublée en placo, joints et têtes de vis enduits, porte-fenêtre au fond', legende: 'Les joints et les têtes de vis sont enduits : il reste à poncer avant de peindre.' },
      { fichier: 'doublage-pierre-bandes-angle.jpg', etape: 'Bandes', alt: 'Angle d\'une pièce doublée en placo, bandes de joint faites aux murs et au plafond', legende: 'Les angles et le plafond reçoivent les mêmes bandes.' },
      { fichier: 'doublage-pierre-bandes-baie.jpg', etape: 'Bandes', alt: 'Mur doublé en placo autour d\'une porte-fenêtre, bandes de joint apparentes', legende: 'Le doublage rejoint la porte-fenêtre.' },
    ],
  },
  {
    slug: 'piece-d-eau-plaques-hydrofuges',
    services: ['plaquisterie', 'isolation-interieure'],
    titre: 'Doublage isolé d\'une pièce d\'eau en plaques hydrofuges',
    texte: 'Dans une pièce d\'eau, la laine de verre est posée entre les montants, puis recouverte de plaques hydrofuges : les plaques vertes, prévues pour les pièces humides. Les arrivées d\'eau du plombier traversent le doublage.',
    annee: 2025,
    photos: [
      { fichier: 'piece-eau-isolant-plaques.jpg', une: true, alt: 'Laine de verre posée entre des montants métalliques, à côté d\'un mur couvert de plaques hydrofuges vertes', legende: 'À gauche, la laine de verre entre les montants. Au fond, les plaques hydrofuges déjà posées.' },
      { fichier: 'piece-eau-plaques-fenetre.jpg', alt: 'Deux murs couverts de plaques hydrofuges vertes autour d\'une petite fenêtre, arrivées d\'eau en attente', legende: 'Les plaques sont découpées autour de la fenêtre et des arrivées d\'eau.' },
      { fichier: 'piece-eau-plaques-detail.jpg', alt: 'Mur en plaques hydrofuges vertes d\'où ressortent deux gaines électriques', legende: 'Les gaines électriques ressortent des plaques, en attente de l\'électricien.' },
    ],
  },
  {
    slug: 'plafond-placo-spots',
    services: ['plaquisterie'],
    titre: 'Plafond en placo avec spots encastrés',
    texte: 'Un plafond refait en plaques de plâtre, avec les découpes pour les spots encastrés. Les bandes et les têtes de vis sont enduites avant le ponçage et la peinture.',
    annee: 2024,
    photos: [
      { fichier: 'plafond-placo-spots.jpg', une: true, alt: 'Plafond en plaques de plâtre aux joints enduits, avec quatre spots encastrés, près d\'un escalier en bois', legende: 'Les joints sont enduits, les spots sont en place.' },
      { fichier: 'plafond-placo-retombee.jpg', alt: 'Angle d\'un plafond en plaques de plâtre, avec un coffrage le long du mur', legende: 'Le plafond se termine par un coffrage le long du mur.' },
    ],
  },
  {
    slug: 'doublage-autour-d-une-baie',
    services: ['plaquisterie', 'menuiserie'],
    titre: 'Baie coulissante posée et doublée en placo',
    texte: 'La baie coulissante est posée, puis le doublage en plaques de plâtre habille le mur sous la fenêtre et les côtés de l\'ouverture.',
    annee: 2020,
    photos: [
      { fichier: 'doublage-baie-coulissante.jpg', une: true, alt: 'Doublage en plaques de plâtre sous une baie coulissante gris anthracite et autour d\'elle, bandes en cours', legende: 'Le doublage suit l\'ouverture jusqu\'à l\'appui de fenêtre. Les bandes sont en cours.' },
    ],
  },
  {
    slug: 'porte-d-entree-et-baie-coulissante',
    services: ['menuiserie'],
    titre: 'Porte d\'entrée et baie coulissante gris anthracite',
    texte: 'Deux menuiseries extérieures de la même teinte dans une maison : une porte d\'entrée à vitrage en demi-lune et une baie coulissante à deux vantaux. Le sol et la cuisine de la pièce ont été posés sur le même chantier.',
    photos: [
      { fichier: 'porte-entree-anthracite.jpg', une: true, alt: 'Porte d\'entrée gris anthracite à vitrage en demi-lune, vue de l\'intérieur', legende: 'La porte d\'entrée, vue de l\'intérieur.' },
      { fichier: 'baie-coulissante-anthracite.jpg', alt: 'Baie coulissante gris anthracite à deux vantaux, vue de l\'extérieur le soir', legende: 'La baie coulissante, vue de l\'extérieur.' },
    ],
  },
  {
    slug: 'cuisine-avec-ilot',
    services: ['pose-cuisine'],
    titre: 'Pose d\'une cuisine avec îlot central',
    texte: 'Une cuisine posée meuble par meuble : les caissons, les tiroirs et les façades le long des murs, et un îlot central.',
    annee: 2020,
    photos: [
      { fichier: 'cuisine-pose-en-cours.jpg', alt: 'Meubles bas de cuisine en cours de pose, caissons ouverts sous le plan de travail', legende: 'En cours de pose : les caissons attendent leurs tiroirs et leurs façades.' },
      { fichier: 'cuisine-ilot-posee.jpg', une: true, alt: 'Cuisine terminée, meubles blancs le long des murs et îlot central à façades grises', legende: 'La cuisine terminée, avec son îlot central.' },
    ],
  },
  {
    slug: 'couverture-maison-neuve',
    services: ['couverture', 'charpente'],
    titre: 'Charpente et couverture en tuiles d\'une maison neuve',
    texte: 'Sur une maison neuve en briques : la charpente, puis la couverture en tuiles, avec ses tuiles de ventilation et sa sortie de toit.',
    commune: 'Étaules (Charente-Maritime)',
    annee: 2018,
    photos: [
      { fichier: 'couverture-maison-neuve-etaules.jpg', une: true, alt: 'Maison neuve en briques couverte de tuiles neuves, avec une sortie de toit blanche', legende: 'La toiture terminée, avant les enduits de façade.' },
    ],
  },
];

export const AVIS: Avis[] = [];
