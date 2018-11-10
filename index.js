const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const port = 3000;
const app = express();
const axios = require('axios');
const dateTime = require('node-datetime');
const dt = dateTime.create();
global.dateTime = dt.format('Y-m-d H:M:S');
const session =require('express-session');
const indexRouter = require('./router/indexRouter');
const registerRouter = require('./router/registerRouter');
const loginRouter = require('./router/loginRouter');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.use(express.static('public'));


app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'pug');

app.use((req,res,next) =>{
	req.viewModel ={
		title : 'S-Commerce'
	};
	next()
});

app.use('/',indexRouter);
app.use('/register',registerRouter);
app.use('/login',loginRouter);

app.listen(port,(err) =>{
	if(err){
		return console.log(err);
	}
	console.log(`Listening to ${port}...`);
});