"use strict";

const express = require("express");
const app = express();
const session = require('express-session');


const registerRoute = require('./routes/register.js');
const loginRoute = require('./routes/login.js')

app.use(session({
    secret: "stylemate",
    name: "stylemate",
    resave: "true",
    saveUninitialized: true
}));
app.use(express.json());
app.use('/register' , registerRoute);
app.use('/login' , loginRoute);

module.exports = app;