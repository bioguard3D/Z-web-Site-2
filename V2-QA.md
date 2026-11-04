# BIOGUARD 3D V2 — QA / prépublication

Branche de développement : `feature/v2-design-contact`. Ne pas fusionner sans validation.

## Contrôles reproductibles

1. Installer Node.js 20+.
2. Exécuter `node scripts/check-site.mjs` pour vérifier les liens locaux, fichiers manquants, ancres, titres, viewport, sitemap, logo et contacts.
3. Exécuter `node --check script.js` pour la syntaxe JavaScript.
4. Prévisualiser localement via `python -m http.server 8000`, puis ouvrir `http://localhost:8000`.

## Contrôles manuels indispensables

- Vérifier l'affichage à 360 px, 768 px et 1440 px, le menu mobile, les images, le contraste, le clavier et les liens.
- Tester Appeler, WhatsApp et e-mail sur téléphone réel. Un ordinateur ne peut pas garantir que l'appel aboutit.
- Vérifier les coordonnées, zones réellement desservies, prestations et formulations commerciales.
- Faire valider les mentions légales et la politique de confidentialité (champs encore à compléter).
- Confirmer l'autorisation d'utilisation de toute photographie avant ajout. L'illustration SVG actuelle est conceptuelle, pas une photo d'intervention.
- Vérifier la configuration Cloudflare Pages et une URL de prévisualisation, puis demander l'accord explicite avant fusion sur `main`.

## Politique de publication

Le site actuel reste intact tant que la PR n'est pas fusionnée. Une vérification de liens et de syntaxe ne remplace pas les tests visuels ou juridiques.


## Audit images et mentions légales — 4 novembre 2026

### Images et ressources : contrôles vérifiés dans le dépôt

- `logo.webp` présent (identité de marque conservée).
- `illustration-protection.svg` présente : illustration conceptuelle, **pas une photographie d'une intervention réelle**.
- `og-bioguard.jpg` présent (image de partage social), ainsi que les favicons.
- Le test Chromium a produit un artefact de captures pour les trois tailles d'écran et s'est terminé avec succès. **Les captures n'ont pas été inspectées visuellement par un humain dans cette revue** ; la réussite du test n'est pas une approbation esthétique.
- Les pages de services utilisent l'illustration conceptuelle. Il reste à décider si des photographies originales/autorisées sont nécessaires pour une présentation commerciale premium.

### Mentions légales : éléments constatés dans le code

- Nom commercial affiché : BIOGUARD 3D.
- Adresse affichée : APPT N°9, 2ème étage, Zankat Abdari, Avenue Hassan II, Rabat 10000, Maroc.
- Téléphone affiché : +212 675 311 317 ; e-mail : service.bioguard3d@gmail.com.
- **Non vérifiés avec des documents officiels** : dénomination sociale, forme juridique, adresse du siège, ICE, RC, identifiants fiscaux applicables et identité/coordonnées de l'hébergeur.
- La page de mentions légales contient une note interne demandant de ne pas la publier comme version finale : elle n'est donc **pas prête**.
- Politique de confidentialité : vérifier l'identité du responsable du traitement, les durées de conservation, la procédure d'exercice des droits, les éventuels sous-traitants/traceurs et les obligations CNDP pertinentes.
- `noindex` sur les deux pages juridiques **ne les rend pas privées** : elles restent accessibles à toute personne qui connaît l'URL.

### Décision

**Blocage de publication maintenu** jusqu'à confirmation des informations juridiques par les documents de l'entreprise et revue des captures. Ne pas confondre vérification de présence des fichiers et contrôle visuel, ni vérification du code et validation juridique.
