const obj = {};
module.exports = (socket, io) => {
    const { userId } = socket.handshake.query;
    obj[userId] = socket.id;
    io.customClients = obj;

    socket.on('subscribe', ({ ids }) => {
        socket.join(ids);
    });

    socket.on('disconnect', () => {
        delete io.customClients[userId];
        delete obj[userId];
    });
};
