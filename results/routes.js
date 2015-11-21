'use strict';
const express = require('express');
const router = express.Router();
const model  = require('./model.js');
const generateName = require('../generate-name.js');

router.get('/', (req, res) => {
    model.find()
        .then((results) => res.send(results), err => res.status(400).send(err));
});

router.post('/', (req, res) => {
    const result = req.body;
    const name = generateName();
    result.name = name;
    model.create(result)
        .then((result) => res.redirect('/' + result._id), err => res.status(400).send(err));
});

router.put('/:id', (req, res) => {
    const result = req.body;
    model.update(result, req.params.id)
        .then((result) => res.send(result), err => res.status(400).send(err));
});

router.get('/:id', (req, res) => {
    model.read(req.params.id)
        .then((result) => res.send(JSON.stringify(result)), err => res.status(400).send(err));
});

router.delete('/:id', (req, res) => {
    model.remove(req.params.id)
        .then((result) => res.send(result), err => res.status(400).send(err));
});

module.exports = router;
