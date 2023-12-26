const mongoose = require('mongoose');
const user = mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    tweets: {
        type: [String],
        default: []
    },
    followers: {
        type: [Object],
        default: []
    },
    followings: {
        type: [Object],
        default: []
    },
    dob: {
        type: Date,
        require: true
    },
    joinedDate: {
        type: Date,
        default: Date.now
    },
    state: {
        type: String,
        default: "state"
    },
    city: {
        type: String,
        default: "city"
    },
})
module.exports = mongoose.model("user", user);