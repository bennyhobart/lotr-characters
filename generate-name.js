'use strict';
let shuffle = require('shuffle-array');
let trimPunctuation = require('trim-punctuation');
let fs = require('fs');
let path = require('path');

let jsonCharacters = fs.readFileSync(path.join(__dirname, 'data.json')).toString();
let names = JSON.parse(jsonCharacters); 

module.exports = function generateName() {
    let firstNames = null;
    let endNames = null;
    while(firstNames === null){
        firstNames = shuffle.pick(names.starts);
    }
    while(endNames === null) {
        endNames = shuffle.pick(names.ends);
    }
    return trimPunctuation(shuffle.pick(firstNames) + shuffle.pick(endNames));
};
