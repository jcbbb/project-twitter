const express = require('express');
const mongoose = require('mongoose');
const { MONGOURI } = require('./config/secrets');

const app = express();

// Connecting to database...
mongoose
	.connect(MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
	.then(() => console.log('Connected to MongoDB'))
	.catch((err) => console.log('Database connection error', err.message));

// Routes
app.use('/api/auth', require('./routes/auth'));

app.set('port', process.env.PORT || 5000);

module.exports = app;
