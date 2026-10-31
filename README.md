# BIOGUARD 3D — Site vitrine

Site statique HTML5 / CSS3 / JavaScript vanilla. Aucun framework, base de données ou build requis.

## Aperçu local
Ouvrir `index.html` dans un navigateur. Pour un test local complet :
`python3 -m http.server 8000`

## Structure
- `index.html` : page d'accueil
- `css/style.css` : styles responsive
- `js/script.js` : menu et liens WhatsApp
- `images/` : logo fourni, visuel hero de démonstration et carte Open Graph
- `robots.txt`, `sitemap.xml`, `404.html`
- `mentions-legales.html`, `politique-de-confidentialite.html`

## Configuration WhatsApp
Modifier `whatsappNumber` et `messageTemplate` dans `js/script.js` uniquement si les coordonnées changent.

## Domaine
Le domaine configuré dans les balises SEO, robots et sitemap est `https://bioguard3d.com/`.

## Publication
Consulter `NEXT-STEPS-MA.md` pour les étapes de publication sur Cloudflare Pages et les vérifications avant lancement.

## À valider avant publication publique
- Remplacer le visuel hero généré par une vraie photo de l'équipe dès qu'elle sera disponible.
- Compléter les mentions légales avec les informations juridiques officielles.
- Vérifier la politique de confidentialité selon les outils et traitements réellement activés.
