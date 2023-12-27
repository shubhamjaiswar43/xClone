const express = require("express");
const app = express();
const hostname = "127.0.0.1";
const connect = require("./db")
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
connect();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json({extended:true}))

app.get("/",(req,res)=>{
    res.send("Welcome To X-Clone")
})

app.use("/auth",require("./routes/auth"))
app.use("/user",require("./routes/user"))
app.use("/post",require("./routes/post"))

app.listen(port,()=>{
    console.log(`Server Is Running At http://${hostname}:${port}`);
});
