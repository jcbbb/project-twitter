const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const verifyToken = require('./utils/verifyToken');
const socketio = require('socket.io');
const http = require('http');
const db = require('./db');

const app = express();
const server = http.createServer(app);
const io = socketio.listen(server);

if (process.env.NODE_ENV === 'prod') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

io.on('connection', (socket) => {
    console.log('User connected');

    socket.on('disconnect', () => {
        console.log('Disconnected');
    });
});

// Connecting to database...
db.connect();

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
