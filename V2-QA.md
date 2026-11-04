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
