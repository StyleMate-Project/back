"use strict";

const express = require("express");
const app = express();
const session = require('express-session');


const indxRoute = require('./routes/register.js');

app.use(express.json());
app.use('/' , indxRoute);

module.exports = app;