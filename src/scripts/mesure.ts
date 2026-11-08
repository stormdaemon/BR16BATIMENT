// Mesure des prises de contact, sans cookie ni donnée personnelle.
// Voir netlify/functions/mesures.mts pour ce qui est enregistré.

type TypeContact = 'appel' | 'email' | 'devis';

const CLE_ORIGINE = 'br16-origine';

// Le site d'où vient la visite (google.com, bing.com…), gardé le temps de l'onglet :
// une demande envoyée trois pages plus loin reste attribuée à sa vraie origine.
function origine(): string {
  let externe = '';
  try {
    const ref = document.referrer ? new URL(document.referrer).hostname.replace(/^www\./, '') : '';
    if (ref && ref !== location.hostname.replace(/^www\./, '')) externe = ref;
  } catch { /* référent illisible */ }
  try {
    const garde = sessionStorage.getItem(CLE_ORIGINE);
    if (garde && !externe) return garde;
    sessionStorage.setItem(CLE_ORIGINE, externe || garde || 'direct');
  } catch { /* stockage bloqué : on garde le référent de la page */ }
  return externe || 'direct';
}

export function mesurer(type: TypeContact, projet?: string) {
  const corps = JSON.stringify({ type, page: location.pathname, projet, source: origine() });
  try {
    const envoye = navigator.sendBeacon?.('/api/mesures', new Blob([corps], { type: 'application/json' }));
    if (!envoye) void fetch('/api/mesures', { method: 'POST', body: corps, keepalive: true, headers: { 'Content-Type': 'application/json' } }).catch(() => {});
  } catch { /* la mesure ne doit jamais gêner la visite */ }
}

export function suivreContacts() {
  origine();
  document.addEventListener('click', (event) => {
    const lien = (event.target as Element | null)?.closest?.('a[href^="tel:"], a[href^="mailto:"]');
    if (lien) mesurer(lien.getAttribute('href')!.startsWith('tel:') ? 'appel' : 'email');
  }, { capture: true });
}
