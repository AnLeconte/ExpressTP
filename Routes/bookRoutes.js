const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const livresJSONPath = path.join(__dirname, '..', 'data', 'livres.json');

router.get('/livres', (req, res) => {
    fs.readFile(livresJSONPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Erreur interne du serveur');
            return;
        }
        const livres = JSON.parse(data);
        res.json(livres);
    });
});

router.get('/livres/:id', (req, res) => {
    const livreId = req.params.id;
    fs.readFile(livresJSONPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Erreur interne du serveur');
            return;
        }
        const livres = JSON.parse(data);
        const livre = livres.find(l => l.id === parseInt(livreId));
        if (!livre) {
            res.status(404).send('Livre non trouvé');
            return;
        }
        res.json(livre);
    });
});

router.post('/ajout-livre', (req, res) => {
    res.send('Ajout d\'un nouveau livre');
});

router.get('/recherche-livre/auteur/:auteur', (req, res) => {
    const auteur = req.params.auteur;
    fs.readFile(livresJSONPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Erreur interne du serveur');
            return;
        }
        const livres = JSON.parse(data);
        const livresParAuteur = livres.filter(l => l.auteur.toLowerCase() === auteur.toLowerCase());
        res.json(livresParAuteur);
    });
});

module.exports = router;
