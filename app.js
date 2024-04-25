const express = require('express');
const bookRoutes = require('./Routes/bookRoutes');

const app = express();
const PORT = 3000;


app.get('/bienvenue', (req, res) => {
    res.send('<h1>Bienvenue sur notre site Web !</h1>');
});

app.get('/info', (req, res) => {
    const fakeInfo = {
        nom: 'Antoine Leconte',
        age: 29,
        ville: 'Valenciennes'
    };
    res.json(fakeInfo);
});

app.get('/acces-interdit', (req, res) => {
    res.status(403).send('Accès interdit');
});

app.get('/redirection-accueil', (req, res) => {
    res.redirect('/');
});

app.use('/', bookRoutes);

app.listen(PORT, () => {
    console.log(`Le serveur écoute sur le port ${PORT}`);
});
