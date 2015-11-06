'use strict';
let Hypher = require('hypher');
let hypher = new Hypher(require('hyphenation.en-us'));
let flatMap = require('flatmap');

let data = [];
process.stdin.on('data', (buf) => {
    data.push(buf);
});



process.stdin.on('end', () => analyseData());

function analyseData() {
    let json = data.map((val) => val.toString()).join('');
    let characters = JSON.parse(json);
    let commonSyllables = new Map();
    flatMap(
        flatMap(characters, (character) => character.split(' ')),
        (word) => hypher.hyphenate(word)
    ).forEach((syllable) => {
        let currVal = commonSyllables.get(syllable) || 0;
        commonSyllables.set(syllable, ++currVal);
    });
    let results = {starts: [], ends: []};
    commonSyllables.forEach((value, key) => {
        if (/[A-Z]/.test(key[0])) {
            results.starts[value] ? undefined : results.starts[value] = [];
            results.starts[value].push(key);
        }
        else {
            results.ends[value] ? undefined : results.ends[value] = [];
            results.ends[value].push(key);
        }
    });
    process.stdout.write(JSON.stringify(results));
}
