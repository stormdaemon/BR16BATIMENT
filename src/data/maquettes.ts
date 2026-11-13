// Les maquettes 3D de la page Réalisations : un schéma de principe par chantier, en mètres.
// Ce ne sont pas les plans des maisons : chaque maquette montre comment l'ouvrage est fait,
// couche par couche. Le moteur de rendu est dans src/scripts/maquette.ts.
//
// Repère : x vers la droite, y vers le haut, z vers celui qui regarde.

export type Vec = [number, number, number];

export interface Piece {
  t: 'boite' | 'cylindre' | 'prisme' | 'traits';
  c: number; // numéro de la couche
  p: Vec; // centre
  s?: Vec; // boîte : dimensions ; cylindre : rayon, hauteur ; prisme : -, -, épaisseur
  r?: Vec; // rotation, en radians
  e?: Vec; // déplacement en vue éclatée, si différent de celui de la couche
  pts?: number[]; // prisme : contour x, y ; traits : segments x, y, z
}

export interface Couche { nom: string; e: Vec }
export interface Maquette { couches: Couche[]; pieces: Piece[]; vue: [number, number] }

type Extra = Pick<Piece, 'r' | 'e'>;
const boite = (c: number, s: Vec, p: Vec, x: Extra = {}): Piece => ({ t: 'boite', c, s, p, ...x });
const cylindre = (c: number, rayon: number, hauteur: number, p: Vec, x: Extra = {}): Piece => ({ t: 'cylindre', c, s: [rayon, hauteur, 0], p, ...x });
const prisme = (c: number, pts: number[], epaisseur: number, p: Vec, x: Extra = {}): Piece => ({ t: 'prisme', c, s: [0, 0, epaisseur], pts, p, ...x });
const traits = (c: number, pts: number[], p: Vec = [0, 0, 0], x: Extra = {}): Piece => ({ t: 'traits', c, pts, p, ...x });

// Un hasard reproductible : le dessin est le même à chaque génération.
const hasard = (graine: number) => () => (graine = (graine * 16807) % 2147483647) / 2147483647;

// Les joints d'un mur en moellons, dans le plan x-y.
function moellons(largeur: number, hauteur: number, graine = 7): number[] {
  const rnd = hasard(graine);
  const pts: number[] = [];
  const assises: number[] = [0];
  while (assises[assises.length - 1] < hauteur - 0.4) assises.push(assises[assises.length - 1] + 0.24 + rnd() * 0.14);
  assises.push(hauteur);
  for (let i = 1; i < assises.length - 1; i++) {
    let x = -largeur / 2;
    let y = assises[i];
    while (x < largeur / 2) {
      const nx = Math.min(largeur / 2, x + 0.3 + rnd() * 0.3);
      const ny = assises[i] + (rnd() - 0.5) * 0.05;
      pts.push(x, y, 0, nx, ny, 0);
      x = nx;
      y = ny;
    }
  }
  for (let i = 0; i < assises.length - 1; i++) {
    for (let x = -largeur / 2 + 0.2 + rnd() * 0.3; x < largeur / 2 - 0.1; x += 0.32 + rnd() * 0.34) {
      pts.push(x, assises[i], 0, x + (rnd() - 0.5) * 0.06, assises[i + 1], 0);
    }
  }
  return pts;
}

// Le symbole de l'isolant souple : un zigzag entre deux montants, dans le plan a-b.
function laine(a0: number, a1: number, b0: number, b1: number, pas = 0.13): [number, number][] {
  const pts: [number, number][] = [];
  let gauche = true;
  for (let b = b0; b <= b1 + 1e-6; b += pas) {
    pts.push([gauche ? a0 : a1, b]);
    gauche = !gauche;
  }
  return pts;
}
const segments = (pts: [number, number][], versVec: (a: number, b: number) => Vec): number[] =>
  pts.slice(1).flatMap((p, i) => [...versVec(pts[i][0], pts[i][1]), ...versVec(p[0], p[1])]);

// Une grille de traits dans un rectangle, dans le plan a-b.
function grille(a0: number, a1: number, b0: number, b1: number, pasA: number, pasB: number, versVec: (a: number, b: number) => Vec): number[] {
  const pts: number[] = [];
  if (pasA > 0) for (let a = a0 + pasA; a < a1 - 1e-6; a += pasA) pts.push(...versVec(a, b0), ...versVec(a, b1));
  if (pasB > 0) for (let b = b0 + pasB; b < b1 - 1e-6; b += pasB) pts.push(...versVec(a0, b), ...versVec(a1, b));
  return pts;
}

