# Ecxo Releases

Un site Vue 3 + Vite pour lister et distribuer les releases Ecxo Games.

## Pages
- Accueil (/) — liste les « featured » depuis `src/assets/json/releases.json`.
- Recherche (/search) — recherche globale dans les pages modulaires (JSON) et les pages hardcodées.
- Créateur (/creator) — un outil pour générer l’objet JSON d’une release modulaire à coller dans `releases.json`.
- Exemple hardcodé (/release/example) — une page libre pour démontrer la personnalisation.
- Page modulaire (/r/:slug) — rendu d’une release provenant du JSON.

## Ajouter une release modulaire
1. Ouvrez `/creator` et remplissez le formulaire (titre, description, sections…).
2. Copiez l’objet JSON généré.
3. Collez-le dans `src/assets/json/releases.json` dans la section voulue: `featured`, `ecxogames_exclusive` ou `all`.
4. Assurez-vous que chaque entrée a un `slug` unique.

## Ajouter une page hardcodée
1. Dupliquez `src/components/release-pages/hardcoded/HardcodedReleasePageExample.vue` et adaptez librement.
2. Ajoutez une route dans `src/router/index.ts` (par ex. `/release/mon-produit`).
3. Optionnel: indexez-la dans `Search.vue` (tableau `hardcoded`) pour qu’elle apparaisse dans la recherche.

## Thème
- Accent couleur bleu (classes Tailwind `bg-blue-600`, `text-blue-700`, etc.).
- Mise en page simple avec navbar et footer dans `src/App.vue`.

## Démarrer en local
- Installer les dépendances: `npm install`
- Lancer le serveur dev: `npm run dev`
- Vérifier les types: `npm run type-check`
- Build production: `npm run build`

Note: Vite requiert Node.js 20.19+ ou 22.12+. Si votre build affiche un avertissement de version, mettez à jour Node.

## Structure
- `src/views/Landing.vue` — Accueil (featured)
- `src/views/Search.vue` — Recherche
- `src/views/Creator.vue` — Générateur de JSON
- `src/components/release-pages/modular/ModularReleasePage.vue` — Rendu d’une release modulaire
- `src/components/release-pages/hardcoded/HardcodedReleasePageExample.vue` — Exemple hardcodé
- `src/router/index.ts` — Routes
- `src/assets/json/releases.json` — Données des releases
