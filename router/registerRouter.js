const express = require('express');
const router = express.Router(); //eslint-disable-line
const SimpleJsonStore = require('simple-json-store',);
// Initializes the data-2.json file with notes as its initial value if empty
const store = new SimpleJsonStore('./users.json',{ users: [] });
const axios = require('axios');
const expressValidator = require('express-validator')
const session =require('express-session');
const flash = require('connect-flash');
const app= express();
//------------validate
app.use(session({
    secret: "hello",
		resave: true,
		saveUninitialized: false
  }))
  app.use(require('connect-flash')());
  app.use(function(req, res, next){
     res.locals.messages = require('express-messages')(req, res);
     next();
  });
  app.use(expressValidator({
    errorFormatter: function(param, msg , value){
      var namespace = param.splice('.'),
      root = namespace.shift(),
      formParam = root;
      while(namespace.length){
        formParam += '[' + namespace.shift() + ']';
  
      }return {
        param: formParam,
        msg: msg,
        value:value
      };
    }
  }));

  //----------------------------------------
router.post('/', function(req, res) {
	const users = store.get('users');
	let check = false;
	console.log('pmsok');
	let checkdb= false;
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
				
				checkdb=true;
				break;
			}
		}
	}else{
		
		check=true;
	}
	if(checkdb == false){
		const data ={
			id : users.length+1,
			firstName : registerInput.firstName,
			lastName : registerInput.lastName,
			email : registerInput.email,
			number : registerInput.number,
			username : registerInput.username,
			password : registerInput.password,
			address : registerInput.address
		}
		users.push(data);
		store.set('users',users);
		check = true;
	}else{
		check= false;
	}
	if(checkdb==true){
		req.flash('danger',"Username or Email already Used!");
	}else{
		req.flash('success',"Account succesfully created! Login Now!");
	}
	res.redirect('/');
});


module.exports = router;
//comment mo ung nsa taas tpos uncomment mo tong nsa baba eto ung pnasa mo sakin
/*
const express = require('express');
const router = express.Router(); //eslint-disable-line
const SimpleJsonStore = require('simple-json-store',);
// Initializes the data-2.json file with notes as its initial value if empty
const store = new SimpleJsonStore('./users.json',{ users: [] });
const axios = require('axios');
const expressValidator = require('express-validator')
const session =require('express-session');
const flash = require('connect-flash');
const app= express();
let nem = require('nem-sdk').default;
//------------validate
app.use(session({
    secret: "hello",
		resave: true,
		saveUninitialized: false
  }))
  app.use(require('connect-flash')());
  app.use(function(req, res, next){
     res.locals.messages = require('express-messages')(req, res);
     next();
  });
  app.use(expressValidator({
    errorFormatter: function(param, msg , value){
      var namespace = param.splice('.'),
      root = namespace.shift(),
      formParam = root;
      while(namespace.length){
        formParam += '[' + namespace.shift() + ']';
  
      }return {
        param: formParam,
        msg: msg,
        value:value
      };
    }
  }));

  //----------------------------------------
router.post('/', function(req, res) {
	const users = store.get('users');
	let check = false;
	console.log('pmsok');
	let checkdb= false;
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
				
				checkdb=true;
				break;
			}
		}
	}else{
		
		check=true;
	}
		let rb32 = nem.crypto.nacl.randomBytes(32);
     let pkey = nem.utils.convert.ua2hex(rb32);

     let keyPair = nem.crypto.keyPair.create(pkey);

     let Nemaddress = nem.utils.format.pubToAddress(
       keyPair.publicKey.toString(),
      -104
		 );
		 
	if(checkdb == false){
		let nem = require('nem-sdk').default;
		
		
		const vdata ={
			fN : registerInput.firstName,
			lN : registerInput.lastName,
			em : registerInput.email,
			nu : registerInput.number,
			
			
			address : registerInput.address,
			privatekey: pkey

			
		}
		console.log(vdata)
		let a = JSON.stringify(vdata);
		let endpoint = nem.model.objects.create('endpoint')(nem.model.nodes.defaultTestnet, nem.model.nodes.defaultPort);

		let common = nem.model.objects.create('common')('qweqwe123','05a40d5b222a99dd19863304f33d7a8ff4acbd579c2786e81d79b9b4cf888a60');

		let transferTransaction = nem.model.objects.create('transferTransaction')("TCH6E5IE57JHLVXFMZNBGNYOC5RJWBG225XYFCHO", 0.000001, a);
		
		let preparedTransaction = nem.model.transactions.prepare('transferTransaction')(common, transferTransaction, nem.model.network.data.testnet.id);

		console.log(preparedTransaction);
		nem.model.transactions.send(common, preparedTransaction, endpoint).then(function(res){
			console.log(res);
			var txhash = res.transactionHash.data
			  console.log("TX" +txhash); 
			  
			const data ={
				id : users.length+1,
				username : registerInput.username,
				password : registerInput.password,
				nemaddress: Nemaddress,
				transactionHash: txhash
			}
			users.push(data);
			store.set('users',users);
			check = true;

		}, function(err){
			console.log(err);
		});
	
	}else{
		check= false;
	}
	if(checkdb==true){
		req.flash('danger',"Username or Email already Used!");
	}else{
		req.flash('success',"Account succesfully created! Login Now!");
	}
	res.redirect('/');
});


module.exports = router;*/