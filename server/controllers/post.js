const Tweet = require("../models/Tweet");
const User = require("../models/User");

const tweet = async (req, res) => {
    try {
        const { username, tweet } = req.body;
        const user = await User.findOne({ username });
        if (!user)
            return res.status(400).json({ success: false, "Error": "User Not Found!!!" })
        const post = await Tweet.create({ name: user.name, username, tweet, uploadDate: Date.now() });
        res.send({ success: true, post });
    } catch (err) {
        res.json({ "Error": err.msg });
    }
}
const like = async (req, res) => {
    try {
        const { username } = req.body;
        const { postId } = req.params;
        const tweet = await Tweet.findOne({ _id: postId });
        if (!tweet)
            return res.status(400).json({ success: false, Error: "Post Not Found!!!" });
        if (tweet.likes.indexOf(username) !== -1)
            return res.json({ success: false, Error: "User Already Likes The Post!!" })
        tweet.likes.push(username);
        tweet.unlikes = tweet.unlikes.filter(key => key != username)
        await tweet.save();
        res.json({ success: true });
    } catch (err) {
        res.json({ "Error": err.msg });
    }
}
const unlike = async (req, res) => {
    try {
        const { username } = req.body;
        const { postId } = req.params;
        const tweet = await Tweet.findOne({ _id: postId });
        if (!tweet)
            return res.status(400).json({ success: false, Error: "Post Not Found!!!" });
        if (tweet.unlikes.indexOf(username) !== -1)
            return res.json({ success: false, Error: "User Already Likes The Post!!" });
        tweet.unlikes.push(username);
        tweet.likes = tweet.likes.filter(key => key != username)
        await tweet.save();
        res.json({ success: true });
    } catch (err) {
        res.json({ "Error": err.msg });
    }
}

const getpost = async (req, res) => {
    try {
        let username = req.params.username;
        if (!username)
            username = req.body.username;
        const user = await User.findOne({ username });
        if (!user)
            return res.status(400).json({ success: false, Error: "User Not Found!!!" });
        const posts = await Tweet.find({ username });
        res.json({ success: true, posts });
    } catch (err) {
        res.json({ "Error": err.msg });
    }
}

const getallpost = async (req, res) => {
    try {
        const posts = await Tweet.find({})
        res.json({ success: true, posts });
    } catch (err) {
        res.json({ "Error": err.msg });
    }
}

module.exports.tweet = tweet;
module.exports.like = like;
module.exports.unlike = unlike;
module.exports.getpost = getpost;
module.exports.getallpost = getallpost;