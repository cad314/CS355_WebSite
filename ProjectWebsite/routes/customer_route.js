var express = require('express');
var router = express.Router();
var customerDal = require('../model/customer_dal');

router.get('/', function(req, res, next) {

    var data = {};

    if(req.session.account === undefined) {
        res.render('authentication/login.ejs', data);
    }
    else {
        data.access = req.session.account.access_lvl;
        data.first_name = req.session.account.first_name;
        res.render('customer/customer_main.ejs', {data : data});
    }
});

router.get('/new', function(req, res, next) {

    var data = {};
    
    if(req.session.account === undefined) {
        res.render('authentication/login.ejs', {data : data});
    }
    else {

        data.access = req.session.account.access_lvl;
        data.first_name = req.session.account.first_name;
        res.render('customer/add_customer_form.ejs', {data : data});
    }
});

router.post('/add_customer', function(req, res) {
    console.log(req.body);
    var data = {};

    customerDal.InsertCustomer(req.body.firstName, req.body.initial, req.body.lastName,
        req.body.emailAddress, req.body.phoneNumber, req.body.address1, req.body.address2,
        req.body.city, req.body.state, req.body.zip, req.body.countries,
        function(err){
            if(err){
                data.access = req.session.account.access_lvl;
                data.first_name = req.session.account.first_name;
                data.message = "An error occured when attempting to save customer.";
                res.render('customer/customer_main.ejs', {data : data});
            } else {
                data.access = req.session.account.access_lvl;
                data.first_name = req.session.account.first_name;
                data.message = "The Customer has been saved to the database!";
                res.render('customer/customer_main.ejs', {data : data});
            }
        });
});

module.exports = router;