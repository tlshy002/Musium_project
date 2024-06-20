// db-클라-서버 연동

const express = require('express');
const db = require('./public/js/db');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const cors = require('cors');


// 정적 파일 제공 설정
app.use(express.static('public'));
app.use(express.static('./public/html'));
app.use(express.static('./public/css'));
app.use(express.static('./public/js'));

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());  // CORS 미들웨어 사용
app.set('view engine', 'ejs')


// 게시물 가져오기
app.get('/api/member', (req, res) => {
    // const query = 'SELECT * FROM member';
    // db.query(query, (error, results) => {
    //     if (error) {
    //         console.error('Error fetching member:', error);
    //         res.status(500).json({ error: 'Failed to fetch member' });
    //         return;
    //     }
    //     res.json(results);
    // });

    const q1 = 'SELECT name, password FROM member';
    // const q2 = 'SELECT password FROM member';
    db.query(q1, (error, results) => {
        if (error) {
            console.error('Error fetching member:', error);
            res.status(500).json({ error: 'Failed to fetch member' });
            return;
        }
        console.log('hi');
        console.log(results[0].name);
        console.log(results[0].password);
        res.json(results);
    })

});

// app.get("/member", (req, res) => res.sendFile(__dirname + "./welcome.html"));

// 회원 추가하기
app.post('/member', async(req, res) => {
    const { email, name, password, nickname } = req.body;
    const query = 'INSERT INTO member2 ( email, name, password, nickname) VALUES ( ?, ?, ?, ?)';
    
    db.query(query, [ email, name, password, nickname], (error, result) => {
        if (error) {
            console.error('Error adding member:', error);
            res.status(500).json({ error: 'Failed to add member' });
            return;
        }
        res.status(201).json({ id: result.insertId, email, name, password, nickname });
    });
});

// 로그인 요청 처리
app.post('/login', (req, res) => {
    // const email = req.body.userID;
    // const password = req.body.userID;
    const { email, password } = req.body;
    const query = 'SELECT email, password FROM member2 WHERE email = ?';

    if (!email || !password) {
        console.log(`이메일내용: ${email} / 비번내용: ${password} `)
        console.log('이메일과 비밀번호 모두 입력해주세요');
        return res.status(400).json({ error: 'Email and password are required' });
    }

    db.query(query, [email], (error, results) => {
        if (error) {
            console.error('Error fetching member:', error);
            return res.status(500).json({ error: 'Failed to fetch member' });
        }

        if (results.length === 0) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const user = results[0];

        if (user.password === password) {
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(400).json({ error: 'Invalid email or password' });
        }
    });
})






app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
