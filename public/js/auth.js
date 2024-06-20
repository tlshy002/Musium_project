// var express = require('express');
// var router = express.Router();
// var db = require('../js/db.js');
console.log('Hello!!!');

document.addEventListener('DOMContentLoaded', function() {

    const memberForm = document.querySelector('form[name="user_info"]');
    const emailInput = document.getElementById('email');
    const nameInput = document.getElementById('name');
    const passwordInput = document.getElementById('password');
    const passCheck = document.getElementById('pass_check');
    const nicknameInput = document.getElementById('nickname');
    

    // Add new member
    memberForm.addEventListener('submit', async(event) =>{
        event.preventDefault(); // 폼의 기본 제출 동작을 막음
        const newMember ={ 
            email : emailInput.value,
            name : nameInput.value,
            password : passwordInput.value,
            passCheck : passCheck.value,
            nickname : nicknameInput.value
        };
        

        await fetch('http://localhost:3000/member', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newMember)
        })
        .then(response => response.json())
        .then(data => {
            if(data.error) {
                alert('회원가입에 실패했습니다: ' + data.error);
            } else {
                alert('회원가입이 성공적으로 완료됐습니다.')
                window.location.href = '/Login.html';
            }
            // emailInput.value = '';
            // nameInput.value = '';
            // passwordInput.value = '';
            // nicknameInput.value = '';
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

    })

})