// 01. Doublage isolé sur un mur en pierre.
function doublagePierre(): Maquette {
  const L = 3;
  const H = 2.5;
  const montants = [-1.48, -0.9, -0.3, 0.3, 0.9, 1.48];
  const P: Piece[] = [
    boite(0, [L, H, 0.45], [0, H / 2, -0.225]),
    traits(0, moellons(L, H), [0, 0, 0.003]),
    boite(1, [L, 0.03, 0.048], [0, 0.015, 0.034]),
    boite(1, [L, 0.03, 0.048], [0, H - 0.015, 0.034]),
    ...montants.map((x) => boite(1, [0.036, H - 0.06, 0.046], [x, H / 2, 0.034])),
  ];
  montants.slice(0, -1).forEach((x, i) => {
    const a0 = x + 0.03;
    const a1 = montants[i + 1] - 0.03;
    P.push(boite(2, [a1 - a0, H - 0.08, 0.04], [(a0 + a1) / 2, H / 2, 0.034]));
    P.push(traits(2, segments(laine(a0 + 0.04, a1 - 0.04, 0.12, H - 0.12), (a, b) => [a, b, 0.056])));
  });
  P.push(boite(3, [1.2, H, 0.013], [-0.9, H / 2, 0.066]), boite(3, [1.2, H, 0.013], [0.3, H / 2, 0.066]), boite(3, [0.6, H, 0.013], [1.2, H / 2, 0.066]));
  P.push(boite(4, [0.08, H, 0.004], [-0.3, H / 2, 0.076]), boite(4, [0.08, H, 0.004], [0.9, H / 2, 0.076]));
  for (const x of [-1.46, -0.9, 0.3, 1.46]) for (const y of [0.35, 0.95, 1.55, 2.15]) P.push(boite(4, [0.07, 0.07, 0.004], [x, y, 0.076]));
  return {
    vue: [0.72, 0.3],
    couches: [
      { nom: 'Mur en pierre', e: [0, 0, 0] },
      { nom: 'Ossature métallique', e: [0, 0, 0.55] },
      { nom: 'Laine minérale', e: [0, 0, 1.05] },
      { nom: 'Plaques de plâtre', e: [0, 0, 1.6] },
      { nom: 'Bandes et enduit', e: [0, 0, 2.1] },
    ],
    pieces: P,
  };
}

