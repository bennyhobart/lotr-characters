'use strict';
const express = require('express');
const router = express.Router();
const model  = require('./model.js');
const generateName = require('../generate-name.js');
const analyseImage = require('../analyse-image.js');
const multipart = require('connect-multiparty')();

router.get('/', (req, res) => {
    model.find()
        .then((results) => res.send(results), err => res.status(400).send(err));
});

router.post('/', multipart, (req, res) => {
    if(req.files.image == undefined) {
        res.status(400).send('No Image Attached');
    }
    analyseImage(req.files.image.path)
        .then((imageResult) => {
            const result = {name: generateName(), image: imageResult};
            return model.create(result);
        })
        .then((result) => res.redirect('/results/' + result._id))
        .catch(err => res.status(400).send(err));
});

router.put('/:id', (req, res) => {
    model.update(req.body, req.params.id)
        .then((result) => res.send(result), err => res.status(400).send(err));
});

router.get('/:id', (req, res) => {
    model.read(req.params.id)
        .then((result) => res.render('result', {result}), err => res.status(400).send(err));
});

router.delete('/:id', (req, res) => {
    model.remove(req.params.id)
        .then((result) => res.send(result), err => res.status(400).send(err));
});

module.exports = router;
