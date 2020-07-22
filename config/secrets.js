const dotenv = require('dotenv');

dotenv.config();

const {
    PROD_DATABASE_URI,
    DEV_DATABASE_URI,
    TEST_DATABASE_URI,
    JWTSECRET,
    GCSPROJECTID,
    MAILGUN_API_KEY,
} = process.env;

module.exports = {
    PROD_DATABASE_URI,
    DEV_DATABASE_URI,
    TEST_DATABASE_URI,
    JWTSECRET,
    GCSPROJECTID,
    MAILGUN_API_KEY,
};
