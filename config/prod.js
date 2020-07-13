const { PROD_DATABASE_URI, SMTP_PORT, SMTP_USER, SMTP_SERVER, SMTP_USER_PASSWORD } = require('./secrets');

module.exports = {
    mongoUri: PROD_DATABASE_URI,
    smtpServer: SMTP_SERVER,
    smtpPort: SMTP_PORT,
    smtpUser: SMTP_USER,
    smtpUserPassword: SMTP_USER_PASSWORD,
};
