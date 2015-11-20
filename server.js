'use strict';
const generateName = require('./generate-name');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const debug = require('debug');

//Mongoose Config
const mongoURL = process.env.MONGO_URI || 'mongodb://localhost/lotr-characters';
mongoose.connect(mongoURL);
process.on('SIGINT', () => mongoose.connection.close(() => {
    debug('mongoose disconnected');
    process.exit(0);
}));

//Express Config
const app = express();
const port = process.env.PORT || 3000;
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use((req, res) => {
    res.render('index', {name: generateName()});
});

app.listen(port, () => process.stdout.write(`Listening on port ${port}`));
