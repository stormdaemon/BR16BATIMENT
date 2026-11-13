// Mise en scène de la page Réalisations. Tout est en amélioration progressive :
// sans ce script, la page garde ses textes, ses photos et sa visionneuse.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MAQUETTES } from '../data/maquettes';
import { Vue3D } from './maquette';

const reduit = matchMedia('(prefers-reduced-motion: reduce)').matches;
const souris = matchMedia('(hover: hover) and (pointer: fine)').matches;
const borne = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
const adoucir = (t: number) => t * t * (3 - 2 * t);

gsap.registerPlugin(ScrollTrigger);

document.querySelectorAll<HTMLElement>('.maq').forEach(maquette);
if (!reduit) {
  recit();
  planche();
  numeros();
  if (souris) apercus();
}

// Un canvas neuf à chaque montage : un contexte WebGL libéré ne se récupère pas.
function toile(hote: Element) {
  const canvas = document.createElement('canvas');
  hote.replaceChildren(canvas);
  return canvas;
}

// La maquette d'un chantier : rotation au doigt, éclaté au bouton ou au curseur, survol des couches.
function maquette(hote: HTMLElement) {
  const fabrique = MAQUETTES[hote.dataset.maquette ?? ''];
  const zone = hote.querySelector('.maq__toile');
  if (!fabrique || !zone) return;
  const modele = fabrique();
  const etiquettes = [...hote.querySelectorAll<HTMLElement>('.maq__numeros span')];
  const bouton = hote.querySelector<HTMLButtonElement>('.maq__eclater');
  const curseur = hote.querySelector<HTMLInputElement>('.maq__curseur');
  const legende = [...hote.querySelectorAll<HTMLButtonElement>('.maq__legende button')];

  let vue: Vue3D | undefined;
  let visible = false;
  let image = 0;
  let t = 0;
  let cible = 0;
  let [az, el] = modele.vue;
  let choisi: number | null = null;
  let survol: number | null = null;
  let touchee = false;
  let demo = false;
  const depart = performance.now();

  const viser = (v: number) => {
    cible = borne(v, 0, 1);
    bouton?.setAttribute('aria-pressed', String(cible > 0.5));
  };

  const boucle = (maintenant: number) => {
    image = 0;
    if (!vue || !visible) return;
    t += (cible - t) * 0.085;
    if (Math.abs(cible - t) < 0.0015) t = cible;
    vue.eclater(adoucir(t));
    vue.az = az + (touchee || reduit ? 0 : Math.sin((maintenant - depart) / 2600) * 0.16);
    vue.el = el;
    vue.actif = survol ?? choisi;
    vue.rendre();
    hote.classList.toggle('is-eclate', t > 0.3);
    if (curseur && document.activeElement !== curseur) curseur.value = String(Math.round(t * 100));
    legende.forEach((b, i) => b.classList.toggle('is-active', vue?.actif === i));
    image = requestAnimationFrame(boucle);
  };
  const lancer = () => { if (!image && visible) image = requestAnimationFrame(boucle); };

  const monter = () => {
    if (vue) return;
    const canvas = toile(zone);
    try {
      vue = new Vue3D(canvas, modele, etiquettes);
    } catch {
      hote.classList.add('is-ko');
      return;
    }
    let prise: { x: number; y: number } | undefined;
    canvas.addEventListener('pointerdown', (e) => { prise = { x: e.clientX, y: e.clientY }; canvas.setPointerCapture(e.pointerId); });
    canvas.addEventListener('pointermove', (e) => {
      if (prise) {
        az += (e.clientX - prise.x) * 0.008;
        if (e.pointerType !== 'touch') el = borne(el + (e.clientY - prise.y) * 0.006, -1.2, 1.2);
        prise = { x: e.clientX, y: e.clientY };
        if (!touchee) { touchee = true; hote.classList.add('is-touchee'); }
      } else if (e.pointerType === 'mouse') {
        const cadre = canvas.getBoundingClientRect();
        survol = vue?.viser(e.clientX - cadre.left, e.clientY - cadre.top) ?? null;
      }
    });
    const lacher = () => { prise = undefined; };
    canvas.addEventListener('pointerup', lacher);
    canvas.addEventListener('pointercancel', lacher);
    canvas.addEventListener('pointerleave', () => { survol = null; });
  };

  bouton?.addEventListener('click', () => viser(cible > 0.5 ? 0 : 1));
  curseur?.addEventListener('input', () => { viser(Number(curseur.value) / 100); t = cible; });
  legende.forEach((b, i) => {
    b.addEventListener('click', () => { choisi = choisi === i ? null : i; if (cible < 0.5) viser(1); });
    b.addEventListener('pointerenter', () => { survol = i; });
    b.addEventListener('pointerleave', () => { survol = null; });
  });
  new ResizeObserver(() => vue?.taille()).observe(zone);

  // Proche de l'écran : la maquette existe et s'anime. Loin : son contexte WebGL est rendu.
  new IntersectionObserver(([entree]) => {
    visible = entree.isIntersecting;
    if (visible) { monter(); lancer(); }
  }, { rootMargin: '20% 0px' }).observe(hote);
  new IntersectionObserver(([entree]) => {
    if (!entree.isIntersecting && vue) { vue.detruire(); vue = undefined; zone.replaceChildren(); }
  }, { rootMargin: '200% 0px' }).observe(hote);
  // La première fois qu'elle est bien en vue, elle s'éclate toute seule : on voit ce qu'elle sait faire.
  new IntersectionObserver(([entree], io) => {
    if (!entree.isIntersecting || demo) return;
    demo = true;
    io.disconnect();
    setTimeout(() => { if (!touchee && cible === 0) viser(1); }, reduit ? 0 : 500);
  }, { threshold: 0.6 }).observe(hote);
}

