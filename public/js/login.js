// const db = require('./db');

// var express = require('express');
// var router = express.Router();

// router.get('/login2', function (req, res) {
//     res.render('welcome.ejs');
// });


console.log('hello login');

document.addEventListener('DOMContentLoaded', function() {

    const loginForm = document.querySelector('form[name="user_info"]');
    // const loginForm = document.getElementById('login-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    const query = 'SELECT email,password FROM member2;'

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        if (emailInput.value && passwordInput.value) {
            fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: emailInput.value, password: passwordInput.value })
            })
            .then(response => response.json())
            .then(data => {
                if (data.message === 'Login successful') {
                    console.log('로그인되었습니다');
                    alert('로그인 되었습니다.')
                    window.location.href = '/Musical_1_Success.html';
                    console.log(data);
                    console.log(data.message);
                } else {
                    alert('회원정보가 일치하지 않습니다');
                    console.log(data);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('서버와 통신 중 오류가 발생했습니다');
            });
        } else {
            alert('이메일과 비밀번호를 모두 입력해주세요');
        }





        // if(emailInput && passwordInput) {
        //     db.query(query, (error, results) => {
        //         for(i=0; i < results.length; i++) {
        //             if(emailInput.value == results[i].email) {
        //                 console.log("로그인되었습니다");
        //                 window.location.href = '/index.html';
        //             } else {
        //                 alert("회원정보가 일치하지 않습니다");
        //             }
        //         }
        //     })
        // } else {
        //     alert("회원이메일과 비밀번호를 모두 입력해주세요");
        // }


    })
    


})