// 02. Pièce d'eau : deux murs en angle, plaques hydrofuges.
function pieceEau(): Maquette {
  const L = 2.2;
  const D = 1.8;
  const H = 2.4;
  const fond: Vec = [0, 0, 1];
  const cote: Vec = [1, 0, 0];
  const fois = (v: Vec, k: number): Vec => [v[0] * k, v[1] * k, v[2] * k];
  const mx = [0.1, 0.62, 1.14, 1.66, 2.17];
  const mz = [0.16, 0.7, 1.24, 1.77];
  const P: Piece[] = [
    boite(0, [L + 0.2, H, 0.2], [L / 2 - 0.1, H / 2, -0.1]),
    boite(0, [0.2, H, D], [-0.1, H / 2, D / 2]),
    boite(0, [L, 0.04, D], [L / 2, -0.02, D / 2]),
    traits(0, grille(0, D, 0, L, 0.15, 0, (a, b) => [b, 0.002, a])),
    // Ossature
    boite(1, [L - 0.08, 0.03, 0.048], [L / 2 + 0.04, 0.015, 0.034], { e: fois(fond, 0.34) }),
    boite(1, [L - 0.08, 0.03, 0.048], [L / 2 + 0.04, H - 0.015, 0.034], { e: fois(fond, 0.34) }),
    ...mx.map((x) => boite(1, [0.036, H - 0.06, 0.046], [x, H / 2, 0.034], { e: fois(fond, 0.34) })),
    boite(1, [0.048, 0.03, D - 0.1], [0.034, 0.015, D / 2 + 0.05], { e: fois(cote, 0.34) }),
    boite(1, [0.048, 0.03, D - 0.1], [0.034, H - 0.015, D / 2 + 0.05], { e: fois(cote, 0.34) }),
    ...mz.map((z) => boite(1, [0.046, H - 0.06, 0.036], [0.034, H / 2, z], { e: fois(cote, 0.34) })),
  ];
  mx.slice(0, -1).forEach((x, i) => {
    const a0 = x + 0.03;
    const a1 = mx[i + 1] - 0.03;
    P.push(boite(2, [a1 - a0, H - 0.08, 0.04], [(a0 + a1) / 2, H / 2, 0.034], { e: fois(fond, 0.64) }));
    P.push(traits(2, segments(laine(a0 + 0.04, a1 - 0.04, 0.12, H - 0.12), (a, b) => [a, b, 0.056]), [0, 0, 0], { e: fois(fond, 0.64) }));
  });
  mz.slice(0, -1).forEach((z, i) => {
    const a0 = z + 0.03;
    const a1 = mz[i + 1] - 0.03;
    P.push(boite(2, [0.04, H - 0.08, a1 - a0], [0.034, H / 2, (a0 + a1) / 2], { e: fois(cote, 0.64) }));
    P.push(traits(2, segments(laine(a0 + 0.04, a1 - 0.04, 0.12, H - 0.12), (a, b) => [0.056, b, a]), [0, 0, 0], { e: fois(cote, 0.64) }));
  });
  P.push(
    boite(3, [1.2, H, 0.013], [0.68, H / 2, 0.066], { e: fois(fond, 0.96) }),
    boite(3, [L - 1.28, H, 0.013], [1.28 + (L - 1.28) / 2, H / 2, 0.066], { e: fois(fond, 0.96) }),
    boite(3, [0.013, H, 1.2], [0.066, H / 2, 0.68], { e: fois(cote, 0.96) }),
    boite(3, [0.013, H, D - 1.28], [0.066, H / 2, 1.28 + (D - 1.28) / 2], { e: fois(cote, 0.96) }),
    cylindre(4, 0.014, 0.3, [1.0, 0.42, 0.16], { r: [Math.PI / 2, 0, 0] }),
    cylindre(4, 0.014, 0.3, [1.1, 0.42, 0.16], { r: [Math.PI / 2, 0, 0] }),
  );
  return {
    vue: [-0.82, 0.5],
    couches: [
      { nom: 'Murs et plancher', e: [0, 0, 0] },
      { nom: 'Ossature métallique', e: [0, 0, 0.5] },
      { nom: 'Laine de verre', e: [0, 0, 0.95] },
      { nom: 'Plaques hydrofuges', e: [0, 0, 1.45] },
      { nom: 'Arrivées d\'eau du plombier', e: [0, 0, 1.3] },
    ],
    pieces: P,
  };
}

// 03. Plafond en placo, vu par en dessous.
function plafond(): Maquette {
  const L = 3;
  const D = 2.4;
  const P: Piece[] = [boite(0, [L, 0.03, D], [0, 0.255, 0])];
  for (let x = -1.4; x <= 1.41; x += 0.56) P.push(boite(0, [0.07, 0.2, D], [x, 0.14, 0]));
  for (const z of [-1.05, -0.525, 0, 0.525, 1.05]) {
    P.push(boite(1, [L, 0.018, 0.047], [0, 0, z]));
    for (const x of [-1.4, -0.28, 0.84]) P.push(boite(1, [0.03, 0.05, 0.03], [x, 0.034, z]));
  }
  P.push(boite(2, [1.2, 0.013, D], [-0.9, -0.017, 0]), boite(2, [1.2, 0.013, D], [0.3, -0.017, 0]), boite(2, [0.6, 0.013, D], [1.2, -0.017, 0]));
  P.push(boite(3, [0.08, 0.004, D], [-0.3, -0.027, 0]), boite(3, [0.08, 0.004, D], [0.9, -0.027, 0]));
  for (const x of [-1.2, -0.75, 0.15, 0.6, 1.3]) for (const z of [-1.05, -0.525, 0, 0.525, 1.05]) P.push(boite(3, [0.07, 0.004, 0.07], [x, -0.027, z]));
  for (const x of [-0.75, 0.6]) for (const z of [-0.6, 0.6]) P.push(cylindre(4, 0.055, 0.035, [x, -0.035, z]));
  return {
    vue: [0.62, -0.42],
    couches: [
      { nom: 'Solives et plancher', e: [0, 0, 0] },
      { nom: 'Suspentes et fourrures', e: [0, -0.5, 0] },
      { nom: 'Plaques de plâtre', e: [0, -1.0, 0] },
      { nom: 'Bandes et enduit', e: [0, -1.45, 0] },
      { nom: 'Spots encastrés', e: [0, -1.9, 0] },
    ],
    pieces: P,
  };
}

