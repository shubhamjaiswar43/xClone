const mongoose = require('mongoose');
const tweet = mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    name:{
        type:String,
        require:true
    },
    tweet:{
        type:String,
        require:true
    },
    likes:{
        type:[String],
        default:[]
    },
    unlikes:{
        type:[String],
        default:[]
    },
    uploadDate:{
        type:Date,
        default:Date.now
    },
})
module.exports = mongoose.model("tweet",tweet);