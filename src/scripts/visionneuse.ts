// Visionneuse des photos de chantier : agrandir, passer à la suivante, fermer.
// Amélioration progressive : sans ce script, chaque lien ouvre simplement son image.
import { deux } from '../lib/typo';

let dialog: HTMLDialogElement | undefined;
let liens: HTMLAnchorElement[] = [];
let index = 0;

function creer() {
  const d = document.createElement('dialog');
  d.className = 'visio';
  d.setAttribute('aria-label', 'Photo agrandie');
  d.innerHTML = `
    <div class="visio__bar">
      <span class="visio__count label" aria-live="polite"></span>
      <button type="button" class="visio__close">Fermer</button>
    </div>
    <div class="visio__scene"><img class="visio__img" alt="" /></div>
    <div class="visio__pied">
      <button type="button" class="visio__nav" data-pas="-1" aria-label="Photo précédente">←</button>
      <p class="visio__legende"></p>
      <button type="button" class="visio__nav" data-pas="1" aria-label="Photo suivante">→</button>
    </div>`;
  document.body.append(d);

  d.querySelector('.visio__close')?.addEventListener('click', () => d.close());
  d.querySelectorAll<HTMLButtonElement>('.visio__nav').forEach((b) => b.addEventListener('click', () => aller(Number(b.dataset.pas))));
  // Un clic à côté de la photo ferme la visionneuse.
  d.querySelector('.visio__scene')?.addEventListener('click', (e) => { if (!(e.target instanceof HTMLImageElement)) d.close(); });
  d.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') aller(1);
    if (e.key === 'ArrowLeft') aller(-1);
  });

  // Glisser du doigt pour changer de photo.
  let depart: number | undefined;
  d.addEventListener('pointerdown', (e) => { depart = e.pointerType === 'touch' ? e.clientX : undefined; });
  d.addEventListener('pointerup', (e) => {
    if (depart === undefined) return;
    const ecart = e.clientX - depart;
    depart = undefined;
    if (Math.abs(ecart) > 48) aller(ecart < 0 ? 1 : -1);
  });
  return d;
}

function montrer() {
  if (!dialog) return;
  const lien = liens[index];
  const img = dialog.querySelector<HTMLImageElement>('.visio__img')!;
  img.classList.remove('is-in');
  img.onload = () => img.classList.add('is-in');
  img.src = lien.href;
  img.alt = lien.dataset.alt ?? '';
  if (img.complete) img.classList.add('is-in');
  dialog.querySelector('.visio__legende')!.textContent = lien.dataset.legende ?? '';
  dialog.querySelector('.visio__count')!.textContent = `${deux(index + 1)} / ${deux(liens.length)}`;
  dialog.classList.toggle('is-seule', liens.length < 2);
  // La suivante se charge en avance.
  if (liens.length > 1) new Image().src = liens[(index + 1) % liens.length].href;
}

function aller(pas: number) {
  if (liens.length < 2) return;
  index = (index + pas + liens.length) % liens.length;
  montrer();
}

document.addEventListener('click', (e) => {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  const lien = (e.target as Element | null)?.closest<HTMLAnchorElement>('a[data-visionneuse]');
  if (!lien) return;
  e.preventDefault();
  liens = [...document.querySelectorAll<HTMLAnchorElement>('a[data-visionneuse]')];
  index = Math.max(0, liens.indexOf(lien));
  dialog ??= creer();
  montrer();
  dialog.showModal();
});
