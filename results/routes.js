'use strict';
const express = require('express');
const router = express.Router();
const model  = require('./model.js');
router.post('/', (req, res) => {
    const result = req.body;
    model.create(result)
        .then((result) => res.send(result), err => res.send(err, 400));
});
router.get('/', (req, res) => {
    model.find()
        .then((results) => res.send(results), err => res.send(err, 400));
});
router.put('/:id', (req, res) => {
    const result = req.body;
    model.update(result, req.params.id)
        .then((result) => res.send(result), err => res.send(err, 400));
});
router.get('/:id', (req, res) => {
    model.read(req.params.id)
        .then((result) => res.send(JSON.stringify(result)), err => res.send(err, 400)); });
router.delete('/:id', (req, res) => {
    model.remove(req.params.id)
        .then((result) => res.send(result), err => res.send(err, 400));
});
module.exports = router;
