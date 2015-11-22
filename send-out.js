'use strict';
const morse = require('morse'),
    net = require('net'),
    debug = require('debug')('expressapp'),
    fetch = require('isomorphic-fetch');

let client;
const MORSE_URI = process.env.MORSE_URI || 'localhost:9000',
    HOST = MORSE_URI.split(':')[0],
    PORT = MORSE_URI.split(':')[1];
function reconnect(){
    debug(`Init tcp connection on port:${PORT} host:${HOST}`);
    client = new Promise((resolve, reject) => {
        try {
            const connection = net.connect(PORT, HOST, () => {
                debug(`Successfully connect to ${MORSE_URI}`);
                connection.on('end', reconnect);
                resolve(connection);
            });
        } catch (ex) {
            reject(ex);
            reconnect();
        }
    });
}
reconnect();

function sendMorseCode(name) {
    const morseCode = morse.encode(name);
    client
        .then(con => con.write(morseCode))
        .catch(() => debug(`Error Sending to ${process.env.MORSE_URI}`));
}

const VR_URI = process.env.VR_URI || 'localhost:9000';
function sendToVR(name) {
    return fetch(VR_URI + 'message/' + name, {
        method: 'POST'
    })
        .then(()=>debug(`Successfully sent to VR ${name}`))
        .catch(()=>debug(`Error sending to VR ${name}`));
}

module.exports = function sendOut(name) {
    sendMorseCode(name);
    sendToVR(name);
};

