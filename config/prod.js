const { PROD_DATABASE_URI, MAILGUN_API_KEY, SENDGRID_API_KEY, ORIGIN_PROD } = require("./secrets");

module.exports = {
  mongoUri: PROD_DATABASE_URI,
  mgApiKey: MAILGUN_API_KEY,
  origin: ORIGIN_PROD,
  sgApiKey: SENDGRID_API_KEY,
};
