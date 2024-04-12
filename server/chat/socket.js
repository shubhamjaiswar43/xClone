const connection = (socket) => {
    socket.on('joinRoom', data => {
        socket.join(data.roomId);
    })
}

module.exports = connection;