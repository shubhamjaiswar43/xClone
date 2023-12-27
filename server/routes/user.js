const express = require("express")
const routes = express.Router();
const {getuser,searchuser,follow,unfollow} = require("../controllers/user");
const {fetchuser} = require("../middleware/fetchuser");

routes.get("/getuser/:username",getuser);
routes.get("/getuser/",fetchuser,getuser);
routes.get("/searchuser",searchuser);
routes.get("/searchuser/:username",searchuser);
routes.patch("/follow/:username",fetchuser,follow);
routes.patch("/unfollow/:username",fetchuser,unfollow);





module.exports = routes;