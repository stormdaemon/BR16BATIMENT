# 🤖 PROTOCOLE OPÉRATIONNEL IA "WINDSURF" — REACT 19

**Version:** 3.0
**Statut:** ACTIF
**Scope:** Tous les projets basés sur React 19

---

## PARTIE 1 : DIRECTIVES D'EXÉCUTION DU CODE

Cette section constitue mon firmware. Je ne dévie sous aucun prétexte de ces règles lors de la génération ou de la modification de code.

### 1.1. Philosophie & Architecture

*   **Composants Fonctionnels Exclusifs** : 100% de ma production de composants se fera via des fonctions JavaScript. Les composants de classe sont proscrits.
*   **Immutabilité Stricte** : Les états et les props sont considérés comme immuables. Je n'effectue jamais de mutation directe (`state.key = value`, `props.key = value`). Je génère toujours un nouvel objet ou un nouveau tableau.
*   **Flux de Données Unidirectionnel** : Le state descend, les événements remontent. Ce principe est non-négociable.
*   **Séparation des Responsabilités (SoC)** :
    *   **Logique Métier** -> Hooks custom (`use...`)
    *   **Interactions API** -> Modules dédiés (`/src/services/...`)
    *   **Affichage (UI)** -> Composants JSX "purs"
    *   **Définition des Styles** -> Fichiers CSS Modules ou solution CSS-in-JS. Les styles en ligne (`style={{...}}`) sont limités aux cas dynamiques qui le justifient impérativement.
*   **Distinction Client/Serveur (React 19)** :
    *   Par défaut, tout composant est un **Server Component**.
    *   La directive `"use client";` est ajoutée en tête de fichier **uniquement et seulement si** le composant utilise des Hooks qui nécessitent une interaction côté client (`useState`, `useEffect`, `useReducer`, etc.) ou accède à des API navigateur (ex: `window`).

### 1.2. Standards de Codage

*   **TypeScript d'Abord** : Je privilégie TypeScript. Toutes les props, les valeurs de retour de fonctions et les états complexes sont typés. En l'absence de TypeScript, `PropTypes` est obligatoire.
*   **ESLint & Prettier** : Je me conforme à 100% aux règles définies dans les fichiers `.eslintrc` et `.prettierrc` du projet. Aucun code n'est produit sans être validé par ces outils.
*   **Nommage Canonique** :
    *   Composants : `PascalCase` (`<DataGrid />`, `UserProfile.tsx`)
    *   Hooks : `useCamelCase` (`useFetchData`, `useLocalStorage.ts`)
    *   Variables, Fonctions : `camelCase`
    *   Constantes : `UPPER_SNAKE_CASE` (`API_BASE_URL`)
*   **Structure de Fichiers** : Chaque composant est dans son propre dossier.
    ```
    /src/components/ui/Button/
    |-- Button.tsx         # Logique et JSX du composant
    |-- Button.module.css  # Styles CSS scopés
    |-- index.ts           # Fichier d'export (export { Button } from './Button';)
    ```

### 1.3. Hiérarchie d'Utilisation des APIs React

J'utilise les APIs React selon une hiérarchie de complexité croissante :

1.  **Gestion d'État Local** :
    *   **`useState`** : Pour les états primitifs (booléen, chaîne, nombre) et les objets/tableaux simples.
    *   **`useReducer`** : Pour les états complexes où le prochain état dépend du précédent, ou quand plusieurs actions modifient l'état.
2.  **Gestion des Actions et Formulaires** :
    *   **`useActionState`** : Mon choix **par défaut** pour gérer les soumissions de formulaire et les actions asynchrones, afin de gérer nativement les états `pending`, `error`, et la réponse.
    *   **`useOptimistic`** : Utilisé en conjonction avec des actions pour fournir un retour UI immédiat avant la confirmation du serveur.
3.  **Partage de Données (Dependency Injection)** :
    *   **Composition (prop `children`)** : La méthode préférée pour passer des éléments UI à travers l'arbre sans "prop drilling".
    *   **`useContext` (via `use`)** : Uniquement pour les données globales qui changent peu fréquemment (thème, session utilisateur, langue). J'utilise le hook `use()` pour lire la valeur.
4.  **Effets de Bord** :
    *   **`useEffect`** : Utilisé en dernier recours, pour les synchronisations avec des systèmes externes (API du DOM, abonnements, timers). Son tableau de dépendances est **toujours** exhaustif et sa fonction de nettoyage est systématiquement implémentée si nécessaire.
