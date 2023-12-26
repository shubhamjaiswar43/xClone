const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bjcryptjs = require("bcryptjs");
const JWT_SECRET = process.env.JWT_SECRET;
const signup = async (req, res) => {
    try {
        const { name, username, password, dob, city, state } = req.body;

        //checking for unique username
        const users = await User.find({});
        for(i in users){
            if(users[i].username===username)
                return res.status(400).json({"Error":"Username Exist,Please Choose Another Username"});
        }


        //hashing password
        const salt = await bjcryptjs.genSalt(10);
        const hashedPass = await bjcryptjs.hash(password, salt);

        //creating new user
        await User.create({
            name,
            username,
            password:hashedPass,
            dob,
            city,
            state,
            joinedDate:Date.now()
        })
        
        //generating authToken
        const authToken = await jwt.sign({ username }, JWT_SECRET);

        res.json({"success":true,authToken});
    } catch (err) {
        res.json({ "Error": err.msg });
    }
}

const signin = async(req, res) => {
    try{
        const {username,password} = req.body;
        const user = await User.find({username});
        if(user.length===0){
            return res.status(400).json({"Error":"Invalid Credentials"})
        }
        const verify = await bjcryptjs.compare(password,user[0].password);
        
        if(!verify){
            return res.status(400).json({"Error":"Invalid Credentials"})
        }
        const authToken = jwt.sign({username},JWT_SECRET);
        
        res.json({"success":true,authToken});

    }catch(err){
        res.json({ "Error": err.msg });
    }
}

module.exports.signup = signup;
module.exports.signin = signin;