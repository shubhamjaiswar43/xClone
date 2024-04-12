const User = require('../models/User');
const Message = require('../models/Message');
const { io } = require("../socket");

const getUsers = async (req, res) => {
    const users = [];
    const username = req.body.username;
    const rooms = await Message.find({ roomId: { $regex: username } });
    for (const room of rooms) {
        let ids = room.roomId.split(':');
        let id = ids[(ids[0] == username) ? 1 : 0];
        const user = await User.findOne({ username: id });
        users.push({ username: user.username, name: user.name });
    }
    res.json({ success: true, users });
}

const sendMessage = async (req, res) => {
    const user = await User.findOne({ username: req.body.user });
    if (!user)
        return res.status(404).json({ success: false, Error: 'User Not Exist' });
    const sender = req.body.username;
    const receiver = req.body.user;
    let roomId, type;
    if (sender > receiver) {
        roomId = `${receiver}:${sender}`
        type = 'user2';
    }
    else {
        roomId = `${sender}:${receiver}`
        type = 'user1';
    }
    let room = await Message.findOne({ roomId });
    if (!room) {
        room = await Message.create({ roomId });
    }
    const message = {
        type,
        message: req.body.message,
        time: Date.now(),
    }
    room.messages.push(message);
    io.to(roomId).emit('messageReceived', message);
    await room.save();
    res.json({ success: true, room });
}
const getMessage = async (req, res) => {
    const user = await User.findOne({ username: req.params.id });
    if (!user)
        return res.status(404).json({ success: false, Error: 'User Not Exist' });
    const sender = req.body.username;
    const receiver = req.params.id;
    let roomId;
    if (sender > receiver) {
        roomId = `${receiver}:${sender}`
    }
    else {
        roomId = `${sender}:${receiver}`
    }
    let room = await Message.findOne({ roomId });
    if (!room)
        room = await Message.create({ roomId });
    res.json({ success: true, room });
}



module.exports = { sendMessage, getMessage, getUsers };