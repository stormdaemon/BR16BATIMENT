# Plan de mise en œuvre SEO, GEO et refonte

> Le 30 octobre 2026, le client a précisé ses priorités : voir [`05-recentrage.md`](05-recentrage.md), qui prime sur ce plan pour le positionnement et la liste des actions.

> Étape 5. Exécuté par Claude dans la session, agents limités à Haiku 5.5. Plan validé par son auteur à la demande de l'utilisateur (voir « Auto-validation »).

**Objectif :** rendre BR 16 BATIMENT trouvable sur Google et citable par les moteurs de réponse, sur une stack à jour et avec un design refait, sans changer son identité de couleurs.

**Architecture :** site 100 % statique généré par Astro 7, contenu en Markdown validé par schéma, faits de l'entreprise centralisés dans un seul fichier, animations en amélioration progressive, contrôle qualité bloquant à chaque build.

**Stack :** Astro 7, TypeScript 6 (`@astrojs/check` n'accepte pas encore la v7), GSAP 3 (accueil uniquement), CSS natif, Netlify. React, React Router, Framer Motion et Formspree React sont retirés.

**Sources :** [`01-audit.md`](01-audit.md), [`02-recherches-google.md`](02-recherches-google.md), [`03-requetes-geo.md`](03-requetes-geo.md).

## Contraintes globales

- Couleurs : `#E7CF25`, `#282425`, `#1A1718`, `#F8F8F8`, `#FFFFFF`, `#666666`, `#CCCCCC`, `#333333`, plus les états de formulaire de l'ancien code. Aucune autre, contrôlé au build.
- URL existantes conservées : `/`, `/a-propos`, `/services`, `/contact`, `/mentions-legales`, `/politique-confidentialite`.
- Domaine canonique : `https://br16batiment.com`.
- Aucun fait inventé : ni avis, ni chiffre de chantiers, ni certification. Tout prix est daté, sourcé et présenté comme une fourchette.
- Le formulaire continue d'envoyer vers le Formspree existant (`xeokbklz`).
- Tout le contenu reste lisible sans JavaScript ; les animations respectent `prefers-reduced-motion`.
- Moins de 30 pages locales (alerte du skill), sans page interchangeable.

## Points de vigilance que les tests ne couvrent pas d'eux-mêmes

1. **Formulaire indisponible :** un envoi qui échoue doit afficher le téléphone, sans perdre la saisie.
2. **Sans JavaScript :** toute la page reste lisible et le formulaire poste directement vers Formspree.
3. **Petit mobile (320 px) :** ni défilement horizontal, ni titre coupé, barre d'action sans recouvrement.
4. **Certificat toujours expiré après le déploiement :** le site doit rester vérifiable sur l'URL Netlify ; aucune redirection forcée vers le domaine tant que le TLS n'est pas réparé.
5. **Anciennes URL du sitemap :** `/sitemap.xml` doit rediriger vers le nouvel index.

## Tâches

### Tâche 1 : correctif immédiat sur l'ancienne stack (étape 6)

Corrige ce qui fait du tort aujourd'hui, sans attendre la refonte.

- [x] Domaine canonique, robots.txt, sitemap, JSON-LD statique, 404 réel
- [x] Mentions légales et confidentialité sur la SAS active
- [x] Contenu lisible sans JavaScript, favicon et image de partage
- [x] Fusionner dans `main`, pousser, vérifier sur `br16batiment.netlify.app`

**Vérification :** `curl` avec le user-agent `OAI-SearchBot` renvoie le nom, le téléphone et la commune ; `/page-inexistante` renvoie 404 ; `/og-image.png` renvoie une image.

### Tâche 2 : socle Astro et contrôle qualité

**Fichiers :** `astro.config.mjs`, `netlify.toml`, `src/content.config.ts`, `src/data/site.ts`, `src/data/geo.json`, `src/lib/schema.ts`, `scripts/check-seo.mjs`, `scripts/build-geo-data.mjs`.

- [x] Écrire `check-seo.mjs` et le voir échouer (479 erreurs sans contenu)
- [x] Faits de l'entreprise, schémas de contenu, données géographiques réelles (IGN)

**Vérification :** `npm run build` échoue si un titre sort de 30-60 caractères, si un lien est cassé, si une couleur sort de la palette, si deux pages locales se ressemblent à plus de 40 % ou si une page est orpheline.

### Tâche 3 : design et motion

**Fichiers :** `src/styles/global.css`, `src/layouts/Base.astro`, `src/components/*`, `src/pages/*`, `src/scripts/home.ts`.

- [x] Ferme de charpente tracée au chargement, en CSS seul pour ne pas retarder le LCP
- [x] Maison en coupe construite calque par calque au défilement, un calque par service
- [x] Carte réelle de la Charente, trajets depuis Champagne-Vigny
- [x] Transitions de page natives en losange, reprises du logo
- [x] Vérifier à 320, 375, 768, 1024 et 1440 px, sans JavaScript et avec animations réduites

### Tâche 4 : contenu longue traîne

**Fichiers :** `src/content/services/*.md` (11), `src/content/guides/*.md` (14), `src/content/zones/*.md` (16), `src/pages/faq.astro`.

- [x] 11 pages services, rédigées par Claude
- [x] 14 guides sourcés et 16 pages locales, rédigés par Claude à partir des faits recherchés par les agents Haiku
- [x] FAQ transverse

**Vérification :** minimums de mots du contrôle qualité. Les chiffres des guides viennent du fichier de faits ; leur exactitude n'est pas contrôlable automatiquement et demande une relecture humaine.

**Trouvaille de la rédaction :** l'arrêté préfectoral du 24 juillet 2026 classe la totalité de la Charente à risque de termites, ce qui donne au guide dédié une vraie valeur locale.

### Tâche 5 : mise en production de la refonte (étape 7)

- [x] `npm run check` passe, Lighthouse local sur l'accueil, un service et un guide
- [x] Rédiger le README, fusionner dans `main`, pousser
- [x] Vérifier sur l'URL Netlify : statuts HTTP, HTML brut, redirections, Lighthouse

**Retour arrière :** republier le déploiement précédent depuis Netlify, ou `git revert` du commit de fusion.

## Ce qui reste hors du code : actions de l'entreprise

Par ordre d'impact. Aucune ne peut être faite à sa place.

1. ~~**Renouveler le certificat HTTPS**~~ : fait le 30 octobre 2026, valide jusqu'au 28 janvier 2027. À surveiller : le renouvellement automatique a déjà échoué une fois sans alerte.
2. **Créer ou revendiquer la fiche Google Business Profile**, catégorie principale exacte, photos réelles. C'est le premier facteur du pack local et la source de Gemini.
3. **Créer la fiche Bing Places**, source de ChatGPT Search et de Copilot, puis Apple Business Connect et PagesJaunes.
4. **Demander des avis clients réels**, de façon régulière.
5. **Fournir des photos de chantiers réels** : le signal d'expérience le plus fort, et le seul élément que le site ne peut pas créer.
6. **Vérifier l'attestation décennale** : couverture, ossature bois et nettoyage de toiture ne figurent pas dans l'objet publié au BODACC.
7. **Relire les pages services et guides** : les prestations exactes doivent être confirmées par Raphaël Bardan.
8. **Déclarer le site à Google Search Console**, soumettre `sitemap-index.xml`. Pour Bing, IndexNow suffit, sans compte : voir le README.
9. ~~**Décider pour le RGE**~~ : décidé par le client, l'entreprise n'est pas RGE et le site le dit clairement.

## Indicateurs

| Indicateur | Point de départ | Comment suivre |
| --- | --- | --- |
| Accès au domaine | Certificat réparé le 30/10/2026 | Navigateur, échéance du 28/01/2027 |
| Pages indexables | 4 | Search Console |
| Requêtes de marque | Aucune présence détectée | Google, Bing et les 4 assistants, chaque mois |
| Requêtes locales | Non mesuré | Search Console |
| LCP mobile | 3,8 s | Lighthouse local (objectif : moins de 2,5 s) |
| Mentions dans les réponses IA | Non mesuré | Grille mensuelle de `03-requetes-geo.md` |

**Échec à détecter :** si, trois mois après la correction du certificat et la création des fiches, la marque n'apparaît toujours pas sur sa propre requête, le problème est l'indexation, pas le contenu. Commencer alors par la Search Console.

## Auto-validation

Contrôle réalisé par l'auteur, conformément à la demande (« un plan que tu valides toi-même »).

| Contrôle | Résultat |
| --- | --- |
| Chaque constat critique a sa tâche | C2, C3, C4 : tâches 1 et 2. C5 : tâche 4 et actions hors code. **C1 : hors de portée du code, action n° 1** |
| Chaque constat élevé a sa tâche | H1, H2, H4, H5, H7 : tâche 1. H3, H6, H8 : tâche 4. H9 : actions hors code |
| Les contraintes sont vérifiables automatiquement | Palette, titres, liens, sitemap, similarité : oui. Absence de faits inventés : non, relecture humaine nécessaire |
| Le plan évite les pages satellites | 14 communes et 2 départements, sous le seuil de 30, avec des faits propres à chaque commune |
| Le plan reste réversible | Oui, déploiements Netlify et `git revert` |
| Risque principal assumé | Le contenu des guides et des pages locales part en production avant la relecture par le client, à la demande de l'utilisateur. Il est donc limité aux faits publics sourcés |

**Écart assumé par rapport à l'ordre demandé :** l'étape 6 livre en production le correctif de ce qui fait du tort, et non la totalité du plan. La génération statique et les pages longue traîne arrivent avec l'étape 7, car les construire sur une stack remplacée juste après serait du travail perdu.

**Verdict : plan validé.**
