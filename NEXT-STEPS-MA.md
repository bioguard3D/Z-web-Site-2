# BIOGUARD 3D — prochaines étapes

## Ce qui est prêt dans ce dossier
- Site statique HTML/CSS/JS, sans abonnement WordPress ni base de données.
- Coordonnées et liens sociaux fournis par l'entreprise.
- Boutons WhatsApp avec message prérempli.
- Domaine corrigé vers https://bioguard3d.com/
- Sitemap, robots.txt, carte de partage et page 404.
- Image hero de démonstration générée pour la maquette.

## Important avant publication
1. Remplacer l'image de démonstration `images/hero-technician.png` par une photo réelle de l'équipe dès que possible. L'image générée ne doit pas être présentée comme une photographie de l'équipe BIOGUARD.
2. Compléter et faire vérifier `mentions-legales.html` avec les données juridiques exactes.
3. Vérifier `politique-de-confidentialite.html` au regard des outils réellement activés et des obligations applicables au Maroc.
4. Tester le site sur mobile et ordinateur, notamment les liens WhatsApp et le formulaire rapide.
5. Confirmer que le domaine `bioguard3d.com` est bien détenu et accessible depuis le compte du registrar.

## Déploiement simple avec Cloudflare Pages
Ce projet ne nécessite pas de build. Il peut être publié en Direct Upload :
1. Créer/ouvrir un compte Cloudflare.
2. Aller à Workers & Pages > Create application > Pages > Direct Upload.
3. Donner au projet le nom `bioguard3d`.
4. Déposer le contenu du dossier `bioguard3d` (ou le ZIP de déploiement).
5. Après le premier déploiement, ouvrir le projet > Custom domains > Set up a domain et ajouter `bioguard3d.com`.
6. Pour un domaine racine, Cloudflare demande d'ajouter le domaine comme zone et de configurer les nameservers chez le registrar. Ne change les nameservers qu'après avoir relevé et sauvegardé les enregistrements DNS existants (e-mail notamment).

Attention : Cloudflare indique qu'un projet Pages créé en Direct Upload ne peut pas être converti ensuite en projet Git integration. Pour cette première version simple, Direct Upload est le chemin le plus facile. Si l'on souhaite plus tard des déploiements automatiques depuis GitHub, on pourra créer un projet Git-integrated séparé.

## Hébergeur et e-mail
Ne supprime aucun enregistrement DNS existant sans vérifier s'il sert à l'e-mail professionnel. Changer les nameservers ne signifie pas acheter un nouvel hébergement e-mail.
