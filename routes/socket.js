module.exports = (socket) => {
    socket.on('thread opened', ({ id }) => {
        socket.join(id);
    });
};
