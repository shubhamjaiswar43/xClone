const User = require("../models/User");

const getuser = async (req, res) => {
    try {
        let username = req.params.username;
        if (!username)
            username = req.body.username;
        const user = await User.findOne({ username });
        if (!user)
            return res.status(400).json({ success: false, Error: "User Not Exist!!!" });
        return res.json({ success: true, user })
    } catch (err) {
        res.json({ "Error": err.msg });
    }
}

const searchuser = async (req, res) => {
    try {
        let username = req.params.username;
        if(!username)
            username = ""
        const user = await User.find({ username: { $regex: username, $options: "i" } });
        return res.json({ success: true, user })
    } catch (err) {
        res.json({ "Error": err.msg });
    }

}

const follow = async (req, res) => {
    try {
        let follower = req.body.username;
        let following = req.params.username;
        //user(follower) making a request to following a user(following)

        const user1 = await User.findOne({ username: follower });
        const user2 = await User.findOne({ username: following });
        if (!user1 || !user2)
            return res.status(400).send({ success: false, "Error": "User Not Found" });

        if(user1.followings.reduce((prev,curr)=> prev||curr.username===user2.username,false))
            return res.json({success:false,Error:'User Already Following!!!'})

        user1.followings.push({ username: user2.username, name: user2.name });
        user2.followers.push({ username: user1.username, name: user1.name });

        await user1.save();
        await user2.save();

        res.json({ success: true });
    } catch (err) {
        res.json({ "Error": err.msg });
    }
}
const unfollow = async (req, res) => {
    try {
        let follower = req.body.username;
        let following = req.params.username;
        //user(follower) making a request to following a user(following)

        const user1 = await User.findOne({ username: follower });
        const user2 = await User.findOne({ username: following });
        if (!user1 || !user2)
            return res.status(400).send({ success: false, "Error": "User Not Found" });

        user1.followings = user1.followings.filter(ele => ele.username !== user2.username);
        user2.followers = user2.followings.filter(ele => ele.username !== user1.username);

        await user1.save();
        await user2.save();
        
        res.json({ success: true });
    } catch (err) {
        res.json({ "Error": err.msg });
    }
}


module.exports.getuser = getuser;
module.exports.searchuser = searchuser;
module.exports.follow = follow;
module.exports.unfollow = unfollow;