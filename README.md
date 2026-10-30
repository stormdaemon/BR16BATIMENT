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
- pas plus de 40 % de texte commun entre deux pages locales, pour éviter les pages satellites ;
- un sitemap complet et sans page exclue ;
- aucune couleur hors de la palette de l'identité.

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
