var express = require('express');
var router = express.Router();
var dataEntryDal = require('../model/data_entry_dal');

router.get('/', function(req, res, next) {

    var data = {};

    if(req.session.account === undefined) {
        res.render('authentication/login.ejs', data);
    }
    else {
        data.access = req.session.account.access_lvl;
        data.first_name = req.session.account.first_name;
        res.render('data_entry/data_entry_main.ejs', {data : data});
    }
});

router.get('/new_product', function(req, res, next) {

    var data = {};

    if(req.session.account === undefined) {
        res.render('authentication/login.ejs', data);
    }
    else {
        data.access = req.session.account.access_lvl;
        data.first_name = req.session.account.first_name;
        res.render('data_entry/add_product.ejs', {data : data});
    }
});

router.post('/add_product', function(req, res) {
    console.log(req.body);
    var data = {};

    dataEntryDal.InsertProduct(req.body.prodName, req.body.description, req.body.salePrice, req.body.cost,
        function(err){
            if(err){
                data.access = req.session.account.access_lvl;
                data.first_name = req.session.account.first_name;
                data.message = "An error occured when attempting to add the product.";
                res.render('data_entry/data_entry_main.ejs', {data : data});
            } else {
                data.access = req.session.account.access_lvl;
                data.first_name = req.session.account.first_name;
                data.message = "The New Product has been added to the database!";
                res.render('data_entry/data_entry_main.ejs', {data : data});
            }
        });
});

module.exports = router;