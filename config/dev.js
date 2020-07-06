const { DEV_DATABASE_URI } = require('./secrets');

module.exports = {
    mongoUri: DEV_DATABASE_URI,
};
