# 📚 Documentation du projet CRUD avec Swagger et Tests E2E Selenium

---

## 1. Description du projet

Ce projet est une application CRUD simple en **Node.js** utilisant **Express** pour l'API et une interface HTML pour la gestion des utilisateurs.  
Le projet intègre aussi :

- La documentation API avec **Swagger**.
- Des tests end-to-end (E2E) automatisés avec **Selenium WebDriver** en Node.js.

---

## 2. Prérequis

- Node.js (version 14+ recommandée)  
- npm (fourni avec Node.js)  
- Navigateur Chrome (pour Selenium)  
- ChromeDriver compatible avec ta version de Chrome (géré automatiquement via npm `chromedriver`)

---

## 3. Installation des dépendances

Dans le dossier racine du projet (`crud-app`), lance ces commandes :

```bash
# Installer les dépendances backend (Express, body-parser, swagger)
npm install express body-parser swagger-ui-express swagger-jsdoc
```

## 4. Struture des fichiers 
```bash
crud-app/
│
├─ public/
│ └─ index.html # Interface utilisateur HTML
│
├─ server.js # Serveur Express avec API CRUD et Swagger
├─ swagger.js # Configuration Swagger
├─ test-e2e.js # Script de test E2E Selenium
├─ users.json # Fichier de stockage JSON des utilisateurs
├─ package.json
└─ ...
```

---

## 5. Swagger : documentation API

Swagger est un outil qui génère automatiquement une documentation interactive de ton API REST à partir de définitions.

- La configuration Swagger est dans `swagger.js`.
- Le serveur Express sert la documentation à l’URL `/swagger`.
- Tu peux tester les routes directement via l’interface Swagger UI dans ton navigateur.

---

## 6. Selenium : tests end-to-end (E2E)

Selenium automatise un navigateur pour simuler un utilisateur réel.

- Le script `test-e2e.js` ouvre Chrome, ajoute un utilisateur via le formulaire HTML et vérifie sa présence dans le tableau.
- Permet de valider que toute l’application fonctionne correctement de bout en bout.

---

## 7. Comment tout lancer ?

### 7.1 Démarrer le serveur

```bash
node server.js
```
Serveur accessible sur http://localhost:3000

### 7.2 Ouvrir l'interface utilisateur
Navigue vers http://localhost:3000

### 7.3 consulter la documentation Swagger
Naviguer vers http://localhost:3000/swagger

### 7.4 Lancer le test selenium
