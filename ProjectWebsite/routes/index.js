var express = require('express');
var router = express.Router();
var adminDal = require('../model/admin_dal.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    var data = {login : true}

    if(req.session.account === undefined) {
        res.render('authentication/login.ejs', {data : data});
    }
    else {
        data.access = req.session.account.access_lvl;
        data.first_name = req.session.account.first_name;
        res.render('index', {data : data});
    }
});

router.get('/about', function(req, res, next) {
    if(req.session.account === undefined) {
        res.render('about.ejs', {data : ''});
    }
    else {
        var data = {};
        data.access = req.session.account.access_lvl;
        data.first_name = req.session.account.first_name;
        res.render('about.ejs', {data : data});
    }
});

router.get('/signup', function(req, res) {
    adminDal.AddUser(req.query.first, req.query.last, req.query.email, req.query.password1, function (err, account) {

        var data = {first_name : account[0],last_name : account[1], email : account[2], password : account[3], access_lvl : account[4]};

        if(err) {
            res.json(err.message);
        }
        else if (account == null) {
            res.json(null);
        }
        else {
            req.session.account = data;
            res.json(data);
        }
    });
});


router.get('/authenticate', function(req, res) {
    adminDal.GetByEmail(req.query.email, req.query.password, function (err, account) {

        if(err) {
            res.json(err.message);
        }
        else if (account == null) {
            res.json(null);
        }
        else {
            req.session.account = account;
            res.json(account);
        }
    });
});

router.get('/login', function(req, res, next) {
    if(req.session.account) {
        res.redirect('/'); //user already logged in so send them to the homepage.
    }
    else {
        var data = {};
        res.render('authentication/login.ejs', {login:true, data : data});
    }
});

router.get('/logout', function(req, res) {
    var data = {};
    req.session.destroy();
    res.render('authentication/login.ejs', {login:true, data : data});
});

module.exports = router;