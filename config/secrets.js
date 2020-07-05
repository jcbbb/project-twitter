const dotenv = require('dotenv');

dotenv.config();

const { DEV_DATABASE_URI, JWTSECRET, GCSPROJECTID, USERNAME, PASSWORD } = process.env;

module.exports = {
    DEV_DATABASE_URI,
    JWTSECRET,
    GCSPROJECTID,
    USERNAME,
    PASSWORD,
};
