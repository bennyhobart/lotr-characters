/*global document, history, fetch*/
'use strict';
var button = document.getElementById('submit-button');
button.addEventListener('click', function(evt){
    fetch('/results', {
        method: 'POST'
    }).then(function (res){
        if (res.status !== 200) {
            throw new Error(res);
        }
        return res.json();
    }).then(function(json){
        history.pushState({
            title: 'Results',
            URL: '/results/' + json._id
        });
    }).catch(function(err){
        console.error(err);
    });
    evt.preventDefault();
});

