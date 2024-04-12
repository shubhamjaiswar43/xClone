const express = require('express');
const routes = express.Router();
const { fetchuser } = require('../middleware/fetchuser');
const { sendMessage, getMessage, getUsers } = require('../controllers/chat');

routes.get('/getUsers', fetchuser, getUsers);
routes.patch('/sendMessage', fetchuser, sendMessage);//require user and message in the body
routes.get('/getMessage/:id', fetchuser, getMessage);


module.exports = routes;