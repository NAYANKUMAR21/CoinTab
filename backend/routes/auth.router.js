const express = require('express');
const app = express.Router();
const { Login, Signup } = require('../controller/user.controller');
app.post('/login', Login);
app.post('/signup', Signup);

module.exports = app;
