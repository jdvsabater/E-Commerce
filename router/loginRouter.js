const express = require('express');
const router = express.Router(); 
const SimpleJsonStore = require('simple-json-store');

const store = new SimpleJsonStore('./users.json');


router.post('/', function(req, res) {
	const users = store.get('users');
	let check = false;
	const registerInput= {
		usernameL : req.body.usernameL,
        passwordL : req.body.passwordL,
    }

    for(let i = 0; i < users.length; i++) {
        if(registerInput.usernameL == users[i].username && registerInput.passwordL == users[i].password){
            check = true;
            console.log('hello');
            break;
        
        }
	
    }
    console.log(check);
    res.send(check);
});


module.exports = router;