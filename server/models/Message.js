const mongoose = require("mongoose");

const Message = mongoose.Schema({
    roomId: { type: String, require: true },//username1:username2 => username1<username2
    messages: [
        {
            type: { type: String, require: true },
            message: { type: String, require: true },
            time: { type: Date, default: Date.now }
        },
    ],
});

module.exports = mongoose.model("message", Message);