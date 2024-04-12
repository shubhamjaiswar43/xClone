const app = require('./app');
const socketIO = require('socket.io');
const http = require('http');
const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: "*",
    }
});
module.exports = { io, server };