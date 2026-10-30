// Mise en scène de l'accueil. Tout est en amélioration progressive :
// sans ce script, ou avec « réduire les animations », la page reste complète et lisible.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduced) {
  gsap.registerPlugin(ScrollTrigger);
  buildHero();
  buildMarquee();
  buildHouse();
  buildMethod();
  buildMap();
  buildCta();
}

function buildHero() {
  const hero = document.querySelector<HTMLElement>('.hero');
  if (!hero) return;
  const scrub = { trigger: hero, start: 'top top', end: 'bottom top', scrub: true };
  gsap.to('.hero__truss', { yPercent: -14, scale: 1.07, ease: 'none', scrollTrigger: scrub });
  gsap.utils.toArray<HTMLElement>('.hero__title .line').forEach((line, i) => {
    gsap.to(line, { xPercent: i % 2 ? 7 : -4, ease: 'none', scrollTrigger: scrub });
  });
}

function buildMarquee() {
  const track = document.querySelector<HTMLElement>('.marquee__track');
  if (!track) return;
  track.classList.add('is-driven');
  const loop = gsap.to(track, { xPercent: -50, repeat: -1, duration: 42, ease: 'none' });
  // Le bandeau accélère avec le défilement, puis revient à son rythme.
  ScrollTrigger.create({
    onUpdate: (self) => {
      const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 260, 7);
      gsap.to(loop, { timeScale: self.direction * boost, duration: 0.2, overwrite: true });
      gsap.to(loop, { timeScale: self.direction, duration: 1.1, delay: 0.2 });
    },
  });
}

function buildHouse() {
  const house = document.querySelector<SVGElement>('.build .house');
  const steps = gsap.utils.toArray<HTMLElement>('.build .step');
  if (!house || !steps.length) return;

  house.classList.add('is-dim');
  const select = (slug: string) => house.querySelectorAll(`[data-layer="${slug}"]`);
  const setActive = (slug: string, on: boolean) => {
    select(slug).forEach((el) => el.classList.toggle('is-active', on));
  };

  house.querySelectorAll('.layer > *').forEach((el) => gsap.set(el, { strokeDasharray: 1, strokeDashoffset: 1 }));
  gsap.fromTo(house.querySelectorAll('.base > *'), { strokeDasharray: 1, strokeDashoffset: 1 }, {
    strokeDashoffset: 0, stagger: 0.008, duration: 1.4, ease: 'power2.inOut',
    scrollTrigger: { trigger: house, start: 'top 80%' },
  });

  steps.forEach((step) => {
    const slug = step.dataset.step ?? '';
    const parts = house.querySelectorAll(`.layer[data-layer="${slug}"] > *`);
    ScrollTrigger.create({
      trigger: step,
      start: 'top 62%',
      end: 'bottom 38%',
      onToggle: (self) => {
        step.classList.toggle('is-current', self.isActive);
        if (slug === 'renovation') {
          house.classList.toggle('is-all', self.isActive);
          house.classList.toggle('is-dim', !self.isActive);
        } else {
          setActive(slug, self.isActive);
        }
      },
    });
    if (parts.length) {
      gsap.to(parts, {
        strokeDashoffset: 0, ease: 'none', stagger: 0.04,
        scrollTrigger: { trigger: step, start: 'top 88%', end: 'top 45%', scrub: 0.5 },
      });
    }
  });
}

function buildMethod() {
  const line = document.querySelector('.method__line');
  if (!line) return;
  gsap.fromTo(line, { scaleX: 0 }, {
    scaleX: 1, ease: 'none', transformOrigin: 'left center',
    scrollTrigger: { trigger: '.method__steps', start: 'top 80%', end: 'bottom 55%', scrub: 0.5 },
  });
}

function buildMap() {
  const map = document.querySelector<SVGElement>('.zone .map');
  if (!map) return;
  const outline = map.querySelector<SVGPathElement>('.dep--main');
  if (outline) {
    outline.setAttribute('pathLength', '1');
    gsap.fromTo(outline, { strokeDasharray: 1, strokeDashoffset: 1 }, {
      strokeDashoffset: 0, duration: 2.2, ease: 'power2.inOut',
      scrollTrigger: { trigger: map, start: 'top 75%' },
    });
  }
  const routes = map.querySelectorAll('.route');
  // Les trajets rayonnent depuis Champagne-Vigny, puis laissent la place à la carte.
  gsap.timeline({ scrollTrigger: { trigger: map, start: 'top 60%' } })
    .to(routes, { strokeDashoffset: 0, duration: 0.9, stagger: 0.07, ease: 'power2.out' }, 0.4)
    .to(routes, { strokeDashoffset: 1, duration: 0.7, stagger: 0.03, ease: 'power2.in', clearProps: 'strokeDashoffset' }, '+=0.5');
}

function buildCta() {
  const phone = document.querySelector('.cta__phone');
  if (!phone) return;
  gsap.fromTo(phone, { scale: 0.82 }, {
    scale: 1, ease: 'none', transformOrigin: 'left bottom',
    scrollTrigger: { trigger: '.cta', start: 'top 95%', end: 'top 35%', scrub: true },
  });
}
