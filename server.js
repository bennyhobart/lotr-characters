'use strict';
let express = require('express');
let fs = require('fs');
let path = require('path');
let shuffle = require('shuffle-array');
let trimPunctuation = require('trim-punctuation');
let app = express();
let jsonCharacters = fs.readFileSync(path.join(__dirname, 'data/names.json')).toString();
let names = JSON.parse(jsonCharacters); 

app.use((req, res) => {
    res.send(newName());
});
app.listen(3000, () => process.stdout.write('Listening on port 3000'));

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
