const express = require("express")
const routes = express.Router();
const {tweet,like,unlike,getpost,getallpost} = require("../controllers/post");
const {fetchuser} = require("../middleware/fetchuser");

routes.post("/tweet",fetchuser,tweet);
routes.patch("/like/:postId",fetchuser,like);
routes.patch("/unlike/:postId",fetchuser,unlike);
routes.get("/getpost/:username",getpost);
routes.get("/getpost",fetchuser,getpost);
routes.get("/getallpost",getallpost);

module.exports = routes;