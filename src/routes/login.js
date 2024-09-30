"use strict";

const express = require('express')
const router = express.Router();
const db = require("../lib/db.js");

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const [userNameresult] = await db.promise().query("SELECT * FROM stylemate WHERE username = ?" , [username]);
        
    } catch (err) {

    }
})