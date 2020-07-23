const { TEST_DATABASE_URI, MAILGUN_API_KEY } = require('./secrets');

module.exports = {
    mongoUri: TEST_DATABASE_URI,
    mgApiKey: MAILGUN_API_KEY,
    domain: 'http://localhost:3000',
};