// 04. Doublage autour d'une baie coulissante.
function doublageBaie(): Maquette {
  const L = 3;
  const H = 2.5;
  const x0 = -0.8;
  const x1 = 0.8;
  const y0 = 0.9;
  const y1 = 2.1;
  const P: Piece[] = [
    boite(0, [1.5 + x0, H, 0.3], [(-1.5 + x0) / 2, H / 2, -0.15]),
    boite(0, [1.5 - x1, H, 0.3], [(1.5 + x1) / 2, H / 2, -0.15]),
    boite(0, [x1 - x0, y0, 0.3], [0, y0 / 2, -0.15]),
    boite(0, [x1 - x0, H - y1, 0.3], [0, (H + y1) / 2, -0.15]),
    // La baie, côté extérieur.
    boite(1, [x1 - x0, 0.05, 0.07], [0, y0 + 0.025, -0.24]),
    boite(1, [x1 - x0, 0.05, 0.07], [0, y1 - 0.025, -0.24]),
    boite(1, [0.05, y1 - y0 - 0.1, 0.07], [x0 + 0.025, (y0 + y1) / 2, -0.24]),
    boite(1, [0.05, y1 - y0 - 0.1, 0.07], [x1 - 0.025, (y0 + y1) / 2, -0.24]),
    boite(1, [0.05, y1 - y0 - 0.1, 0.05], [0, (y0 + y1) / 2, -0.24]),
    boite(1, [0.7, y1 - y0 - 0.1, 0.012], [-0.375, (y0 + y1) / 2, -0.24]),
    boite(1, [0.7, y1 - y0 - 0.1, 0.012], [0.375, (y0 + y1) / 2, -0.24]),
    // Ossature.
    boite(2, [L, 0.03, 0.048], [0, 0.015, 0.034]),
    boite(2, [L, 0.03, 0.048], [0, H - 0.015, 0.034]),
    ...[-1.48, x0 - 0.02, x1 + 0.02, 1.48].map((x) => boite(2, [0.036, H - 0.06, 0.046], [x, H / 2, 0.034])),
    boite(2, [x1 - x0, 0.03, 0.048], [0, y0 - 0.015, 0.034]),
    boite(2, [x1 - x0, 0.03, 0.048], [0, y1 + 0.015, 0.034]),
    ...[-0.27, 0.27].flatMap((x) => [boite(2, [0.036, y0 - 0.06, 0.046], [x, y0 / 2, 0.034]), boite(2, [0.036, H - y1 - 0.06, 0.046], [x, (H + y1) / 2, 0.034])]),
  ];
  for (const [a0, a1, b0, b1] of [[-1.44, x0 - 0.06, 0.06, H - 0.06], [x1 + 0.06, 1.44, 0.06, H - 0.06], [x0, x1, 0.06, y0 - 0.05]]) {
    P.push(boite(3, [a1 - a0, b1 - b0, 0.04], [(a0 + a1) / 2, (b0 + b1) / 2, 0.034]));
    P.push(traits(3, segments(laine(a0 + 0.05, a1 - 0.05, b0 + 0.06, b1 - 0.06), (a, b) => [a, b, 0.056])));
  }
  P.push(
    boite(4, [1.5 + x0, H, 0.013], [(-1.5 + x0) / 2, H / 2, 0.066]),
    boite(4, [1.5 - x1, H, 0.013], [(1.5 + x1) / 2, H / 2, 0.066]),
    boite(4, [x1 - x0, y0, 0.013], [0, y0 / 2, 0.066]),
    boite(4, [x1 - x0, H - y1, 0.013], [0, (H + y1) / 2, 0.066]),
    // Les retours dans l'ouverture et l'appui de fenêtre.
    boite(4, [0.013, y1 - y0, 0.26], [x0 + 0.007, (y0 + y1) / 2, -0.07]),
    boite(4, [0.013, y1 - y0, 0.26], [x1 - 0.007, (y0 + y1) / 2, -0.07]),
    boite(4, [x1 - x0 - 0.03, 0.02, 0.28], [0, y0 + 0.01, -0.06]),
    boite(5, [0.08, y1 - y0, 0.004], [x0, (y0 + y1) / 2, 0.076]),
    boite(5, [0.08, y1 - y0, 0.004], [x1, (y0 + y1) / 2, 0.076]),
    boite(5, [x1 - x0 + 0.08, 0.08, 0.004], [0, y0, 0.076]),
    boite(5, [x1 - x0 + 0.08, 0.08, 0.004], [0, y1, 0.076]),
  );
  return {
    vue: [0.7, 0.28],
    couches: [
      { nom: 'Mur existant', e: [0, 0, 0] },
      { nom: 'Baie coulissante', e: [0, 0, -0.7] },
      { nom: 'Ossature métallique', e: [0, 0, 0.5] },
      { nom: 'Laine minérale', e: [0, 0, 0.95] },
      { nom: 'Plaques de plâtre', e: [0, 0, 1.45] },
      { nom: 'Bandes et enduit', e: [0, 0, 1.9] },
    ],
    pieces: P,
  };
}

