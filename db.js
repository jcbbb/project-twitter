const mongoose = require('mongoose');
const env = process.env.NODE_ENV || 'dev';
const config = require(`./config/${env}`);

const db = (() => {
    const connect = () => {
        mongoose
            .connect(config.mongoUri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false,
            })
            .then(console.log('Connected to db'))
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
