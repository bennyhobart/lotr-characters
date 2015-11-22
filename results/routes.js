'use strict';
const express = require('express');
const router = express.Router(),
    model  = require('./model.js'),
    generateName = require('../generate-name.js'),
    analyseImage = require('../analyse-image.js'),
    sendOut = require('../send-out.js'),
    multipart = require('connect-multiparty')();

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
            const name = generateName(),
                result = {name: name, image: imageResult};
            console.log(result);
            sendOut(result.name);
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
