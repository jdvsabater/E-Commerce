const express = require('express');
const router = express.Router(); //eslint-disable-line
const SimpleJsonStore = require('simple-json-store');
// Initializes the data-2.json file with notes as its initial value if empty
const store = new SimpleJsonStore('./users.json');

router.post('/', function(req, res) {
	const users = store.get('users');
	let check = false;
	const registerInput= {
		firstName : req.body.firstName,
		lastName : req.body.lastName,
		email : req.body.email,
		number : req.body.number,
		username : req.body.username,
		password : req.body.password,
		address : req.body.address
	}
	if(users.length != 0){
		for(let i = 0; i < users.length; i++) {
			if(registerInput.email == users[i].email || registerInput.username == users[i].username){
				check = "Email or Username already in use."
				break;
			}else{
				const data ={
					id : users.length+1,
					firstName : registerInput.firstName,
					lastName : registerInput.lastName,
					email : registerInput.email,
					number : registerInput.number,
					username : registerInput.username,
					password : registerInput.password,
					address : registerInput.address,
					sellItems: [],
					buyItems:[]
				}
				users.push(data);
				store.set('users',users);
				check = true;
				break;
			}
		}
	}else{
		const data ={
			id : users.length+1,
			firstName : registerInput.firstName,
			lastName : registerInput.lastName,
			email : registerInput.email,
			number : registerInput.number,
			username : registerInput.username,
			password : registerInput.password,
			address : registerInput.address,
			sellItems: [],
			buyItems:[]
		}
		users.push(data);
		store.set('users',users);
		check = true;
	}
	res.send(check);
});


module.exports = router;