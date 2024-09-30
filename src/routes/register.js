"use strict";

const express = require("express");
const router = express.Router();
const db = require("../lib/db.js");

//회원가입
router.post('/register', async (req, res) => {
    const { username, email, id, password, checkPassword } = req.body;

    // 비밀번호 확인
    if (password !== checkPassword) {
        return res.status(400).send('비밀번호가 맞지 않습니다.');
    }

    try {
        // 아이디 중복 체크
        const [idResult] = await db.promise().query("SELECT * FROM login WHERE id = ?", [username]);
        if (idResult.length > 0) {
            return res.status(400).send('이미 존재하는 id입니다');
        }

        // 이메일 중복 체크
        const [emailResult] = await db.promise().query("SELECT * FROM login WHERE email = ?", [email]);
        if (emailResult.length > 0) {
            return res.status(400).send('이미 존재하는 email입니다');
        }

        //마지막 회원가입 체크
        await db.promise().query("INSERT INTO login (username, email, id, password) VALUES (?, ?, ?, ?)", [username, email, id, password]);

        // 회원가입 성공 응답
        res.send('회원가입 성공');
        //여기에 홈으로 가는 리다이렉트가 들어가야할듯함
        
    } catch (err) {
        console.error('회원가입 오류:', err);
        res.status(500).send('회원가입 오류');
    }
});

module.exports = router;
