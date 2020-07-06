const { PROD_DATABASE_URI } = require('./secrets');

module.exports = {
    mongoUri: PROD_DATABASE_URI,
};
