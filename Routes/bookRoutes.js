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

const fs = require('fs');
const path = require('path');

const livresJSONPath = path.join(__dirname, '..', 'data', 'livres.json');

router.post('/ajout-livre', (req, res) => {
    const { titre, auteur, annee } = req.body;

    fs.readFile(livresJSONPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Erreur interne du serveur');
            return;
        }

        const livres = JSON.parse(data);

        const nouveauLivre = {
            id: livres.length + 1,
            titre: titre,
            auteur: auteur,
            annee: annee
        };
        livres.push(nouveauLivre);

        const nouveauLivreJSON = JSON.stringify(livres, null, 2);

        fs.writeFile(livresJSONPath, nouveauLivreJSON, 'utf8', (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Erreur interne du serveur');
                return;
            }
            res.status(201).send('Livre ajouté avec succès');
        });
    });
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
