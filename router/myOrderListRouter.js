const express = require('express');
const router = express.Router(); //eslint-disable-line
const SimpleJsonStore = require('simple-json-store');
const methodOverride = require('method-override');
// Initializes the data-2.json file with notes as its initial value if empty
const transact = new SimpleJsonStore('./transactionHistory.json');


router.get('/',(req,res) =>{
    let titleModel = req.titleModel;
    const trans = transact.get('tHistory');
    console.log(titleModel.getID);

    const sample = trans.filter(function(transs){
        return Number(transs.userId) === Number(req.titleModel.getID);
    });
    let sampleL=sample.length;
    const orderList ={
        samp:titleModel,
        sample:sample,
        sampleL: sampleL
    }
    console.log(orderList);
    res.render('myOrderList.pug',orderList )
});




module.exports = router;