5.  **Optimisation de Performance** :
    *   **`React.memo`** : Appliqué aux composants qui re-rendent souvent avec les mêmes props et dont le rendu est coûteux.
    *   **`useCallback`** : Pour stabiliser les fonctions passées en props à des composants mémoïsés.
    *   **`useMemo`** : Pour mémoïser des calculs coûteux.
    *   **Code Splitting (`React.lazy` et `<Suspense>`)** : Appliqué au niveau des routes ou pour des composants lourds non essentiels au premier rendu.

---

## PARTIE 2 : PROTOCOLE D'ACCÈS À LA DOCUMENTATION

Cette section définit mon unique méthode pour obtenir de l'information. Ma source de vérité est le contenu du dossier `/react-doc`, qui est un clone du dépôt de la documentation officielle de React. Toute recherche est un accès direct à un fichier. **Je ne fais aucune supposition.**

### 2.1. Mapping API React -> Fichier de Documentation

Quand je rencontre une API React, j'accède directement au fichier correspondant dans `/react-doc` pour consulter sa définition, ses cas d'usage et ses limitations.

#### **Hooks Fondamentaux**
*   **`useState`**: `/react-doc/src/content/reference/react/useState.md`
*   **`useEffect`**: `/react-doc/src/content/reference/react/useEffect.md`
*   **`useContext`**: `/react-doc/src/content/reference/react/useContext.md`
*   **`useReducer`**: `/react-doc/src/content/reference/react/useReducer.md`
*   **`useRef`**: `/react-doc/src/content/reference/react/useRef.md`

#### **Hooks de React 19 et Actions**
*   **`use`**: `/react-doc/src/content/reference/react/use.md`
*   **`useActionState`**: `/react-doc/src/content/reference/react/useActionState.md`
*   **`useOptimistic`**: `/react-doc/src/content/reference/react/useOptimistic.md`
*   **`useFormStatus`**: `/react-doc/src/content/reference/react/useFormStatus.md`

#### **Hooks d'Optimisation**
*   **`useMemo`**: `/react-doc/src/content/reference/react/useMemo.md`
*   **`useCallback`**: `/react-doc/src/content/reference/react/useCallback.md`
*   **`useTransition`**: `/react-doc/src/content/reference/react/useTransition.md`
*   **`useDeferredValue`**: `/react-doc/src/content/reference/react/useDeferredValue.md`

#### **Composants Intégrés**
*   **`<Fragment>`**: `/react-doc/src/content/reference/react/Fragment.md`
*   **`<Suspense>`**: `/react-doc/src/content/reference/react/Suspense.md`
*   **`<StrictMode>`**: `/react-doc/src/content/reference/react/StrictMode.md`

#### **APIs d'Optimisation**
*   **`memo`**: `/react-doc/src/content/reference/react/memo.md`
*   **`lazy`**: `/react-doc/src/content/reference/react/lazy.md`

#### **Directives**
*   **`"use client"`**: `/react-doc/src/content/reference/react/use-client.md`
*   **`"use server"`**: `/react-doc/src/content/reference/react/use-server.md`

### 2.2. Protocole pour le Code Spécifique au Projet

Pour tout code qui n'est pas une API React standard (ex: `<CustomButton />`, `useAnalytics()`), je m'attends à trouver une documentation correspondante dans un dossier `/project-doc`.

*   **Composant** : Pour un composant `<DataTable />`, je consulterai `/project-doc/components/DataTable.md`.
*   **Hook** : Pour un hook `useAuth()`, je consulterai `/project-doc/hooks/useAuth.md`.
*   **Service** : Pour une fonction `fetchUserProfile()`, je consulterai `/project-doc/services/userAPI.md`.

### 2.3. Gestion des Échecs de Recherche

*   **Condition** : Si j'ai besoin d'informations sur une API (React ou projet) et que le fichier correspondant défini dans ce protocole n'existe pas ou est vide.
*   **Action** : J'arrête immédiatement mon travail sur la tâche en cours. Je produis un rapport d'erreur signalant :
    1.  Le nom de l'API ou du composant en question.
    2.  Le chemin exact du fichier de documentation manquant.
    3.  La déclaration explicite que je ne peux pas continuer sans cette information pour garantir la qualité et la conformité du code.

---
**FIN DU PROTOCOLE**