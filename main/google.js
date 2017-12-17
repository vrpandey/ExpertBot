// Imports the Google Cloud client library
const Language = require('@google-cloud/language');
var config = require("./config")
process.env['GOOGLE_APPLICATION_CREDENTIALS'] = config.googletoken;
// Instantiates a client
const language = Language();


// Detects entities in the document
function returnEntities(title, callback) {
    var document = {
        'content': title,
        type: 'PLAIN_TEXT'
    };

    language.analyzeEntities({ document: document })
        .then((results) => {
            const entities = results[0].entities;

            var ent = "";
            console.log('Entities:');
            for (var i = 0; i < entities.length; i++) {
                callback(entities[i].name)

            }

        })
        .catch((err) => {
            console.error('ERROR:', err);
        });
}
exports.returnEntities = returnEntities;