// 05. Porte d'entrée et baie coulissante.
function menuiseries(): Maquette {
  const H = 2.5;
  const hb = 2.15;
  const px0 = -1.9;
  const px1 = -0.95;
  const bx0 = 0;
  const bx1 = 1.9;
  const lune: number[] = [0, -0.72];
  for (let i = 0; i <= 14; i++) {
    const a = -Math.PI / 2 + (i / 14) * Math.PI;
    lune.push(Math.cos(a) * 0.3, Math.sin(a) * 0.72);
  }
  const vantail = (c: number, x0: number, x1: number, z: number, e: Vec): Piece[] => {
    const w = x1 - x0;
    const cx = (x0 + x1) / 2;
    return [
      boite(c, [w, 0.06, 0.035], [cx, 0.07, z], { e }),
      boite(c, [w, 0.06, 0.035], [cx, hb - 0.07, z], { e }),
      boite(c, [0.06, hb - 0.2, 0.035], [x0 + 0.03, hb / 2, z], { e }),
      boite(c, [0.06, hb - 0.2, 0.035], [x1 - 0.03, hb / 2, z], { e }),
      boite(c, [w - 0.12, hb - 0.2, 0.01], [cx, hb / 2, z], { e }),
    ];
  };
  const P: Piece[] = [
    boite(0, [0.5, hb, 0.3], [-2.15, hb / 2, -0.15]),
    boite(0, [bx0 - px1, hb, 0.3], [(px1 + bx0) / 2, hb / 2, -0.15]),
    boite(0, [0.5, hb, 0.3], [2.15, hb / 2, -0.15]),
    boite(0, [4.8, H - hb, 0.3], [0, (H + hb) / 2, -0.15]),
    // Dormants.
    boite(1, [0.06, hb, 0.09], [px0 + 0.03, hb / 2, -0.08]),
    boite(1, [0.06, hb, 0.09], [px1 - 0.03, hb / 2, -0.08]),
    boite(1, [px1 - px0 - 0.12, 0.06, 0.09], [(px0 + px1) / 2, hb - 0.03, -0.08]),
    boite(1, [px1 - px0 - 0.12, 0.03, 0.11], [(px0 + px1) / 2, 0.015, -0.08]),
    boite(1, [0.05, hb, 0.1], [bx0 + 0.025, hb / 2, -0.08]),
    boite(1, [0.05, hb, 0.1], [bx1 - 0.025, hb / 2, -0.08]),
    boite(1, [bx1 - bx0 - 0.1, 0.04, 0.1], [(bx0 + bx1) / 2, hb - 0.02, -0.08]),
    boite(1, [bx1 - bx0 - 0.1, 0.04, 0.1], [(bx0 + bx1) / 2, 0.02, -0.08]),
    // Porte.
    boite(2, [px1 - px0 - 0.13, hb - 0.1, 0.06], [(px0 + px1) / 2, hb / 2 - 0.01, -0.08]),
    prisme(3, lune, 0.012, [(px0 + px1) / 2 - 0.14, 1.15, -0.044]),
    ...vantail(4, bx0 + 0.05, (bx0 + bx1) / 2 + 0.03, -0.1, [0, 0, 1.15]),
    ...vantail(4, (bx0 + bx1) / 2 - 0.03, bx1 - 0.05, -0.06, [0, 0, 1.55]),
    boite(5, [0.03, 0.16, 0.02], [px1 - 0.16, 1.05, -0.04]),
    boite(5, [0.12, 0.022, 0.03], [px1 - 0.21, 1.1, -0.02]),
    boite(5, [0.025, 0.2, 0.02], [(bx0 + bx1) / 2 + 0.01, 1.05, -0.035]),
  ];
  return {
    vue: [0.5, 0.26],
    couches: [
      { nom: 'Mur', e: [0, 0, 0] },
      { nom: 'Dormants', e: [0, 0, 0.5] },
      { nom: 'Porte d\'entrée', e: [0, 0, 1.0] },
      { nom: 'Vitrage en demi-lune', e: [0, 0, 1.45] },
      { nom: 'Vantaux coulissants', e: [0, 0, 1.15] },
      { nom: 'Poignées', e: [0, 0, 1.95] },
    ],
    pieces: P,
  };
}

