const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const port = 2500;
const app = express();
const axios = require('axios');
const dateTime = require('node-datetime');
const dt = dateTime.create();
global.dateTime = dt.format('Y-m-d H:M:S');
const session =require('express-session');
const indexRouter = require('./router/indexRouter');
const registerRouter = require('./router/registerRouter');
const loginRouter = require('./router/loginRouter');
const serviceRouter = require('./router/serviceRouter');
const productRouter = require('./router/productRouter');
const myProdServRouter = require('./router/myProdServRouter');
const deleteRouter = require('./router/deleteRouter');
const editProductRouter = require('./router/editProductRouter');
const editServiceRouter = require('./router/editServiceRouter');
const buyProdServ = require('./router/buyProdServRouter');
const orderProdRouter = require('./router/orderProdRouter');
const orderTransactionRouter = require('./router/orderTransactionRouter');
const myOrderListRouter = require('./router/myOrderListRouter');
const SimpleJsonStore = require('simple-json-store');
const store = new SimpleJsonStore('./users.json');
const expressValidator = require('express-validator')

const flash = require('connect-flash');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var getid = [];
app.use((req, res, next) => {
	req.titleModel = {
        title: 'ECOM',
        //value ng getid na dneclare sa taas mappunta dto sa getID
		getID: getid
	}
    next();
    
});
//------------validate
app.use(session({
    secret: "hello",
    resave: true
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
app.use(express.static('public'));

app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'pug');
  //----------------------------------------
app.post('/', function(req, res) {
    let titleModel = req.titleModel;
    const users = store.get('users');
    var check ='login.pug';
    for(var i = 0; i < users.length; i++) {
        if(req.body.usernameL == users[i].username && req.body.passwordL == users[i].password){
            //ung value getid ung mappunta sa var n dneclare sa taas
            getid = users[i].id;
            console.log(getid);
            console.log('success login');
            check ='homepage.pug'
            
           
            
        }else{
            console.log('Incorrect user or pw');
            
        }
        
    }
    
    res.render(check, titleModel);


});


app.use('/',indexRouter);
app.use('/login',loginRouter);
app.use('/register',registerRouter);
app.use('/service', serviceRouter);
app.use('/product', productRouter);
app.use('/myProdServ',myProdServRouter);
app.use('/updateProd',editProductRouter);
app.use('/updateServ',editServiceRouter);
app.use('/delete',deleteRouter);
app.use('/buyProdServ', buyProdServ);
app.use('/orderProduct', orderProdRouter);
app.use('/orderTransaction', orderTransactionRouter);
app.use('/myOrderList', myOrderListRouter);

app.listen(port,(err) =>{
	if(err){
		return console.log(err);
	}
	console.log(`Listening to ${port}...`);
});