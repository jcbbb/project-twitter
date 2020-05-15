const dotenv = require('dotenv');

dotenv.config();

const { MONGOURI, JWTSECRET, USERNAME, PASSWORD } = process.env;

module.exports = {
    MONGOURI,
    JWTSECRET,
    USERNAME,
    PASSWORD,
};
