const dotenv = require('dotenv');

dotenv.config();

const { MONGOURI, JWTSECRET, GCSPROJECTID, USERNAME, PASSWORD } = process.env;

module.exports = {
    MONGOURI,
    JWTSECRET,
    GCSPROJECTID,
    USERNAME,
    PASSWORD,
};
