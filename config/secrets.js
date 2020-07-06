const dotenv = require('dotenv');

dotenv.config();

const {
    PROD_DATABASE_URI,
    DEV_DATABASE_URI,
    TEST_DATABASE_URI,
    JWTSECRET,
    GCSPROJECTID,
    USERNAME,
    PASSWORD,
} = process.env;

module.exports = {
    PROD_DATABASE_URI,
    DEV_DATABASE_URI,
    TEST_DATABASE_URI,
    JWTSECRET,
    GCSPROJECTID,
    USERNAME,
    PASSWORD,
};
