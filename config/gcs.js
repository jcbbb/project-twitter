const { Storage } = require('@google-cloud/storage');
const { GCSPROJECTID } = require('./secrets');
const path = require('path');

const storage = new Storage({
    projectId: GCSPROJECTID,
    keyFilename: path.join(__dirname, '../gcscreds.json'),
});

const bucket = storage.bucket('twitter-doom');

module.exports = { bucket };
