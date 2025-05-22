const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { swaggerUi, swaggerSpec } = require('./swagger');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());

// Swagger route
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const DATA_FILE = path.join(__dirname, 'users.json');

function getUsers() {
    if (!fs.existsSync(DATA_FILE)) return [];
    return JSON.parse(fs.readFileSync(DATA_FILE));
}

function saveUsers(users) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));
}

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Récupérer tous les utilisateurs
 *     responses:
 *       200:
 *         description: Liste des utilisateurs
 */
app.get('/api/users', (req, res) => {
    res.json(getUsers());
});

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Ajouter un utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Utilisateur ajouté
 */
app.post('/api/users', (req, res) => {
    const users = getUsers();
    const newUser = {
        id: Date.now(),
        username: req.body.username,
        email: req.body.email,
    };
    users.push(newUser);
    saveUsers(users);
    res.json(newUser);
});

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Modifier un utilisateur
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Utilisateur modifié
 *       404:
 *         description: Utilisateur non trouvé
 */
app.put('/api/users/:id', (req, res) => {
    const users = getUsers();
    const id = Number(req.params.id);
    const index = users.findIndex(u => u.id === id);
    if (index !== -1) {
        users[index] = { ...users[index], ...req.body };
        saveUsers(users);
        res.json(users[index]);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Supprimer un utilisateur
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Utilisateur supprimé
 */
app.delete('/api/users/:id', (req, res) => {
    let users = getUsers();
    users = users.filter(u => u.id !== Number(req.params.id));
    saveUsers(users);
    res.json({ success: true });
});

// Page HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
