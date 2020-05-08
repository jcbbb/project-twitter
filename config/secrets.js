const dotenv = require('dotenv');
dotenv.config();

const { MONGOURI, JWTSECRET } = process.env;

module.exports = {
    MONGOURI,
    JWTSECRET,
};
