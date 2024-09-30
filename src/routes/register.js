"use strict";

const express = require("express");
const router = express.Router();
const db = require("../lib/db.js");

//회원가입
router.post('/register', async (req, res) => {
    const { username, email, password, checkPassword } = req.body;

    // 비밀번호 확인
    if (password !== checkPassword) {
        return res.status(400).send('비밀번호가 맞지 않습니다.');
    }

    try {
        // 유저네임 중복 체크
        const [userNameResult] = await db.promise().query("SELECT * FROM stylemate_login WHERE username = ?", [username]);
        // console.log(userNameResult);
        if (userNameResult.length > 0) {
            return res.status(400).send('이미 존재하는 username입니다');
        }

        // 이메일 중복 체크
        const [emailResult] = await db.promise().query("SELECT * FROM stylemate_login WHERE email = ?", [email]);
        // console.log(emailResult);
        if (emailResult.length > 0) {
            return res.status(400).send('이미 존재하는 email입니다');
        }

        //마지막 회원가입 체크
        await db.promise().query("INSERT INTO stylemate_login (username, email, password) VALUES (?, ?, ?)", [username, email, password]);

        // 회원가입 성공 응답
        res.send('회원가입 성공');
        //여기에 홈으로 가는 리다이렉트가 들어가야할듯함
        
    } catch (err) {
        console.error('회원가입 오류:', err);
        res.status(500).send('회원가입 오류');
    }
});

module.exports = router;