// 06. Cuisine avec îlot central.
function cuisine(): Maquette {
  const bas = [-1.2, -0.6, 0, 0.6, 1.2];
  const tiroirs = new Set([-1.2, 0.6]);
  const P: Piece[] = [
    boite(0, [3.6, 2.4, 0.1], [0, 1.2, -0.05]),
    boite(0, [3.6, 0.04, 2.7], [0, -0.02, 1.35]),
    traits(0, grille(-1.8, 1.8, 0, 2.7, 0.45, 0.45, (a, b) => [a, 0.002, b])),
    ...bas.map((x) => boite(1, [0.6, 0.72, 0.56], [x, 0.46, 0.3])),
    ...[-1.2, -0.6, 1.2].map((x) => boite(1, [0.6, 0.7, 0.34], [x, 1.8, 0.17])),
    boite(2, [3.0, 0.1, 0.016], [0, 0.05, 0.54]),
  ];
  for (const x of bas) {
    if (tiroirs.has(x)) {
      for (const y of [0.22, 0.46, 0.7]) {
        P.push(boite(3, [0.5, 0.14, 0.46], [x, y, 0.32], { e: [0, 0, 0.5] }));
        P.push(boite(3, [0.596, 0.234, 0.018], [x, y, 0.59]));
      }
    } else {
      P.push(boite(3, [0.596, 0.716, 0.018], [x, 0.46, 0.59]));
    }
  }
  for (const x of [-1.2, -0.6, 1.2]) P.push(boite(3, [0.596, 0.696, 0.018], [x, 1.8, 0.35]));
  P.push(
    boite(4, [3.04, 0.04, 0.62], [0, 0.84, 0.31]),
    boite(5, [1.8, 0.82, 0.9], [0, 0.41, 1.75]),
    traits(5, grille(-0.9, 0.9, 0.1, 0.82, 0.45, 0, (a, b) => [a, b, 2.202]), [0, 0, 0]),
    boite(5, [1.95, 0.04, 1.05], [0, 0.84, 1.75], { e: [0, 0.55, 0.55] }),
  );
  return {
    vue: [0.62, 0.42],
    couches: [
      { nom: 'Mur et sol', e: [0, 0, 0] },
      { nom: 'Caissons', e: [0, 0, 0] },
      { nom: 'Plinthes', e: [0, 0, 0.45] },
      { nom: 'Tiroirs et façades', e: [0, 0, 0.9] },
      { nom: 'Plan de travail', e: [0, 0.55, 0] },
      { nom: 'Îlot central', e: [0, 0, 0.55] },
    ],
    pieces: P,
  };
}

