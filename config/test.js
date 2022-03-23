const { TEST_DATABASE_URI, MAILGUN_API_KEY, SENDGRID_API_KEY, ORIGIN_DEV } = require("./secrets");

module.exports = {
  mongoUri: TEST_DATABASE_URI,
  mgApiKey: MAILGUN_API_KEY,
  origin: ORIGIN_DEV,
  sgApiKey: SENDGRID_API_KEY,
};
