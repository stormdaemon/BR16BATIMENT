# Recentrage sur les besoins des clients

Retours du client du 30 octobre 2026, relus de façon critique avant d'être appliqués.

## Ce que le client a demandé

- Les travaux ne permettent pas de bénéficier d'aides : l'entreprise n'est pas RGE.
- Pas d'intervention sur les termites.
- À pousser : plaquisterie, isolation, menuiserie, démoussage, traitement hydrofuge, rénovation intérieure (parquet flottant, lino, dressing, pose de cuisine, cloisons, doublage, aménagement intérieur).
- Au second plan : charpente, couverture, ossature bois.
- Une page par gros besoin, et sur chaque page : problème, solution, exemples de travaux, preuves, zone d'intervention, appel à devis.
- Moins « voici tous nos métiers », plus « voici précisément votre problème et ce qu'on sait faire pour le résoudre ».

## Ce qui a été appliqué tel quel

| Demande | Page |
| --- | --- |
| Plaquisterie | [`/services/plaquisterie`](https://br16batiment.com/services/plaquisterie) |
| Isolation intérieure | [`/services/isolation-interieure`](https://br16batiment.com/services/isolation-interieure) (ancienne adresse redirigée) |
| Menuiserie | [`/services/menuiserie`](https://br16batiment.com/services/menuiserie) |
| Démoussage | [`/services/demoussage-toiture`](https://br16batiment.com/services/demoussage-toiture) (ancienne adresse redirigée) |
| Hydrofuge | [`/services/hydrofuge-toiture`](https://br16batiment.com/services/hydrofuge-toiture) |
| Rénovation intérieure | [`/services/renovation-interieure`](https://br16batiment.com/services/renovation-interieure) (ancienne adresse redirigée) |
| Parquet et lino | [`/services/parquet-lino`](https://br16batiment.com/services/parquet-lino) |
| Dressing et aménagement intérieur | [`/services/dressing-amenagement-interieur`](https://br16batiment.com/services/dressing-amenagement-interieur) (ancienne adresse redirigée) |
| Pose de cuisine | [`/services/pose-cuisine`](https://br16batiment.com/services/pose-cuisine) |
| Pages locales | 14 communes et 2 départements, recentrés sur ces métiers |

Le contrôle `scripts/check-seo.mjs` bloque désormais le déploiement si une page service perd une section du fil, si les mots des clients disparaissent d'une page, ou si une promesse sur les aides ou les termites réapparaît.

## Ce qui a été corrigé par rapport à la demande

**Les preuves : il n'y en a pas encore assez.** Le dépôt ne contient aucune photo de chantier, aucune réalisation et aucun avis. Rien n'a été inventé. Les pages affichent ce qu'un client peut vérifier (parcours, SIRET, code NAF, assurances, délai). `src/data/preuves.ts` affichera photos et avis dès qu'ils existeront ; d'ici là, aucun emplacement vide n'apparaît. C'est le point faible du dispositif, et seul Raphaël peut le combler.

**Les exemples de travaux décrivent des types de chantiers,** pas des chantiers réels : présenter l'un pour l'autre serait trompeur.

**Pas de page par service et par commune.** « Plaquiste autour d'Angoulême » est traité par la page d'Angoulême et par la page plaquisterie. Multiplier 9 services par 14 communes produirait 126 pages quasi identiques, que Google traite comme des pages satellites.

**Démoussage et hydrofuge : deux pages, mais deux vrais sujets.** Le premier répond à « de la mousse sur le toit », le second à « mes tuiles boivent l'eau, est-ce utile ? ». Si ces deux pages finissaient par dire la même chose, elles se concurrenceraient : le contrôle de similarité les surveille.

**L'hydrofuge est la spécialité la plus fragile.** Les conseils d'entretien de Wienerberger, d'Edilians et de l'Agence Qualité Construction ne le mentionnent pas : ils parlent de nettoyage et d'anti-mousse. Ceux qui en vantent les effets sont surtout les vendeurs du produit, et les associations de consommateurs signalent du démarchage et des litiges sur cette prestation. La page dit donc franchement quand il ne sert à rien. C'est plus crédible et cela protège l'entreprise, mais il ne faut pas en attendre un fort volume, ni l'annoncer comme une garantie.

**Les prix sont sur devis.** Aucun montant n'apparaît hors des guides, et chaque guide annonce en tête que ses fourchettes viennent de tiers et ne sont pas les tarifs de l'entreprise. Le contrôle de build refuse un montant sur une page service, locale ou sur l'accueil, et un résumé de guide avec un montant sans cette mention.

**Le nom n'est jamais tronqué.** BR 16 BATIMENT reste l'écriture officielle, celle du logo et des registres. BR16 Bâtiment, l'écriture du client, est déclarée comme variante dans les données structurées et citée dans le texte, pour que les deux formes désignent la même entreprise.

**Isolation sans aides : un vrai handicap commercial.** Sur « entreprise isolation intérieure Charente », une partie des demandes vise des aides que BR16 Bâtiment ne peut pas ouvrir. Le site le dit dès la première phrase. L'angle retenu est l'isolation et le placo par le même artisan, pour ceux qui financent eux-mêmes.

**Assurance : aucune promesse par métier.** Le site ne dit plus que « les travaux sont couverts ». L'objet social publié au BODACC cite plâtrerie, isolation, charpente et menuiserie, mais ni le démoussage, ni l'hydrofuge, ni la pose de cuisine. À vérifier sur l'attestation avant de l'affirmer, d'autant qu'un cas relevé par l'UFC-Que Choisir montre un hydrofuge qui abîme des tuiles et une entreprise qui n'est plus couverte.

**Guides retirés.** Le guide des aides et le guide des termites attiraient des gens que l'entreprise ne peut pas servir, et risquaient d'associer BR16 Bâtiment à ces sujets. Leurs adresses redirigent vers la FAQ, qui répond clairement non dans les deux cas.

## Ce que Google et les IA peuvent comprendre, et ce qui ne dépend pas du site

Vérifié sur le site :

- l'entité est décrite avec ses spécialités d'abord, ses travaux complémentaires ensuite, et ce qu'elle ne fait pas (`HomeAndConstructionBusiness`, catalogue en trois groupes, `llms.txt` organisé par besoin) ;
- chaque page répond en une phrase autonome, qu'un moteur de réponse peut citer telle quelle ;
- un test à l'aveugle a été réalisé le 30 octobre 2026 : un modèle d'IA, sans autre information que le texte extrait du site, a répondu à 22 questions. Les 16 questions du client tombent sur la bonne page. Sur MaPrimeRénov', les termites et un électricien, il répond que l'entreprise ne convient pas. Sur les tarifs, il répond « sur devis ». Il a résumé correctement les priorités et les limites de l'entreprise. Ses critiques ont été corrigées avant la mise en production : titres « Charpentier » et « Couvreur », totaux en euros qui ressemblaient à une estimation maison, règle des aides incomplète. Ce test mesure la clarté du texte, pas la présence dans ChatGPT ou Gemini.

Ce que le site seul ne peut pas obtenir :

- **Le domaine était inaccessible en HTTPS** depuis le 22 août 2026 : certificat expiré. Réparé le 30 octobre 2026. Tant que Google n'a pas recrawlé le site, rien de ce travail n'est visible. À demander dans la Search Console.
- **Les moteurs de réponse citent ce qu'ils trouvent ailleurs :** sur les recherches locales relevées, ce sont les annuaires qui dominent (Obat, Travaux.com, PagesJaunes, Justacote, Mappy, 118712), et le téléphone de l'entreprise n'y figurait pas. Sans présence exacte dans ces annuaires et sans fiche Google, les IA ne citeront pas BR16 Bâtiment sur « plaquiste en Charente », quelle que soit la qualité du site.
- **Les avis pèsent plus que le texte** sur les recherches locales. Quelques avis qui nomment le métier (« cloisons », « isolation ») valent mieux que n'importe quelle page.

## Ce qu'il reste à faire, par ordre d'effet

1. **Fiche Google Business Profile :** catégorie principale liée au placo ou à la plâtrerie, services listés comme sur le site, photos, adresse et téléphone identiques.
2. **Avis :** en demander aux derniers clients, en les invitant à citer le travail réalisé.
3. **Photos de chantiers,** avant et après si possible, par métier, à ajouter dans `src/data/preuves.ts`.
4. **Annuaires :** Bing Places, PagesJaunes, Mappy, Travaux.com, Obat, à corriger avec la SAS et non l'ancienne entreprise fermée.
5. **Search Console et Bing Webmaster Tools :** déclarer le domaine et le sitemap, demander l'indexation des pages clés.
6. **Attestation d'assurance :** vérifier qu'elle couvre le démoussage, l'hydrofuge, la pose de cuisine et les sols.
7. **Logo :** le vrai logo affiche encore « charpente, couverture » en premier. Il n'a pas été modifié ; c'est une décision à prendre.
8. **Relecture par Raphaël :** les pages disent ce qu'il fait et comment il travaille. Il est le seul à pouvoir le confirmer, en particulier sur le lino, le dressing, les portes intérieures et l'hydrofuge.

## Comment mesurer

Une fois le site recrawlé, poser chaque mois les mêmes questions à ChatGPT, Claude, Gemini et Perplexity, sans nommer l'entreprise : voir la liste dans [`03-requetes-geo.md`](03-requetes-geo.md). Noter si BR16 Bâtiment est citée, avec quelle page, et si l'information est exacte (aides, termites).
