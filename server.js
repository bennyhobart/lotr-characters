'use strict';
const generateName = require('./generate-name'),
    express = require('express'),
    path = require('path'),
    mongoose = require('mongoose'),
    debug = require('debug')('expressapp'),
    results = require('./results/routes');

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
app.use(require('body-parser').json());
app.use(require('express-logger')({
    path: process.env.LOGFILE || path.join(__dirname, 'logs')
}));
app.use(require('express-less-middleware')());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/results', results);
app.use((req, res) => {
    res.render('index', {name: generateName()});
});
app.listen(port, () => debug(`Listening on port ${port}`));
