// Compte les prises de contact du site : appels, emails, demandes de devis.
// Aucune donnée personnelle : ni adresse IP, ni identifiant, ni cookie. Chaque
// prise de contact garde l'heure, la page, le projet choisi et le site d'origine.
//
// POST /api/mesures   enregistre une prise de contact (envoyée par le site)
// GET  /api/mesures   rend le bilan, avec l'en-tête « Authorization: Bearer <MESURES_CLE> »
import { getStore } from '@netlify/blobs';
import type { Config, Context } from '@netlify/functions';
import { randomUUID, timingSafeEqual } from 'node:crypto';

const TYPES = new Set(['appel', 'email', 'devis']);
const MAX_PAR_JOUR = 500;
const MAX_JOURS = 366;
const CONSERVATION_JOURS = 760;

export type Evenement = { h: string; type: string; page: string; projet?: string; source: string };

const texte = (valeur: unknown, max: number) =>
  typeof valeur === 'string' ? valeur.replace(/[\u0000-\u001f<>]/g, '').trim().slice(0, max) : '';

export function nettoyer(corps: unknown): Omit<Evenement, 'h'> | null {
  if (!corps || typeof corps !== 'object') return null;
  const c = corps as Record<string, unknown>;
  const type = texte(c.type, 10);
  if (!TYPES.has(type)) return null;
  const page = texte(c.page, 200);
  if (!page.startsWith('/')) return null;
  const source = texte(c.source, 100).toLowerCase() || 'direct';
  const projet = type === 'devis' ? texte(c.projet, 80) : '';
  return projet ? { type, page, projet, source } : { type, page, source };
}

// Heure de Paris : le bilan se lit avec les journées du client.
function maintenant() {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('fr-FR', {
      timeZone: 'Europe/Paris', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
    }).formatToParts(new Date()).map((p) => [p.type, p.value]),
  );
  return { jour: `${parts.year}-${parts.month}-${parts.day}`, h: `${parts.hour}:${parts.minute}` };
}

function cleValide(req: Request) {
  const attendue = Netlify.env.get('MESURES_CLE');
  const recue = (req.headers.get('authorization') ?? '').replace(/^Bearer\s+/i, '');
  if (!attendue || !recue) return false;
  const a = Buffer.from(attendue);
  const b = Buffer.from(recue);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function bilan(jours: { jour: string; evenements: Evenement[] }[]) {
  const total: Record<string, number> = { appel: 0, email: 0, devis: 0 };
  const parPage: Record<string, Record<string, number>> = {};
  const parSource: Record<string, Record<string, number>> = {};
  const parProjet: Record<string, number> = {};
  for (const { evenements } of jours) {
    for (const e of evenements) {
      total[e.type] = (total[e.type] ?? 0) + 1;
      (parPage[e.page] ??= {})[e.type] = (parPage[e.page][e.type] ?? 0) + 1;
      (parSource[e.source] ??= {})[e.type] = (parSource[e.source][e.type] ?? 0) + 1;
      if (e.projet) parProjet[e.projet] = (parProjet[e.projet] ?? 0) + 1;
    }
  }
  return {
    total,
    parJour: jours.map(({ jour, evenements }) => ({
      jour,
      appel: evenements.filter((e) => e.type === 'appel').length,
      email: evenements.filter((e) => e.type === 'email').length,
      devis: evenements.filter((e) => e.type === 'devis').length,
    })),
    parPage,
    parSource,
    parProjet,
  };
}

export default async (req: Request, context: Context) => {
  // Les essais des déploiements de test ne se mêlent pas aux vrais chiffres.
  const store = getStore({ name: context.deploy.context === 'production' ? 'mesures' : 'mesures-test', consistency: 'strong' });

  if (req.method === 'POST') {
    // Seul le site lui-même peut envoyer une prise de contact.
    const site = req.headers.get('sec-fetch-site');
    if (site && site !== 'same-origin') return new Response(null, { status: 403 });
    let corps: unknown;
    try { corps = JSON.parse(await req.text()); } catch { return new Response(null, { status: 400 }); }
    const evenement = nettoyer(corps);
    if (!evenement) return new Response(null, { status: 400 });

    // Une entrée par prise de contact : deux envois simultanés ne s'écrasent pas.
    const { jour, h } = maintenant();
    const { blobs } = await store.list({ prefix: `e/${jour}/` });
    if (blobs.length >= MAX_PAR_JOUR) return new Response(null, { status: 429 });
    await store.setJSON(`e/${jour}/${h.replace(':', '')}-${randomUUID()}`, { h, ...evenement });
    return new Response(null, { status: 204 });
  }

  if (req.method === 'GET') {
    if (!cleValide(req)) return new Response('Clé absente ou incorrecte.', { status: 401 });
    const demandes = Number(new URL(req.url).searchParams.get('jours') ?? 30);
    const nb = Number.isFinite(demandes) ? Math.min(Math.max(Math.trunc(demandes), 1), MAX_JOURS) : 30;
    const limite = new Date(Date.now() - (nb - 1) * 86_400_000).toISOString().slice(0, 10);

    const { blobs } = await store.list({ prefix: 'e/' });
    // Durée de conservation annoncée dans la politique de confidentialité : 25 mois.
    const expiration = new Date(Date.now() - CONSERVATION_JOURS * 86_400_000).toISOString().slice(0, 10);
    await Promise.all(blobs.filter((b) => b.key.slice(2, 12) < expiration).map((b) => store.delete(b.key)));
    const cles =blobs.map((b) => b.key).filter((k) => k.slice(2, 12) >= limite).sort();
    const lus = await Promise.all(cles.map(async (k) => ({ jour: k.slice(2, 12), e: (await store.get(k, { type: 'json' })) as Evenement | null })));
    const parJour = new Map<string, Evenement[]>();
    for (const { jour, e } of lus) if (e) parJour.set(jour, [...(parJour.get(jour) ?? []), e]);
    const jours = [...parJour].map(([jour, evenements]) => ({ jour, evenements }));
    return Response.json(
      { depuis: limite, jours: nb, ...bilan(jours), detail: jours },
      { headers: { 'Cache-Control': 'no-store' } },
    );
  }

  return new Response(null, { status: 405, headers: { Allow: 'GET, POST' } });
};

export const config: Config = { path: '/api/mesures' };
