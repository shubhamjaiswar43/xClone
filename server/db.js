const mongoose = require("mongoose");
require("dotenv").config();
mongouri = process.env.MONGOURI;
const connect = async () => {
    try {
        await mongoose.connect(mongouri);
        console.log(`Database Connected Successfully`);
    } catch (err) {
        console.log(err)
        console.log("Error In Connection")
    }
}
module.exports = connect;