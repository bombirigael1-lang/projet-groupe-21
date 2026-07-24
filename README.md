# MediRappel

MediRappel est une Application web d'aide au suivi des médicaments, pensée pour les seniors et leurs aidants. Elle permet de gérer une liste de médicaments, de suivre les prises du jour, de consulter un historique de suivi et de partager une vue simplifiée avec un proche aidant.

## Fonctionnalités

- **Accueil** — vue du jour : prises à venir, prochaine prise, rappels importants.
- **Mes médicaments** — ajout, modification et suppression des médicaments (nom, dosage, horaires de prise).
- **Calendrier / Rappels** — liste des prises du jour avec possibilité de les marquer comme effectuées, filtrables par statut (toutes / à venir / en retard / faites).
- **Suivi** — taux de conformité de la semaine, graphique des 7 derniers jours et historique détaillé des prises.
- **Espace aidant** — vue de synthèse destinée à un proche accompagnant (résumé des prises effectuées, à venir, en retard).

## Structure du projet

```
medirappel/
├── index.html          Page d'accueil
├── medicaments.html     Gestion des médicaments
├── calendrier.html      Rappels / prises du jour
├── suivi.html            Suivi hebdomadaire
├── aidant.html           Espace aidant
├── css/
│   └── style.css         Styles de l'application
├── js/
│   ├── storage.js        Lecture/écriture des données (localStorage)
│   ├── icons.js           Bibliothèque d'icônes SVG partagée
│   ├── accueil.js         Logique de la page d'accueil
│   ├── medicaments.js     Logique de la page médicaments
│   ├── calendrier.js      Logique de la page calendrier
│   ├── suivi.js           Logique de la page suivi
│   └── aidant.js          Logique de l'espace aidant
└── assets/
    └── icons/             Fichiers source des icônes SVG
```

## Technologies

- HTML / CSS / JavaScript natifs (aucun framework, aucune dépendance externe)
- Stockage des données en local via `localStorage` (avec repli en mémoire si indisponible)
- Icônes SVG intégrées, gérées par `js/icons.js` (fonction `icon('nom')` et attribut `data-icon`)

## Utilisation

Aucune installation n'est nécessaire : ouvrir `index.html` dans un navigateur suffit pour lancer l'application. Les données saisies (médicaments, prises effectuées) sont conservées localement dans le navigateur.

## Navigation

L'application comprend une barre latérale commune à toutes les pages, avec accès direct à : Accueil, Mes médicaments, Calendrier / Rappels, Suivi et Espace aidant.
