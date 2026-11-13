// Moteur des maquettes 3D : un dessin au trait en volume, que l'on tourne et que l'on éclate.
// Chaque pièce est un volume plein de la couleur du fond, bordé de ses arêtes : les faces cachent
// ce qui est derrière, comme sur une perspective de plan. Le rendu se fait à la demande.
import {
  BoxGeometry, Box3, BufferGeometry, Color, CylinderGeometry, EdgesGeometry, Euler, ExtrudeGeometry, Group, Mesh,
  MeshBasicMaterial, OrthographicCamera, Raycaster, Scene, Shape, Vector2, Vector3, WebGLRenderer,
} from 'three';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';
import { LineSegments2 } from 'three/examples/jsm/lines/LineSegments2.js';
import { LineSegmentsGeometry } from 'three/examples/jsm/lines/LineSegmentsGeometry.js';
import type { Maquette, Piece } from '../data/maquettes';

interface Noeud { groupe: Group; base: Vector3; e: Vector3; c: number; plein?: Mesh }
interface Matieres { plein: MeshBasicMaterial; trait: LineMaterial }

const borne = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));

function geometrie(p: Piece): BufferGeometry | undefined {
  if (p.t === 'boite' && p.s) return new BoxGeometry(p.s[0], p.s[1], p.s[2]);
  if (p.t === 'cylindre' && p.s) return new CylinderGeometry(p.s[0], p.s[0], p.s[1], 20);
  if (p.t === 'prisme' && p.s && p.pts) {
    const forme = new Shape();
    for (let i = 0; i < p.pts.length; i += 2) (i ? forme.lineTo : forme.moveTo).call(forme, p.pts[i], p.pts[i + 1]);
    forme.closePath();
    const g = new ExtrudeGeometry(forme, { depth: p.s[2], bevelEnabled: false, curveSegments: 1 });
    g.translate(0, 0, -p.s[2] / 2);
    return g;
  }
  return undefined;
}

export class Vue3D {
  // L'état, que l'on modifie avant d'appeler rendre().
  eclats: number[];
  opacites: number[];
  actif: number | null = null;
  marge = 1.14; // air autour du dessin
  az: number;
  el: number;

  private renderer: WebGLRenderer;
  private scene = new Scene();
  private camera = new OrthographicCamera(-1, 1, 1, -1, 0.1, 100);
  private pivot = new Group();
  private modele = new Group();
  private noeuds: Noeud[] = [];
  private matieres: Matieres[] = [];
  private pleins: Mesh[] = [];
  private boites: [Box3, Box3];
  private ancres: { base: Vector3; e: Vector3 }[];
  private fond: Color;
  private encre: Color;
  private jaune: Color;
  private rayon = new Raycaster();
  private largeur = 1;
  private hauteur = 1;