// 07. Couverture en tuiles d'une maison neuve.
function couverture(): Maquette {
  const L = 4;
  const hm = 1.3; // hauteur des murs
  const demi = 1.5;
  const fleche = 0.85;
  const a = Math.atan2(fleche, demi);
  const debord = 0.22;
  const rampant = (demi + debord) / Math.cos(a);
  const faitage = hm + fleche;
  // Un point du versant, à la distance s du faîtage, décalé de n au-dessus.
  const surVersant = (cote: 1 | -1, s: number, n: number): Vec => [0, faitage - s * Math.sin(a) + n * Math.cos(a), cote * (s * Math.cos(a) + n * Math.sin(a))];
  const P: Piece[] = [
    boite(0, [L, hm, 0.2], [0, hm / 2, demi - 0.1]),
    boite(0, [L, hm, 0.2], [0, hm / 2, -demi + 0.1]),
    boite(0, [0.2, hm, demi * 2 - 0.4], [-L / 2 + 0.1, hm / 2, 0]),
    boite(0, [0.2, hm, demi * 2 - 0.4], [L / 2 - 0.1, hm / 2, 0]),
    prisme(0, [-demi, 0, demi, 0, 0, fleche], 0.2, [-L / 2 + 0.1, hm, 0], { r: [0, Math.PI / 2, 0] }),
    prisme(0, [-demi, 0, demi, 0, 0, fleche], 0.2, [L / 2 - 0.1, hm, 0], { r: [0, Math.PI / 2, 0] }),
    traits(0, grille(-L / 2, L / 2, 0, hm, 0, 0.2, (x, y) => [x, y, demi + 0.002])),
    boite(1, [L + 0.2, 0.14, 0.08], [0, faitage - 0.09, 0]),
  ];
  for (const cote of [1, -1] as const) {
    const r: Vec = [cote * a, 0, 0];
    for (let x = -L / 2 + 0.05; x <= L / 2 - 0.04; x += (L - 0.1) / 8) {
      const [, y, z] = surVersant(cote, rampant / 2, 0.04);
      P.push(boite(1, [0.06, 0.08, rampant], [x, y, z], { r }));
    }
    for (let s = 0.14; s < rampant; s += 0.3) {
      const [, y, z] = surVersant(cote, s, 0.095);
      P.push(boite(2, [L + 0.3, 0.025, 0.04], [0, y, z], { r }));
    }
    const [, ty, tz] = surVersant(cote, rampant / 2 + 0.02, 0.135);
    const eTuiles: Vec = [0, 1.55, cote * 0.3];
    P.push(boite(3, [L + 0.4, 0.045, rampant + 0.04], [0, ty, tz], { r, e: eTuiles }));
    P.push(traits(3, grille(-L / 2 - 0.2, L / 2 + 0.2, -rampant / 2, rampant / 2, 0.22, 0.33, (x, z) => [x, 0.025, z]), [0, ty, tz], { r, e: eTuiles }));
  }
  const [, cy, cz] = surVersant(1, 0.75, 0.3);
  P.push(
    cylindre(4, 0.1, L + 0.4, [0, faitage + 0.17, 0], { r: [0, 0, Math.PI / 2] }),
    boite(4, [0.32, 0.6, 0.32], [-1.1, cy, cz]),
    boite(4, [0.42, 0.05, 0.42], [-1.1, cy + 0.32, cz]),
    boite(4, [0.2, 0.06, 0.16], [0.4, surVersant(1, 0.6, 0.18)[1], surVersant(1, 0.6, 0.18)[2]], { r: [a, 0, 0] }),
    boite(4, [0.2, 0.06, 0.16], [1.1, surVersant(1, 0.6, 0.18)[1], surVersant(1, 0.6, 0.18)[2]], { r: [a, 0, 0] }),
  );
  return {
    vue: [0.68, 0.34],
    couches: [
      { nom: 'Murs en briques', e: [0, 0, 0] },
      { nom: 'Charpente', e: [0, 0.55, 0] },
      { nom: 'Liteaux', e: [0, 1.05, 0] },
      { nom: 'Tuiles', e: [0, 1.55, 0] },
      { nom: 'Faîtage, sortie de toit et tuiles de ventilation', e: [0, 2.1, 0] },
    ],
    pieces: P,
  };
}

// Une maquette par chantier : la clé est le slug du chantier dans src/data/preuves.ts.
export const MAQUETTES: Record<string, () => Maquette> = {
  'doublage-maison-en-pierre': doublagePierre,
  'piece-d-eau-plaques-hydrofuges': pieceEau,
  'plafond-placo-spots': plafond,
  'doublage-autour-d-une-baie': doublageBaie,
  'porte-d-entree-et-baie-coulissante': menuiseries,
  'cuisine-avec-ilot': cuisine,
  'couverture-maison-neuve': couverture,
};
