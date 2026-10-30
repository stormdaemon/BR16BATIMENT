# Inventaire GEO : ce qu'on demande à ChatGPT, Claude, Gemini et Perplexity

> Liste mise à jour le 30 octobre 2026 après le recentrage demandé par le client : voir [`05-recentrage.md`](05-recentrage.md).

Étape 4. Contrairement à Google, ces moteurs ne publient aucune suggestion ni aucun volume : cet inventaire est **une estimation raisonnée**, construite à partir des vraies questions de l'inventaire Google, reformulées comme on parle à un assistant. Il n'a pas été mesuré sur les quatre outils. La recherche Haiku a seulement testé trois formulations, sur des moteurs classiques.

## Comment chaque moteur trouve une entreprise locale

| Moteur | Où il cherche | Levier principal pour BR 16 BATIMENT | Fiabilité |
| --- | --- | --- | --- |
| **ChatGPT** | Index Bing (OAI-SearchBot) et ses propres robots | Fiche **Bing Places**, indexation Bing, annuaires tiers cohérents | Bing : documenté |
| **Claude** | Recherche web et Claude-SearchBot | HTML statique lisible, pages factuelles | Robots : documenté par Anthropic |
| **Gemini, AI Overviews, AI Mode** | Index Google (Googlebot) | **Google Business Profile**, classement SEO classique | Google : « c'est toujours du SEO » |
| **Perplexity** | Index propre (PerplexityBot) et web | Pages citant leurs sources, fraîcheur, forums | Robots : documenté |

Google précise dans son guide qu'optimiser pour l'IA reste du SEO, que le découpage artificiel du contenu et `llms.txt` n'apportent rien sur Search. Les chiffres qui circulent (Reddit, citations, « 130-170 mots ») sont des études tierces : ils orientent, sans rien garantir.

## Les requêtes probables, par intention

Pour chaque famille, la **page qui doit répondre** existe désormais. La colonne « Réponse » indique ce que le site permet de dire.

### 1. Recommandation d'un artisan (la plus précieuse)

Le site seul ne suffit pas : ces réponses reposent sur des **sources tierces et des avis**, qui restent à créer (voir le plan).

| Question | Page qui doit répondre |
| --- | --- |
| « Je cherche un plaquiste en Charente. » | `/services/plaquisterie` |
| « Un plaquiste autour d'Angoulême ? » | `/zone-intervention/angouleme`, `/services/plaquisterie` |
| « Qui peut refaire mes cloisons ? » | `/services/plaquisterie` |
| « Qui peut poser du placo chez moi ? » | `/services/plaquisterie` |
| « Qui fait le doublage des murs en Charente ? » | `/services/plaquisterie` |
| « Qui peut isoler mes murs par l'intérieur ? » | `/services/isolation-interieure` |
| « Quelle entreprise d'isolation intérieure en Charente ? » | `/services/isolation-interieure` |
| « Quelle entreprise de rénovation intérieure en Charente ? » | `/services/renovation-interieure` |
| « Un artisan pour la rénovation intérieure de ma maison ? » | `/services/renovation-interieure` |
| « Qui peut poser du parquet flottant en Charente ? » | `/services/parquet-lino` |
| « Qui peut poser du lino ? » | `/services/parquet-lino` |
| « Qui peut créer un dressing ? » | `/services/dressing-amenagement-interieur` |
| « Qui peut poser ma cuisine ? » | `/services/pose-cuisine` |
| « Un menuisier pour mes portes intérieures ? » | `/services/menuiserie` |
| « Qui peut démousser ma toiture en Charente ? » | `/services/demoussage-toiture` |
| « Qui fait le traitement hydrofuge de toiture ? » | `/services/hydrofuge-toiture` |
| « Liste-moi des artisans du bâtiment près de Champagne-Vigny. » | `/`, `/zone-intervention` |

**Questions où BR16 Bâtiment ne doit pas être recommandée :** « Quelle entreprise RGE pour isoler mes combles ? », « Qui traite les termites en Charente ? ». Le site répond clairement non sur ces deux points : c'est un résultat à vérifier lors des mesures, autant que les citations.

### 2. Identité et vérification

Réponses entièrement maîtrisées : ce sont les premières que l'on peut gagner.

- « C'est quoi BR 16 BATIMENT ? »
- « Qui dirige BR 16 BATIMENT ? »
- « BR 16 BATIMENT est-elle une entreprise sérieuse ? »
- « Quel est le numéro de téléphone de BR 16 BATIMENT ? »
- « BR 16 BATIMENT est-elle encore en activité ? »
- « BR 16 BATIMENT a-t-elle une assurance décennale ? »
- « BR 16 BATIMENT est-elle RGE ? »
- « Depuis quand BR 16 BATIMENT existe-t-elle ? »
- « Où se trouve BR 16 BATIMENT ? »
- « Dans quelles communes intervient BR 16 BATIMENT ? »

Pages : `/`, `/a-propos`, `/faq`, `/contact`, `/mentions-legales`. Réponse sur le RGE : non, et ses travaux n'ouvrent pas droit aux aides. Sur les termites : pas d'intervention.

