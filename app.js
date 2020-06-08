const express = require('express');
const mongoose = require('mongoose');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const verifyToken = require('./utils/verifyToken');
const socketio = require('socket.io');
const http = require('http');
const { MONGOURI } = require('./config/secrets');

const app = express();
const server = http.createServer(app);
const io = socketio.listen(server);

io.on('connection', (socket) => {
    console.log('User connected');

    socket.on('disconnect', () => {
        console.log('Disconnected');
    });
});

// Connecting to database...
mongoose
    .connect(MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('Database connection error', err.message));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(helmet());
app.use(cookieParser());
app.use(
    cors({
        origin: ['http://localhost:3000'],
        credentials: true,
    }),
);

app.get('/me', verifyToken, async (req, res) => {
    res.json({ message: 'Authorization cookie is verified', status: 200 });
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/send', require('./routes/send'));
app.use('/api/users', require('./routes/users'));
app.use('/api/tweets', require('./routes/tweets'));
app.use('/api/upload', require('./routes/upload'));

app.set('port', process.env.PORT || 5000);

module.exports = { server, app };
