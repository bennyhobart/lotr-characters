'use strict';
let express = require('express');
let fs = require('fs');
let path = require('path');
let shuffle = require('shuffle-array');
let trimPunctuation = require('trim-punctuation');
let jsonCharacters = fs.readFileSync(path.join(__dirname, 'data.json')).toString();
let names = JSON.parse(jsonCharacters); 
let app = express();
const port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use((req, res) => {
    res.render('index', {name: newName()});
});

app.listen(port, () => process.stdout.write(`Listening on port ${port}`));

function newName() {
    let firstNames = null;
    let endNames = null;
    while(firstNames === null){
        firstNames = shuffle.pick(names.starts);
    }
    while(endNames === null) {
        endNames = shuffle.pick(names.ends);
    }
    return trimPunctuation(shuffle.pick(firstNames) + shuffle.pick(endNames));
}