// Le premier chantier se monte au défilement : la maquette reçoit ses couches une à une,
// les photos du chantier se succèdent, puis tout se referme sur le mur fini.
function recit() {
  const section = document.querySelector<HTMLElement>('.recit');
  const pin = section?.querySelector<HTMLElement>('.recit__pin');
  const zone = section?.querySelector('.recit__toile');
  const fabrique = MAQUETTES[section?.dataset.maquette ?? ''];
  if (!section || !pin || !zone || !fabrique) return;

  const modele = fabrique();
  const noms = [...section.querySelectorAll<HTMLElement>('.recit__noms span')];
  let vue: Vue3D;
  try {
    vue = new Vue3D(toile(zone), modele, noms);
  } catch {
    return;
  }
  section.classList.add('is-scene');
  vue.taille();

  const n = modele.couches.length;
  const etapes = [...section.querySelectorAll<HTMLElement>('.recit__etapes li')];
  const photos = [...section.querySelectorAll<HTMLElement>('.recit__photo')];
  const laser = section.querySelector<HTMLElement>('.recit__laser');
  const compteur = section.querySelector<HTMLElement>('.recit__compteur b');
  const jauge = section.querySelector<HTMLElement>('.recit__jauge span');

  // L'état animé : écartement et opacité de chaque couche, angle de vue.
  const etat: Record<string, number> = { az: modele.vue[0] - 0.3 };
  for (let c = 0; c < n; c++) { etat[`e${c}`] = c ? 1.9 : 0; etat[`o${c}`] = c ? 0 : 1; }

  // À quelle étape du récit chaque couche arrive. La dernière couche clôt le chantier.
  const arrivees = [0.05, 0.5, 1.08, 2.08].slice(0, n - 1);
  const fin = 2.72;
  let courante = -1;

  const appliquer = () => {
    const temps = tl.time();
    for (let c = 0; c < n; c++) { vue.eclats[c] = etat[`e${c}`]; vue.opacites[c] = etat[`o${c}`]; }
    vue.az = etat.az;
    const arrivee = arrivees.reduce((dernier, a, i) => (temps >= a ? i : dernier), -1);
    vue.actif = temps >= fin || arrivee < 0 ? null : arrivee + 1;
    vue.rendre();
    const etape = temps < 1 ? 0 : temps < 2 ? 1 : 2;
    if (etape !== courante) {
      courante = etape;
      etapes.forEach((li, i) => li.classList.toggle('is-current', i === etape));
      if (compteur) compteur.textContent = String(etape + 1).padStart(2, '0');
    }
    section.classList.toggle('is-ferme', temps >= fin);
    if (jauge) jauge.style.scale = `${tl.progress()} 1`;
  };

  const haut = () => document.querySelector<HTMLElement>('.site-header')?.offsetHeight ?? 0;
  const tl = gsap.timeline({
    defaults: { ease: 'power3.out', duration: 0.5 },
    onUpdate: appliquer,
    scrollTrigger: { trigger: pin, start: () => `top ${haut()}px`, end: '+=330%', pin: true, scrub: 0.7, invalidateOnRefresh: true },
  });

  tl.to(etat, { az: modele.vue[0] + 0.28, duration: 3.2, ease: 'none' }, 0);
  arrivees.forEach((quand, i) => {
    tl.to(etat, { [`e${i + 1}`]: 1, [`o${i + 1}`]: 1 }, quand);
  });
  photos.slice(1).forEach((photo, i) => {
    const quand = i + 1;
    tl.fromTo(photo, { clipPath: 'inset(0% 0% 0% 100%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.42, ease: 'power1.inOut' }, quand);
    if (laser) tl.fromTo(laser, { left: '100%', opacity: 1 }, { left: '0%', opacity: 1, duration: 0.42, ease: 'power1.inOut' }, quand).set(laser, { opacity: 0 });
  });
  // Tout se referme : le mur est fini.
  for (let c = 1; c < n; c++) tl.to(etat, { [`e${c}`]: 0, duration: 0.42, ease: 'power2.inOut' }, fin + (n - 1 - c) * 0.02);
  tl.to({}, { duration: 0.12 });

  new ResizeObserver(() => { vue.taille(); appliquer(); }).observe(zone);
  appliquer();
}

// L'en-tête : les photos dérivent à des vitesses différentes, et suivent un peu le pointeur.
function planche() {
  const entete = document.querySelector<HTMLElement>('.rh');
  const photos = gsap.utils.toArray<HTMLElement>('.rh__photo');
  if (!entete || !photos.length) return;
  photos.forEach((photo) => {
    const p = Number(photo.dataset.profondeur ?? 0.3);
    gsap.to(photo, { yPercent: -70 * p, ease: 'none', scrollTrigger: { trigger: entete, start: 'top top', end: 'bottom top', scrub: true } });
  });
  if (!souris) return;
  const vers = photos.map((photo) => ({ x: gsap.quickTo(photo, 'x', { duration: 0.9, ease: 'power3' }), y: gsap.quickTo(photo, 'y', { duration: 0.9, ease: 'power3' }), p: Number(photo.dataset.profondeur ?? 0.3) }));
  entete.addEventListener('pointermove', (e) => {
    const dx = e.clientX / innerWidth - 0.5;
    const dy = e.clientY / innerHeight - 0.5;
    vers.forEach((v) => { v.x(dx * -46 * v.p); v.y(dy * -34 * v.p); });
  });
}

// Les grands numéros de chantier glissent derrière le contenu.
function numeros() {
  gsap.utils.toArray<HTMLElement>('.rc__n').forEach((numero) => {
    gsap.fromTo(numero, { yPercent: 28 }, { yPercent: -28, ease: 'none', scrollTrigger: { trigger: numero.closest('section'), start: 'top bottom', end: 'bottom top', scrub: true } });
  });
}

// L'index : au survol d'une ligne, la photo du chantier suit le pointeur.
function apercus() {
  const liste = document.querySelector<HTMLElement>('.index__list');
  const cadre = document.querySelector<HTMLElement>('.apercu');
  const img = cadre?.querySelector('img');
  if (!liste || !cadre || !img) return;
  const x = gsap.quickTo(cadre, 'x', { duration: 0.55, ease: 'power3' });
  const y = gsap.quickTo(cadre, 'y', { duration: 0.55, ease: 'power3' });
  const tourner = gsap.quickTo(cadre, 'rotation', { duration: 0.7, ease: 'power3' });
  let dernier = 0;
  liste.addEventListener('pointermove', (e) => {
    x(e.clientX);
    y(e.clientY);
    tourner(borne((e.clientX - dernier) * 0.5, -8, 8));
    dernier = e.clientX;
  });
  liste.querySelectorAll<HTMLAnchorElement>('a[data-apercu]').forEach((lien) => {
    new Image().src = lien.dataset.apercu ?? '';
    lien.addEventListener('pointerenter', (e) => {
      img.src = lien.dataset.apercu ?? '';
      gsap.set(cadre, { x: e.clientX, y: e.clientY });
      cadre.classList.add('is-on');
    });
  });
  liste.addEventListener('pointerleave', () => { cadre.classList.remove('is-on'); tourner(0); });
}
