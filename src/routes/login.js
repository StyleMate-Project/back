"use strict";

const express = require('express');
const router = express.Router();
const db = require("../lib/db.js");
const bcrypt = require('bcrypt');//비밀번호 해싱

router.post('/', async (req, res) => {
    const { id, password } = req.body;

    if (!id) {
        res.status(400).send('아이디를 작성하지 않았습니다.');
    } else if (!password) {
        res.status(400).send('비밀번호를 작성하지 않았습니다.');
    }

    try {
        const [idCheck] = await db.promise().query("SELECT * FROM login WHERE id = ?" , [id]);

        if (idCheck.length === 0){
            return res.status(400).send('해당 id는 존재하지 않습니다.');
        }

        const passwordCheck = await bcrypt.compare(password, idCheck[0].password);
        if (!passwordCheck) {
            return res.status(400).send('패스워드가 틀렸습니다.');
        }
        req.session.loggedIn = true;
        res.send('로그인에 성공하셨습니다');
        //리다이렉션 홈으로


    } catch (err) {
        console.log(err);
    }
});

module.exports = router;