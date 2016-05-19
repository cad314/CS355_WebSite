var express = require('express');
var router = express.Router();
var reportDal = require('../model/report_dal');

router.get('/', function(req, res, next) {

    var data = {};

    if(req.session.account === undefined) {
        res.render('authentication/login.ejs', data);
    }
    else {
        data.access = req.session.account.access_lvl;
        data.first_name = req.session.account.first_name;
        res.render('reports/reports_main.ejs', {data : data});
    }
});

router.get('/transactions', function(req, res) {

    var data = {};
    data.access = req.session.account.access_lvl;
    data.first_name = req.session.account.first_name;
    
    reportDal.GetAllTransactions(function (err, result)
        {
            if (err) {
                res.send("Error: " + err.message);
            }
            else {

                res.render('reports/all_transactions.ejs', {rs: result, data : data});
            }
        }
    );
});

router.get('/transactions/one', function (req, res) {

    var data = {};
    data.access = req.session.account.access_lvl;
    data.first_name = req.session.account.first_name;
    
    reportDal.GetTransactionByID(req.query.transaction_id, function (err, result) {
            if (err) throw err;
            res.render('reports/one_transaction.ejs', {rs: result, transaction_id: req.query.user_id, data : data});
        }
    ); 
});

router.get('/products', function(req, res) {

    var data = {};
    data.access = req.session.account.access_lvl;
    data.first_name = req.session.account.first_name;

    reportDal.GetAllProducts(function (err, result)
        {
            if (err) {
                res.send("Error: " + err.message);
            }
            else {

                res.render('reports/all_products.ejs', {rs: result, data : data});
            }
        }
    );
});

router.get('/products/one', function (req, res) {

    var data = {};
    data.access = req.session.account.access_lvl;
    data.first_name = req.session.account.first_name;

    reportDal.GetProductByID(req.query.product_id, function (err, result) {
            if (err) throw err;
            res.render('reports/one_product.ejs', {rs: result, product_id: req.query.user_id, data : data});
        }
    );
});

module.exports = router;