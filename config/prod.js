const { PROD_DATABASE_URI, SENDGRID_API_KEY } = require('./secrets');

module.exports = {
    mongoUri: PROD_DATABASE_URI,
    sgApiKey: SENDGRID_API_KEY,
};
