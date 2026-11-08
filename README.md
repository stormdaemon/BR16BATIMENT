# BR 16 BATIMENT

Site de BR 16 BATIMENT, entreprise artisanale du bâtiment à Champagne-Vigny (Charente) : [br16batiment.com](https://br16batiment.com).

Site statique généré avec [Astro](https://astro.build), hébergé sur Netlify. Chaque poussée sur `main` part directement en production.

## Commandes

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # génère dist/ puis lance le contrôle qualité
npm run check      # contrôle des types, puis build
```

Node 22.23 ou plus récent. TypeScript reste en v6 tant que `@astrojs/check` n'accepte pas la v7.

## Où modifier quoi

| Pour changer | Fichier |
| --- | --- |
| Téléphone, adresse, SIRET, horaires, parcours, liste des services | `src/data/site.ts` |
| Le texte d'un service | `src/content/services/<service>.md` |
| Les photos de chantiers et les avis réels | `src/data/preuves.ts`, photos dans `src/assets/realisations/` |
| Le texte d'une commune ou d'un département | `src/content/zones/<commune>.md` |
| Un guide | `src/content/guides/<guide>.md` |
| Couleurs, typographie, espacements | `src/styles/global.css` |
| Les animations de l'accueil | `src/scripts/home.ts` |
| Les communes et distances | `scripts/build-geo-data.mjs`, puis `node scripts/build-geo-data.mjs` |

`src/data/site.ts` est la seule source des informations sur l'entreprise : le contenu visible, le JSON-LD et `llms.txt` s'en servent. Modifiez-le là, et nulle part ailleurs.

Les champs de chaque type de page sont définis et validés dans `src/content.config.ts`.

## Contrôle qualité

`npm run build` lance `scripts/check-seo.mjs` après la génération. **Une erreur bloque le déploiement.** Il vérifie sur le HTML généré :

- titres de 30 à 60 caractères et descriptions de 120 à 160, uniques ;
- un seul H1, une canonique exacte, un JSON-LD valide ;
- aucun lien interne cassé, aucune page orpheline ;
- un nombre de mots minimal par type de page, sans JavaScript ;
- pas plus de 40 % de texte commun entre deux pages locales ou deux pages services ;
- un sitemap complet et sans page exclue ;
- aucune couleur hors de la palette de l'identité ;
- sur chaque page service, le fil problème, exemples, preuves, zone et devis, avec les mots employés par les clients ;
- aucun montant hors des guides, et la mention « prix sur devis » dans chaque guide qui en affiche : les prix de l'entreprise sont sur devis ;
- aucune promesse sur les aides ou les termites, et jamais le nom de l'entreprise tronqué.

Les priorités commerciales et leurs raisons sont dans `docs/seo/05-recentrage.md`.

## Mesurer les prises de contact

Le site compte les clics sur le téléphone et l'email, et les demandes de devis envoyées, sans cookie ni donnée personnelle (`netlify/functions/mesures.mts`, `src/scripts/mesure.ts`). Chaque prise de contact garde l'heure, la page, le projet choisi et le site d'origine de la visite (google.com, bing.com, direct…).

```bash
npm run mesures          # bilan des 30 derniers jours
npm run mesures -- 90    # bilan des 90 derniers jours
```

La clé de lecture est la variable `MESURES_CLE` du site sur Netlify. Copiez-la dans `.env.local` (`MESURES_CLE=...`), fichier non versionné. Les essais faits sur un déploiement de test vont dans un espace séparé et ne faussent pas les chiffres. Un clic sur le numéro ne prouve pas que l'appel a abouti : c'est une intention d'appel.

## Signaler une modification à Bing

`npm run indexnow -- services/plaquisterie faq` envoie ces pages à Bing et aux autres moteurs IndexNow, une fois le déploiement terminé. Sans argument, le script envoie tout le sitemap. Aucun compte n'est nécessaire : la clé est le fichier `.txt` à la racine de `public/`. Google n'utilise pas ce protocole.

## Identité

Les couleurs sont imposées et contrôlées au build :

| Rôle | Valeur |
| --- | --- |
| Jaune | `#E7CF25` |
| Anthracite | `#282425` |
| Encre | `#1A1718` |
| Papier | `#F8F8F8` |
| Blanc | `#FFFFFF` |
| Gris | `#666666`, `#CCCCCC`, `#333333` |

## Formulaire de contact

Il envoie vers Formspree (`https://formspree.io/f/xeokbklz`), sans dépendance : un script l'améliore, et il continue de fonctionner sans JavaScript.

## SEO et GEO

Audit, inventaire des requêtes et plan d'action : [`docs/seo/`](docs/seo/).

## Règles de contenu

Rien n'est inventé sur ce site : ni avis, ni chiffre de chantiers, ni certification. Les prix des guides sont des fourchettes publiées, datées et sourcées. Si vous ajoutez un fait sur l'entreprise, il doit être vérifiable.

Les pages parlent avec la voix de l'artisan. Quand un chiffre n'existe pas, on explique pourquoi il dépend du chantier, sans écrire « je n'ai pas trouvé » : le contrôle qualité refuse ces tournures.
