# Inventaire GEO : ce qu'on demande à ChatGPT, Claude, Gemini et Perplexity

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

- « Quel couvreur recommandes-tu près d'Angoulême ? »
- « Trouve-moi un charpentier sérieux en Charente. »
- « Quel artisan pour refaire ma toiture à Barbezieux ? »
- « Qui peut aménager mes combles dans le sud de la Charente ? »
- « Un plaquiste disponible autour de Cognac ? »
- « Quelle entreprise fait à la fois la charpente et la couverture en Charente ? »
- « Liste-moi des artisans du bâtiment près de Champagne-Vigny. »
- « Meilleur couvreur à Angoulême, avec des avis. »
- « Un artisan qui démousse les toitures près de Jarnac ? »
- « Je cherche quelqu'un pour une extension en bois à Châteauneuf-sur-Charente. »

Pages : `/`, `/services/*`, `/zone-intervention/*`.

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

Pages : `/`, `/a-propos`, `/faq`, `/contact`, `/mentions-legales`. Réponse honnête sur le RGE : non référencée à ce jour.

### 3. Prix et budget

- « Combien coûte une réfection de toiture de 100 m² en Charente ? »
- « Quel prix pour une charpente traditionnelle au m² ? »
- « Combien pour démousser un toit de 120 m² ? »
- « Quel budget pour aménager 40 m² de combles ? »
- « Quel est le prix d'une extension en ossature bois de 30 m² ? »
- « Combien coûte l'isolation de combles perdus ? »
- « Prix d'un plaquiste au m² pour une cloison ? »
- « Combien pour changer 8 fenêtres ? »
- « Quel budget pour rénover une maison ancienne de 120 m² ? »
- « Ce devis de toiture est-il trop cher ? »

Pages : les guides `prix-*`. Chaque prix y est daté et sourcé, et il est présenté comme une fourchette publiée, jamais comme le tarif de l'entreprise.

### 4. Décision technique

- « Charpente traditionnelle ou fermettes : que choisir ? »
- « Faut-il hydrofuger une toiture après un démoussage ? »
- « Puis-je utiliser un nettoyeur haute pression sur mes tuiles ? »
- « Mes combles sont-ils aménageables avec 1,80 m de hauteur ? »
- « Peut-on aménager des combles avec des fermettes ? »
- « PVC, alu ou bois pour mes fenêtres ? »
- « Quelle essence pour un bardage en Charente ? »
- « Quel isolant pour des rampants ? »
- « Quel placo pour une salle de bains ? »
- « Dans quel ordre rénover une maison ? »

Pages : `/services/*`, section FAQ de chaque page.

### 5. Réglementation et démarches

- « Faut-il une déclaration préalable pour refaire ma toiture ? »
- « Quelle autorisation pour aménager des combles ? »
- « À partir de quelle surface faut-il un permis pour une extension ? »
- « Le traitement des termites est-il obligatoire en Charente ? »
- « Quelle TVA pour des travaux de rénovation ? »
- « Quelles aides pour la rénovation en 2026 ? »
- « Peut-on avoir MaPrimeRénov' sans artisan RGE ? »
- « Comment vérifier l'assurance décennale d'un artisan ? »
- « Que doit contenir un devis de travaux ? »
- « Quel acompte peut demander un artisan ? »

Pages : guides `aides-renovation-2026`, `choisir-artisan-batiment-charente`, `traitement-charpente-termites-charente`, `prix-amenagement-combles`.

### 6. Urgence

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
| Honnêteté | RGE, prix et limites annoncés clairement : une fausse information citée par une IA se retourne contre l'entreprise |

## Choix écartés, et pourquoi

- **Balisage `FAQPage`** : Google a retiré ce résultat enrichi le 7 mai 2026, et aucun gain n'est confirmé pour l'IA. Les FAQ restent visibles, sans ce balisage.
- **Faux avis, `aggregateRating` inventé** : interdit et dangereux. Le champ sera ajouté avec de vrais avis.
- **Fermes de contenu, mentions artificielles sur Reddit** : rejetées par Google et risquées pour une petite entreprise.
- **Blocage de GPTBot ou ClaudeBot** : pas nécessaire ; ce choix n'affecte que l'entraînement, et le site n'a rien à y perdre.

## Comment mesurer, une fois le certificat réparé

Chaque mois, poser les 10 questions d'identité et 10 requêtes locales aux quatre outils, puis noter : marque citée, source citée, exactitude. Sans cet historique, aucun résultat GEO ne pourra être démontré.
