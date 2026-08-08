# ITS PROS — site web

Site vitrine pour ITS PROS, entreprise de chauffage / climatisation / plomberie basée à Brignoles & Saint-Maximin-la-Sainte-Baume (Var, France).

🔗 **Site en ligne :** [its-pros.com](https://its-pros.com)

---

## Stack

Aucune dépendance, aucun build. Juste du HTML / CSS / JS statique.

```
its-pros-site/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── img/          → logo, favicon, photos "Froid commercial" (pic1.jpg à pic6.jpg)
├── pics/         → photos de la galerie "Réalisations" (im1.jpg à im10.jpg)
├── robots.txt
├── sitemap.xml
└── README.md
```

## Lancer en local

**Rapide :** double-clique sur `index.html`.

**Recommandé** (évite quelques comportements bizarres liés au protocole `file://`, notamment sur le formulaire et la carte) :
```bash
cd its-pros-site
python3 -m http.server 8000
```
puis ouvre `http://localhost:8000`.

Sans Python : extension **Live Server** sur VS Code → clic droit sur `index.html` → *Open with Live Server*.

## Déploiement

Le site est hébergé sur **Netlify**, connecté à ce dépôt GitHub — un `git push` sur `main` redéploie automatiquement. Pas de commande de build à configurer côté Netlify (site statique, dossier de publication = racine).

Domaine `its-pros.com` pointé vers Netlify via les DNS. Certificat HTTPS géré automatiquement par Netlify (Let's Encrypt).

## Fonctionnalités

- **Formulaire de contact fonctionnel** via [FormSubmit.co](https://formsubmit.co) (pas de backend à héberger). Envoie vers l'adresse configurée dans `index.html` (chercher `formsubmit.co/ajax/`). Honeypot anti-spam inclus.
- **Galerie** avec affichage progressif ("Voir plus") pour ne pas charger 69 photos d'un coup.
- **Données structurées SEO** (JSON-LD `HVACBusiness`, Open Graph, `robots.txt` + `sitemap.xml`) — voir section SEO plus bas.
- **Content-Security-Policy** restrictive (balise meta) — n'autorise que les domaines réellement utilisés (Google Fonts, FormSubmit, Google Maps, CDN photo).
- Responsive, sans framework JS.

## Photos à fournir

Ces emplacements affichent une icône d'image cassée tant que les fichiers ne sont pas présents (comportement normal, rien à modifier dans le code) :

| Emplacement | Fichiers attendus |
|---|---|
| Service "Froid commercial" | `img/pic1.jpg` → `img/pic6.jpg` |
| Section "Réalisations" | `pics/im1.jpg` → `pics/im10.jpg` |

## SEO

- Balises Open Graph / Twitter Card (aperçu propre sur WhatsApp, Facebook, LinkedIn)
- JSON-LD `schema.org/HVACBusiness` — aide Google à comprendre qu'il s'agit d'une entreprise locale (nom, téléphone, zone desservie)
- `robots.txt` + `sitemap.xml` à la racine
- `<link rel="canonical">` vers `https://its-pros.com/`

⚠️ Si le bloc JSON-LD (`<script type="application/ld+json">` dans le `<head>`) est modifié, le hash de sécurité dans la CSP doit être recalculé, sinon le navigateur bloquera silencieusement ce script.

Avoir les bonnes balises ne suffit pas à apparaître sur Google — il faut aussi soumettre le site via [Google Search Console](https://search.google.com/search-console) (ajouter la propriété, soumettre `sitemap.xml`, demander l'indexation) et créer une fiche **Google Business Profile**, plus déterminante que le site lui-même pour une recherche locale.

## À vérifier / reste à faire

- [ ] Confirmer que le formulaire de contact a bien été activé (premier envoi → e-mail de confirmation FormSubmit → cliquer "Activate form")
- [ ] Déposer les photos manquantes (voir tableau ci-dessus)
- [ ] Migrer les 59 photos historiques encore hébergées sur l'ancien CDN (`primary.jwwb.nl`) vers un hébergement propre — ça marche tant que l'ancien site reste en ligne, mais c'est une dépendance externe fragile
- [ ] Soumettre le site à Google Search Console + créer la fiche Google Business Profile
