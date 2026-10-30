# Audit SEO / GEO de br16batiment.com

Audit du 30 octobre 2026, sur le site en production avant toute correction (commit `2e7429f`, déployé le 8 juillet 2025).

**Méthode.** Grille du skill [`AgriciDaniel/claude-seo`](https://github.com/AgriciDaniel/claude-seo) v2.5.0 (24 k étoiles, licence MIT, maintenu), lue comme référence : ni installé, ni exécuté, ses scripts ont été remplacés par des contrôles maison. Choisi devant `zubair-trabzada/geo-seo-claude` (11 k étoiles) parce qu'il couvre le SEO local en détail, qu'il renvoie aux sources primaires de Google et qu'il tient ses seuils à jour (fin des résultats enrichis FAQ, inutilité de llms.txt pour Google). Son pied de page promotionnel n'a pas été repris.

**Mesures réelles :** HTML brut récupéré avec les user-agents des robots, rendu navigateur, Lighthouse 13 local, DNS et TLS, RDAP, SIRENE, BODACC, VIES, annuaire RGE de l'ADEME, Netlify (lecture seule).

**Non mesuré, faute d'accès :** Search Console, trafic réel, Core Web Vitals de terrain (PageSpeed API en quota dépassé), profil de liens, classements réels dans le pack local, Google Business Profile.

## Scores

Les scores sont une appréciation argumentée selon les pondérations du skill, pas la sortie d'un outil.

| Catégorie | Poids | Note | Motif principal |
| --- | --- | --- | --- |
| SEO technique | 22 % | 20 | HTTPS cassé, canonicals sur un domaine inexistant, rendu JavaScript seul |
| Qualité du contenu | 23 % | 25 | 130 à 290 mots par page, aucune page par service ni par zone, identité contradictoire |
| On-page | 20 % | 35 | Titres gabarits, H1 sans lieu, peu de maillage |
| Données structurées | 10 % | 15 | Rendues côté client, téléphone `+33`, coordonnées fausses |
| Performance | 10 % | 75 | Mobile 86/100, LCP 3,8 s ; bureau 98/100 |
| Recherche IA | 10 % | 10 | HTML vide pour les robots, aucune entité identifiable |
| Images | 5 % | 40 | Logo de 248 Ko, affiche publicitaire présentée comme une photo |
| **Santé SEO** | | **29 / 100** | |
| **Préparation GEO** (grille `seo-geo`) | | **17 / 100** | |

Lighthouse affiche un SEO de 92/100 : ce chiffre est trompeur. Il ne voit ni le certificat, ni le domaine canonique inexistant, ni l'absence totale de contenu sans JavaScript.

## Critique : bloque l'indexation ou expose l'entreprise

| # | Constat | Preuve | Conséquence |
| --- | --- | --- | --- |
| C1 | **Le certificat HTTPS de `br16batiment.com` a expiré le 22 août 2026.** Netlify sert `*.netlify.app`, qui ne couvre pas le domaine | `ERR_CERT_COMMON_NAME_INVALID` ; Netlify : `expires_at 2026-08-22`, `renewal_error_message: br16batiment.com doesn't appear to be served by Netlify` | Les visiteurs voient une alerte de sécurité, les robots ne peuvent pas lire le site. HTTP et `www` redirigent vers cette URL cassée |
| C2 | **Tout pointe vers `br16batiment.fr`, un domaine qui n'est pas enregistré** : canonicals, Open Graph, sitemap, robots.txt | DNS sans réponse, RDAP du registre français en 404 | Google reçoit une canonique morte. N'importe qui peut acheter ce domaine |
| C3 | **Les mentions légales décrivent une entreprise fermée.** L'EI 833 229 727 a cessé le 31/10/2025 ; l'activité est passée à la SAS BR 16 BATIMENT, 994 082 071 | SIRENE (état `C`), BODACC du 23/11/2025, VIES | Mentions légales inexactes (obligation LCEN) et entité incohérente pour les moteurs |
| C4 | **Le site est invisible sans JavaScript.** Les 6 URL renvoient le même HTML de 785 octets, sans texte, ni description, ni JSON-LD | Récupération avec GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot | Les robots qui n'exécutent pas le JavaScript ne voient rien. Les aperçus de partage sont vides |
| C5 | **Aucune présence détectée de la marque** dans les résultats de recherche testés | Recherches sur la marque : le site n'apparaît pas ; seule l'ancienne entreprise fermée figure sur Mappy, societe.com et l'INSEE | Rien à citer pour un moteur de réponse |

## Élevé

| # | Constat | Preuve |
| --- | --- | --- |
| H1 | Faux 200 : toute URL inconnue affiche une page vide en HTTP 200 | `/page-inexistante` en 200, `/logo.png` renvoie du HTML |
| H2 | Image de partage cassée : `/logo.png` n'existe pas dans `public/` | Le logo est dans `src/assets`, avec un nom haché au build |
| H3 | Couverture de recherche quasi nulle : 6 URL pour 11 métiers et une zone de 3 départements | Page services de 224 mots, sans page dédiée |
| H4 | JSON-LD incorrect : `telephone: "+33"`, coordonnées à 38 km du siège (45,8167 ; 0,2833 au lieu de 45,5035 ; 0,0399), type générique `LocalBusiness`, seulement sur la page rendue | `SEOHead.tsx`, SIRENE |
| H5 | NAP incohérent : `contact@br16batiment.fr` (domaine inexistant) dans la politique de confidentialité, Gmail ailleurs | Les demandes RGPD partaient vers une boîte qui n'existe pas |
| H6 | Promesses non étayées : « Savoir-faire reconnu et certifié », « Artisan qualifié » | L'annuaire RGE de l'ADEME renvoie 0 résultat pour les deux SIREN |
| H7 | Politique de confidentialité inexacte : Formspree et Google Fonts non cités, cookies analytiques annoncés mais absents | Lecture du code |
| H8 | Positionnement contradictoire : « Charpentier professionnel » et « Artisan de second œuvre », avec un code NAF désormais 43.31Z (plâtrerie) | Titres, H1, BODACC |
| H9 | Aucun signal local visible : pas de fiche Google Business, d'avis ni d'annuaires détectés | Pages et recherches |

**Point à arbitrer.** L'objet social publié au BODACC cite plâtrerie, isolation, charpente et menuiserie, mais ni la couverture, ni l'ossature bois, ni le nettoyage de toiture, pourtant annoncés sur le site et sur le logo. À vérifier avec l'attestation décennale.

## Moyen

- **M1. Performance mobile :** LCP de 3,8 s, Google Fonts bloquant (340 ms), 247 Kio d'images gaspillés, 67 Kio de JavaScript inutilisé, logo de 622 × 401 px affiché en vignette.
- **M2. Sécurité :** seul HSTS est présent ; ni CSP, ni `X-Content-Type-Options`, ni `Referrer-Policy`.
- **M3. Favicon :** celui de Vite par défaut.
- **M4. Contraste :** un paragraphe sous le seuil (Lighthouse `color-contrast`).
- **M5. Fraîcheur faussée :** « Dernière mise à jour » affiche la date du jour à chaque visite.
- **M6. Écran de chargement :** le contenu n'apparaît qu'après des animations Framer Motion démarrant à `opacity: 0`.
- **M7. Doublon d'hôte :** `br16batiment.netlify.app` répond en 200 sans rediriger vers le domaine principal.
- **M8. Contenu provisoire :** « Carte interactive disponible prochainement » sur la page contact.
- **M9. robots.txt :** règles sans objet (`/admin/`, `/.git/`, `Crawl-delay`).

## Faible

- Dépendances inutilisées (`vite-plugin-sitemap`, `react-router-sitemap-generator`, Babel, `@types/react-router-dom` v5).
- 9 erreurs de lint préexistantes, 2 scripts de sitemap obsolètes visant un autre domaine.
- `llms.txt` absent. Il n'a aucun effet sur Google et aucun fournisseur majeur n'a confirmé l'utiliser : à ajouter car c'est gratuit, sans en attendre de résultat.

## Accès des robots (avant correction)

Chaque ligne concerne un robot précis et la capacité qu'il gouverne.

| Robot | Rôle | Autorisé par robots.txt | Voit le contenu |
| --- | --- | --- | --- |
| Googlebot | Google Search, AI Overviews, AI Mode | Oui | Oui après rendu, si HTTPS fonctionne |
| Bingbot | Bing, source de ChatGPT Search et Copilot | Oui | Rendu partiel, non vérifié |
| OAI-SearchBot | Citations dans ChatGPT Search | Oui | **Non** (HTML vide) |
| Claude-SearchBot | Citations dans Claude | Oui | **Non** |
| PerplexityBot | Index de Perplexity | Oui | **Non** |
| GPTBot, ClaudeBot | Entraînement uniquement | Oui | **Non**, sans effet sur la citation |
| Google-Extended | Entraînement Gemini (pas Search) | Oui | Sans objet pour Search |

## Ce qui fonctionnait déjà

Le déploiement automatique depuis `main` avec HSTS actif, une page par route, un seul H1 par page, le Formspree opérationnel (l'adresse répond ; aucun message de test envoyé pour ne pas déranger le client), l'absence de suivi publicitaire.

## Présence locale et concurrence

Voir [`02-recherches-google.md`](02-recherches-google.md#ce-que-montrent-les-résultats-de-recherche).

## Sources

- [Google : AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)
- [OpenAI : robots](https://platform.openai.com/docs/bots)
- [Anthropic : robots](https://support.anthropic.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler)
- [BODACC](https://bodacc-datadila.opendatasoft.com/), [API Recherche d'entreprises](https://recherche-entreprises.api.gouv.fr/), [VIES](https://ec.europa.eu/taxation_customs/vies/), [Annuaire RGE, ADEME](https://data.ademe.fr/datasets/liste-des-entreprises-rge-2)
