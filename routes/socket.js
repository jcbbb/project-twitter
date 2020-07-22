module.exports = (socket) => {
    socket.on('subscribe to thread', ({ id }) => {
        socket.join(id);
    });
    socket.on('subscribe', ({ ids }) => {
        socket.join(ids);
    });
};