  constructor(private canvas: HTMLCanvasElement, maquette: Maquette, private etiquettes: HTMLElement[] = []) {
    const style = getComputedStyle(canvas);
    const couleur = (nom: string, defaut: string) => new Color(style.getPropertyValue(nom).trim() || defaut);
    this.fond = couleur('--bg', '#1a1718');
    this.encre = couleur('--fg', '#f8f8f8');
    this.jaune = couleur('--yellow', '#e7cf25');

    this.renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true });
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    this.renderer.setClearColor(0x000000, 0);

    const n = maquette.couches.length;
    this.eclats = Array(n).fill(0);
    this.opacites = Array(n).fill(1);
    [this.az, this.el] = maquette.vue;

    for (let c = 0; c < n; c++) {
      this.matieres.push({
        plein: new MeshBasicMaterial({ color: this.fond, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1 }),
        trait: new LineMaterial({ color: this.encre, linewidth: 1.5 }),
      });
    }

    for (const p of maquette.pieces) {
      const groupe = new Group();
      if (p.r) groupe.rotation.set(p.r[0], p.r[1], p.r[2]);
      const m = this.matieres[p.c];
      let plein: Mesh | undefined;
      let positions: ArrayLike<number> | undefined;
      if (p.t === 'traits') {
        positions = p.pts;
      } else {
        const g = geometrie(p);
        if (!g) continue;
        plein = new Mesh(g, m.plein);
        plein.userData.c = p.c;
        groupe.add(plein);
        this.pleins.push(plein);
        positions = new EdgesGeometry(g, 24).attributes.position.array;
      }
      if (positions?.length) {
        const lignes = new LineSegments2(new LineSegmentsGeometry().setPositions(positions as number[]), m.trait);
        groupe.add(lignes);
      }
      const e = p.e ?? maquette.couches[p.c].e;
      this.noeuds.push({ groupe, base: new Vector3(...p.p), e: new Vector3(...e), c: p.c, plein });
      this.modele.add(groupe);
    }

    this.pivot.add(this.modele);
    this.scene.add(this.pivot);
    this.camera.position.set(0, 0, 40);

    // L'encombrement assemblé et éclaté, pour cadrer l'un comme l'autre.
    const mesure = (t: number) => {
      for (const nd of this.noeuds) nd.groupe.position.copy(nd.base).addScaledVector(nd.e, t);
      this.modele.updateMatrixWorld(true);
      return new Box3().setFromObject(this.modele);
    };
    this.boites = [mesure(1), mesure(0)].reverse() as [Box3, Box3];

    // Le point où s'accroche l'étiquette de chaque couche : le bord de ses pièces, du côté
    // qui reste dégagé quand la maquette s'éclate (le dessus, ou le flanc si elle s'ouvre en hauteur).
    this.ancres = maquette.couches.map((_, c) => {
      const pieces = this.noeuds.filter((nd) => nd.c === c);
      const boite = new Box3();
      const e = new Vector3();
      for (const nd of pieces) { boite.union(new Box3().setFromObject(nd.groupe)); e.add(nd.e); }
      e.multiplyScalar(1 / Math.max(1, pieces.length));
      const base = boite.getCenter(new Vector3());
      if (Math.abs(e.y) > Math.abs(e.x) + Math.abs(e.z)) base.x = boite.min.x;
      else base.y = boite.max.y;
      return { base, e };
    });

    this.taille();
  }

  // À appeler quand la taille du canvas change.
  taille() {
    const w = this.canvas.clientWidth || 1;
    const h = this.canvas.clientHeight || 1;
    this.largeur = w;
    this.hauteur = h;
    this.renderer.setSize(w, h, false);
  }

  // Tous les calques au même écartement.
  eclater(t: number) { this.eclats.fill(t); }

  rendre() {
    const { eclats, opacites, actif } = this;
    for (const nd of this.noeuds) {
      nd.groupe.position.copy(nd.base).addScaledVector(nd.e, eclats[nd.c]);
      nd.groupe.visible = opacites[nd.c] > 0.01;
    }
    this.matieres.forEach((m, c) => {
      const estActif = actif === c;
      const retrait = actif !== null && !estActif;
      const o = opacites[c];
      m.trait.color.copy(estActif ? this.jaune : this.encre);
      m.trait.linewidth = estActif ? 2.4 : 1.5;
      m.trait.opacity = o * (retrait ? 0.32 : 1);
      m.plein.color.copy(this.fond);
      if (estActif) m.plein.color.lerp(this.jaune, 0.2);
      m.plein.opacity = o;
      const voile = m.trait.opacity < 0.999;
      if (m.trait.transparent !== voile) { m.trait.transparent = voile; m.trait.needsUpdate = true; }
      if (m.plein.transparent !== o < 0.999) { m.plein.transparent = o < 0.999; m.plein.needsUpdate = true; }
    });

    // Le cadrage suit l'écartement moyen : serré quand tout est assemblé. Il se règle sur
    // l'encombrement réellement vu sous cet angle, pour que le dessin remplisse son cadre.
    const m = borne(eclats.reduce((s, v) => s + v, 0) / eclats.length / 0.8);
    const [b0, b1] = this.boites;
    const min = b0.min.clone().lerp(b1.min, m);
    const max = b0.max.clone().lerp(b1.max, m);
    const centre = min.clone().add(max).multiplyScalar(0.5);
    this.modele.position.copy(centre).multiplyScalar(-1);
    this.pivot.rotation.set(this.el, this.az, 0);
    const angle = new Euler(this.el, this.az, 0);
    const coin = new Vector3();
    let ex = 0;
    let ey = 0;
    for (let i = 0; i < 8; i++) {
      coin.set(i & 1 ? max.x : min.x, i & 2 ? max.y : min.y, i & 4 ? max.z : min.z).sub(centre).applyEuler(angle);
      ex = Math.max(ex, Math.abs(coin.x));
      ey = Math.max(ey, Math.abs(coin.y));
    }
    const ratio = this.largeur / this.hauteur;
    const dy = Math.max(ey, ex / ratio) * this.marge;
    const dx = dy * ratio;
    this.camera.left = -dx; this.camera.right = dx; this.camera.top = dy; this.camera.bottom = -dy;
    this.camera.updateProjectionMatrix();

    this.renderer.render(this.scene, this.camera);
    this.placerEtiquettes();
  }

  private placerEtiquettes() {
    if (!this.etiquettes.length) return;
    const v = new Vector3();
    this.etiquettes.forEach((el, c) => {
      const ancre = this.ancres[c];
      if (!ancre) return;
      v.copy(ancre.base).addScaledVector(ancre.e, this.eclats[c]);
      this.modele.localToWorld(v).project(this.camera);
      el.style.translate = `${((v.x + 1) / 2) * this.largeur}px ${((1 - v.y) / 2) * this.hauteur}px`;
      el.style.opacity = String(this.opacites[c]);
      el.classList.toggle('is-active', this.actif === c);
    });
  }

  // La couche sous le pointeur, ou null. x et y en pixels dans le canvas.
  viser(x: number, y: number): number | null {
    const ndc = new Vector2((x / this.largeur) * 2 - 1, 1 - (y / this.hauteur) * 2);
    this.rayon.setFromCamera(ndc, this.camera);
    const touche = this.rayon.intersectObjects(this.pleins, false).find((i) => i.object.parent?.visible);
    return touche ? (touche.object.userData.c as number) : null;
  }

  // Libère le contexte WebGL : le navigateur n'en accorde qu'un petit nombre par page.
  detruire() {
    this.scene.traverse((o) => {
      const g = (o as Mesh).geometry;
      if (g) g.dispose();
    });
    for (const m of this.matieres) { m.plein.dispose(); m.trait.dispose(); }
    this.renderer.dispose();
    this.renderer.forceContextLoss();
  }
}
