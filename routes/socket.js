module.exports = (socket) => {
    socket.on('subscribe', ({ ids }) => {
        socket.join(ids);
    });
};
