'use strict';
let cheerio = require('cheerio');
let request = require('request');

request('http://lotr.wikia.com/wiki/List_of_characters', function(err, res, body) {
    if(err) throw new Error(err);
    let $ = cheerio.load(body);
    let links = $('p a', '.WikiaArticle')
        .map((_, el) => $(el).text())
        .get();
    process.stdout.write(JSON.stringify(links));
});
