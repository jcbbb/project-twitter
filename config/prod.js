const { PROD_DATABASE_URI, MAILGUN_API_KEY } = require('./secrets');

module.exports = {
    mongoUri: PROD_DATABASE_URI,
    mgApiKey: MAILGUN_API_KEY,
    domain: 'https://juraev.design',
};
