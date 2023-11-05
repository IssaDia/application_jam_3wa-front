# 🍓 Jam

Une application front React présentant un e-commerce de vente de pots de confiture

# 📜 Sommaire

- [Objectif](#-objectif)
- [Construit avec](#-construit-avec)
- [Mon environnement de code et mes outils](#-mon-environnement-de-code-et-mes-outils)
- [Pourquoi ce choix](#-pourquoi-ce-choix)
- [Le plus gros challenge du projet](#-le-plus-gros-challenge-du-projet)
- [Feedback](#-feedback)

- [Comment démarrer l'application](#-comment-démarrer-application)
- [Node Package Manager](#-node-package-manager)
- [Installer les packages](#-installer-les-packages)
- [Lancer l'application](#-rlancer-application)
- [Lancer les Tests](#-lancer-les-tests)
- [A améliorer](#-a-ameliorer)

## Objectif

_Construire une application front permettant de consommer l'api appartenant à ce [projet](https://github.com/IssaDia/application_jam_3wa-api)_


## 🏗 Construit avec

- [Vite](https://vitejs.dev/guide)
- [React](https://react.dev/)
- [Typescript](https://www.typescriptlang.org/fr/docs)
- [Tailwind css](https://tailwindcss.com/docs/installation)


## Mon environnement de code et mes outils

- VsCode
- MacOs
- NPM
- EsLint
- Prettier
- Postman

## Pourquoi ce choix?

L'utilisation de React pour consommer mon API est une décision réfléchie, motivée par plusieurs raisons. 

Tout d'abord, React est un framework JavaScript très puissant et polyvalent qui offre de nombreux avantages pour la création d'interfaces utilisateur dynamiques et réactives. Mon choix de React repose sur plusieurs points forts :

* Expérience préalable avec React
* Composants réutilisables
* Performances optimales
* Large écosystème
* Flexibilité
* Compatibilité avec API Rest

## Le plus gros challenge sur le projet

- Organiser les données récupérées depuis l'API et les faire transitionner dans les composants 


## Feedback

Bonne occasion de refaire un projet en utilisant React/Typescript

## 👨🏽‍💻 Comment démarrer l'application

### 📦 Node Package Manager

Pour installer les packages et exécuter cette application, vous aurez besoin de [Node Package Manager](https://docs.npmjs.com/) v14.18+, v16+

Pour vérifier si votre version de Node est correcte:

```
node --version
```

### 📥 Installer les packages

Pour installer tous les packages:

```
npm install ou npm i
```

### créer un fichier .env et fournir les différents accés

```
VITE_API_URL=http://localhost:8000/api
VITE_API_USERNAME=admin@admin.com
VITE_API_PASSWORD=ilovejam
VITE_API_TOKEN=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2OTgyMzY1NDAsImV4cCI6MTY5ODU5NjU0MCwicm9sZXMiOlsiUk9MRV9BRE1JTiIsIlJPTEVfVVNFUiJdLCJ1c2VybmFtZSI6ImFkbWluQGFkbWluLmNvbSJ9.UA6rtauPoJKERlGipD1l4dHR1dtGABI3WptCPftmJ1GYz3J-ou8dRatMbWr5cErtZfRpejd3GcMGFEjy2_ixWLCcoO3Mjyj7QR7E-T6Nj-kM9-DvYfXvZEDUHYK_-g-ryqSjcNKyxOBAHSa6JUPXQs7o405J7Hqv18k8ofOkp207N-SOxK8L9q534lSx90RwzhINRhPxwM8G3rPWtm_BYyJyD01MPFGbWN0Zr2ViZGF_CId8RVchjxLomHdppMjUzLPJDsN2JEpWVruwXIMF4YlQw7z4nOjHO58znDG9zxrUwSBYvVOmGj-FY2RSX6zbP_YkeKzh_9FWB_A3YWKXATD1tE6-VneOhDf9fkpNBcp-WD76gODaJBRpxP2QbC-90w6Rke2vF4D574XFp_nMeS3Rc0WPf6_e6NyVStwDFpJRLLGmiovcIOG4eAqb1BoEXMY_BUpXFfZROH4HKfdBqY6eGT-2IdKoa5G0RupuH3tQEw_xExi7IZpYmb18RnB0FvcWzXMQfklRRQzfSfvI8tcAMJsjEyd82DuNZSJ-tzwCDwQEiq0zIsIdONi4m47uwfJk9Q64VMbmZVg3SFkvVgQwfuRJSBdcBXK62b2jXNuFIAiDtI5yy3vkFUvXzpYimTv0byfqmX_12-EHpy_QsJfB_RNE7o50JOGGRdYDCp8
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
VITE_STRIPE_API_KEY=sk_test_...
```


### ♻️ Lancer l'application

Pour lancer l'application en mode développement:

go to /frontend folder then :

```
npm run dev
```

et aller sur : http://localhost:5173/
PS: peut nécessiter de relancer une fois la page 

### 🧪 Lancer les tests

Pour lancer les tests unitaires:

```
npm run unit:test
```

Pour lancer les tests fonctionnels:

```
npm run e2e:test
```

## 📑 A améliorer

- Améliorer la coordination entre les filtres
- Mise en place de Docker pour faciliter l'accés à l'application
- Ajouter plus de tests unitaires et fonctionnels
- Automatisation des tests avec les actions Github
