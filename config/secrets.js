const dotenv = require('dotenv');

dotenv.config();

const {
    PROD_DATABASE_URI,
    DEV_DATABASE_URI,
    TEST_DATABASE_URI,
    JWTSECRET,
    GCSPROJECTID,
    SMTP_PORT,
    SMTP_USER_PASSWORD,
    SMTP_USER,
    SMTP_SERVER,
} = process.env;

module.exports = {
    PROD_DATABASE_URI,
    DEV_DATABASE_URI,
    TEST_DATABASE_URI,
    JWTSECRET,
    GCSPROJECTID,
    SMTP_PORT,
    SMTP_USER_PASSWORD,
    SMTP_USER,
    SMTP_SERVER,
};
