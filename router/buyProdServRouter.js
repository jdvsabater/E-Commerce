
const express = require('express');
const router = express.Router(); //eslint-disable-line
const SimpleJsonStore = require('simple-json-store');
const methodOverride = require('method-override');
// Initializes the data-2.json file with notes as its initial value if empty
const store = new SimpleJsonStore('./users.json');
const product = new SimpleJsonStore('./product.json');
const service = new SimpleJsonStore('./service.json');

router.get('/',(req,res) =>{
    let titleModel = req.titleModel;
    const prod = product.get('productPost');
    const serv = service.get('servicePost');
    
    console.log(titleModel.getID);

    
    const sample = prod.filter(function(prodd){
        return Number(prodd.userId) !== Number(titleModel.getID);
    });
    
    let sampL = sample.length;
    
    


    const buyProd ={
        samp:titleModel,
        serv: serv,
        prod: prod,
        sample:sample,
        sampL: sampL
    }
    console.log(buyProd);
    res.render('buyProdServ',buyProd )
});




module.exports = router;