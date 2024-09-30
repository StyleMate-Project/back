const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'mg080922@',
    database: 'stylemate',
});

db.connect((err) => {
    if (err){
        console.error('mysql 연결 실패' , err);
        return ;
    }
    console.log('mysql연결 성공')
});

module.exports = db;