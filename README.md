# ITS PROS — Site web

Site vitrine pour **ITS PROS**, entreprise de chauffage, climatisation et plomberie basée à Brignoles & Saint-Maximin-la-Sainte-Baume (Var, France). Installateur certifié RGE Qualipac, intervention dans le Var, les Bouches-du-Rhône et les Alpes-Maritimes.

🔗 **Site en ligne :** [its-pros.com](https://its-pros.com)

---

## Aperçu

Refonte complète du site existant : nouvelle identité visuelle construite autour du logo de l'entreprise, formulaire de contact fonctionnel, galerie de réalisations, données structurées pour le référencement local, et une politique de sécurité de contenu (CSP) restrictive.

## Stack

Aucune dépendance, aucun build. HTML / CSS / JavaScript statiques.

```
its-pros-site/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── img/          → logo, favicon, photos du service "Froid commercial"
├── pics/         → photos de la galerie "Réalisations"
├── robots.txt
└── sitemap.xml
```

## Fonctionnalités

- **Formulaire de contact** fonctionnel via [FormSubmit](https://formsubmit.co), avec protection anti-spam (honeypot)
- **Galerie** avec affichage progressif plutôt que de tout charger d'un coup
- **Référencement local** : données structurées `schema.org/HVACBusiness`, Open Graph, `sitemap.xml`, `robots.txt`
- **Content-Security-Policy** restrictive — n'autorise que les domaines réellement utilisés par le site
- Design responsive, sans framework JavaScript

## Lancer en local

```bash
python3 -m http.server 8000
```
puis ouvrir `http://localhost:8000`. Fonctionne aussi en ouvrant `index.html` directement, sans serveur.

## Déploiement

Hébergé sur [Netlify](https://netlify.com), déployé automatiquement depuis la branche `main` de ce dépôt.

## Auteur

Site conçu et développé par Fouad ([@Fouad-dev101](https://github.com/Fouad-dev101)).
