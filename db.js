const mongoose = require('mongoose');
const { PROD_DATABASE_URI, TEST_DATABASE_URI } = require('./config/secrets');

const db = (() => {
    const connect = () => {
        mongoose
            .connect(process.env.NODE_ENV === 'prod' ? PROD_DATABASE_URI : TEST_DATABASE_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false,
            })
            .catch((err) => console.log('Database connection error', err.message));
    };

    const disconnect = () => {
        mongoose.connection.close().catch((err) => console.error('Database disconnect error', err.message));
    };

    const drop = () => {
        mongoose.connection.dropDatabase().catch((err) => console.error("Couldn't drop the db"));
    };

    return { connect, disconnect, drop };
})();

module.exports = db;