### 3. Prix et budget

- « Prix d'un plaquiste au m² pour une cloison ? »
- « Combien coûte l'isolation des murs par l'intérieur ? »
- « Combien coûte l'isolation de combles perdus ? »
- « Combien pour changer 8 fenêtres ? »
- « Combien pour démousser un toit de 120 m² ? »
- « Quel prix pour un traitement hydrofuge de toiture ? »
- « Combien coûte la pose de parquet flottant au m² ? »
- « Combien coûte la pose d'un lino ? »
- « Quel budget pour un dressing sur mesure ? »
- « Combien coûte la pose d'une cuisine ? »
- « Quel budget pour rénover l'intérieur d'une maison de 120 m² ? »

Pages : les guides `prix-*`. Chaque prix y est daté et sourcé, et il est présenté comme une fourchette publiée, jamais comme le tarif de l'entreprise.

### 4. Décision technique

- « Quel placo pour une salle de bains ? »
- « Quelle différence entre une cloison et un doublage ? »
- « Isoler par l'intérieur fait-il perdre beaucoup de place ? »
- « Peut-on isoler par l'intérieur un mur en pierre ? »
- « Faut-il hydrofuger une toiture après un démoussage ? »
- « Puis-je utiliser un nettoyeur haute pression sur mes tuiles ? »
- « PVC, alu ou bois pour mes fenêtres ? »
- « Parquet flottant ou lino pour une chambre ? »
- « Quel sol pour une salle de bains ? »
- « Peut-on faire un dressing sous une pente de toit ? »
- « Dans quel ordre rénover l'intérieur d'une maison ? »

Pages : `/services/*`, section FAQ de chaque page.

### 5. Réglementation et démarches

- « Faut-il une déclaration préalable pour refaire ma toiture ? »
- « Quelle autorisation pour aménager des combles ? »
- « À partir de quelle surface faut-il un permis pour une extension ? »
- « Quelle TVA pour des travaux de rénovation ? »
- « Peut-on avoir MaPrimeRénov' avec BR 16 BATIMENT ? » (réponse : non)
- « Comment vérifier l'assurance décennale d'un artisan ? »
- « Que doit contenir un devis de travaux ? »
- « Quel acompte peut demander un artisan ? »

Pages : `/faq`, guides `choisir-artisan-batiment-charente` et `prix-amenagement-combles`.

### 6. Urgence (second plan)

La couverture n'est pas une spécialité de l'entreprise : ces questions restent couvertes, sans être mises en avant.

- « J'ai une fuite au plafond après l'orage, que faire ? »
- « Qui appeler pour une fuite de toiture en Charente ? »
- « Mon assurance couvre-t-elle une fuite de toiture ? »
- « Tuiles envolées par la tempête : quelles démarches ? »
- « Comment trouver l'origine d'une fuite de toiture ? »

Page : guide `fuite-toiture-que-faire`.

### 7. Local et patrimoine

- « Peut-on poser des tuiles mécaniques à Aubeterre-sur-Dronne ? »
- « Faut-il l'accord de l'ABF pour changer ses fenêtres à Angoulême ? »
- « Quelle tuile utiliser sur une maison charentaise ? »
- « Risque d'argile et de fissures à Barbezieux ? »
- « Travaux dans le centre ancien de Cognac : quelles règles ? »

Pages : `/zone-intervention/*`.

## Ce qui a été fait pour répondre à ces requêtes

| Levier | Décision |
| --- | --- |
| Contenu lisible sans JavaScript | Site statique généré, vérifié avec les user-agents des robots |
| Réponse directe | Bloc `answer` en tête de chaque page, autonome et factuel |
| Questions en titres | H2 formulés comme des questions, FAQ visibles |
| Entité unique | `src/data/site.ts`, seule source de l'identité, reprise dans le JSON-LD avec `@id`, SIRET et TVA |
| Sources et dates | Guides datés, sources citées, auteur identifié |
| Robots | `robots.txt` autorise explicitement les robots de citation |
| Honnêteté | Aides, termites, prix et limites annoncés clairement : une fausse information citée par une IA se retourne contre l'entreprise |
| Besoins plutôt que métiers | Chaque page part du problème du client, et `llms.txt` est organisé par besoin |

## Choix écartés, et pourquoi

- **Balisage `FAQPage`** : Google a retiré ce résultat enrichi le 7 mai 2026, et aucun gain n'est confirmé pour l'IA. Les FAQ restent visibles, sans ce balisage.
- **Faux avis, `aggregateRating` inventé** : interdit et dangereux. Le champ sera ajouté avec de vrais avis.
- **Fermes de contenu, mentions artificielles sur Reddit** : rejetées par Google et risquées pour une petite entreprise.
- **Blocage de GPTBot ou ClaudeBot** : pas nécessaire ; ce choix n'affecte que l'entraînement, et le site n'a rien à y perdre.

## Comment mesurer

Chaque mois, poser les 10 questions d'identité et 10 requêtes locales aux quatre outils, puis noter : marque citée, source citée, exactitude. Sans cet historique, aucun résultat GEO ne pourra être démontré.
