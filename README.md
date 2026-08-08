# ITS PROS — refonte (maquette)

Structure du projet :

```
its-pros-site/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
└── README.md
```

## Lancer le site en local

Pas besoin d'installer quoi que ce soit de spécial (pas de build, pas de framework).

**Option la plus simple :** double-clique sur `index.html`, il s'ouvre directement dans ton navigateur.

**Option recommandée (évite certains soucis d'affichage avec les polices/images) :**

Si tu as Python installé (souvent déjà le cas) :
```bash
cd its-pros-site
python3 -m http.server 8000
```
Puis ouvre `http://localhost:8000` dans ton navigateur.

Si tu as VS Code : installe l'extension **Live Server**, clic droit sur `index.html` → "Open with Live Server".

## Ce qui est réel vs. ce qui reste à faire

- Toutes les infos (services, téléphone, e-mail, villes, badge RGE, photos de chantiers) viennent du site actuel — rien n'a été inventé.
- Les photos de la galerie sont chargées depuis le CDN du site actuel (`primary.jwwb.nl`) le temps du concept — à héberger toi-même une fois validé.
- Le formulaire de contact (`#contact`) envoie maintenant réellement les messages, via **FormSubmit.co** (gratuit, sans backend à héberger). ⚠️ Étape obligatoire avant que ça marche : la toute première fois qu'un message est envoyé à `contact@its-pros.com`, FormSubmit envoie un e-mail de confirmation à cette adresse — il faut cliquer sur "Activate form" dans cet e-mail une seule fois. Après ça, tous les messages suivants arrivent normalement dans la boîte mail.
  - Si `contact@its-pros.com` n'est pas (ou plus) une adresse que vous surveillez, changez-la dans `index.html` : cherchez `formsubmit.co/ajax/contact@its-pros.com` et remplacez par la bonne adresse.
  - Testez une fois vous-même avant de livrer au client, pour être sûr que le mail arrive bien.
- La carte est un simple embed Google Maps centré sur Brignoles.

## Sécurité — ce qui a été ajouté

- **Content-Security-Policy** (balise meta dans `<head>`) : n'autorise le chargement de scripts/styles/images/connexions que depuis les domaines réellement utilisés (Google Fonts, le CDN photo actuel, FormSubmit, Google Maps). Bloque toute injection de script externe non prévue.
- **`rel="noopener noreferrer"`** sur tous les liens qui s'ouvrent dans un nouvel onglet (galerie, WhatsApp) — empêche la page ouverte d'accéder à `window.opener` et ne transmet pas l'URL d'origine.
- **Honeypot anti-spam** sur le formulaire (`_honey`) — champ invisible pour un humain, presque toujours rempli par un robot.
- **Limites de longueur (`maxlength`)** sur tous les champs du formulaire, en plus de la validation `required`/`type=email` déjà en place.
- J'ai retiré le lien Instagram (`its_proscvc`) : c'était un identifiant que j'avais inventé sans le vérifier, pas une vraie info du client. Un bouton qui pointe vers un mauvais compte n'est pas vraiment "fonctionnel" — donne-moi le vrai identifiant Instagram et je le réintègre.

**Ce qu'une balise `<meta>` ne peut pas faire**, et qu'il faudra configurer côté hébergeur au moment de la mise en ligne (Netlify, OVH, Vercel...) :
- Forcer HTTPS strictement (en-tête `Strict-Transport-Security`)
- Empêcher l'affichage du site dans une `<iframe>` externe (`X-Frame-Options`)
- Empêcher le navigateur de deviner le type d'un fichier (`X-Content-Type-Options: nosniff`)

La plupart des hébergeurs statiques modernes (Netlify, Vercel) activent une partie de ça par défaut — je peux te donner la config exacte une fois que tu as choisi où héberger.

## Checklist avant de livrer à un vrai client

- [ ] Activer le formulaire (voir ci-dessus) et faire un vrai test d'envoi
- [ ] Me donner le vrai identifiant Instagram (ou dire s'il n'y en a pas) pour remettre le bouton
- [ ] Remplacer les photos de galerie hébergées sur l'ancien CDN (`primary.jwwb.nl`) par des copies hébergées chez vous — actuellement le site "emprunte" les images depuis l'ancien site, ce qui marche tant que celui-ci reste en ligne, mais n'est pas fiable à long terme
- [ ] Acheter un nom de domaine + un hébergement (n'importe quel hébergeur statique fonctionne : OVH, Netlify, Vercel, etc. — pas besoin de PHP/base de données)
- [ ] Vérifier l'affichage sur un vrai téléphone (pas juste la fenêtre réduite du navigateur)
- [ ] Remplacer/valider le numéro de téléphone, l'e-mail et les villes desservies avec le client

## Prochaine étape

Une fois que tu as regardé ça chez toi, dis-moi ce qui te plaît / pas, et on ajuste — couleurs, structure, contenu, ou on part sur autre chose.

## Dossiers photos à remplir

- `img/pic1.jpg` à `img/pic6.jpg` — photos du service "Froid commercial"
- `pics/im1.jpg` à `pics/im10.jpg` — photos de la section "Réalisations" (galerie)

Tant qu'un fichier n'est pas présent, son emplacement affiche une icône d'image cassée — normal, rien à modifier dans le code une fois les fichiers ajoutés avec les bons noms.
