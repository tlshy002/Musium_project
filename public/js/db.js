// MySQL 연결설정
const mysql = require('mysql2');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'musium'
});

// MySQL 연결
db.connect(error => {
    if (error) {
        console.error('Error connecting to MySQL database:', error);
        return;
    }
    console.log('Connected to MySQL database');
});

module.exports = db;