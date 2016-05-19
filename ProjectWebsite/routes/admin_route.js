var express = require('express');
var router = express.Router();
var adminDal = require('../model/admin_dal');

router.get('/', function(req, res, next) {

    var data = {};

    if(req.session.account === undefined) {
        res.render('authentication/login.ejs', data);
    }
    else {
        data.access = req.session.account.access_lvl;
        data.first_name = req.session.account.first_name;
        res.render('admin/admin_main.ejs', {data : data});
    }
});

router.get('/all', function(req, res) {

    var data = {};
    data.access = req.session.account.access_lvl;
    data.first_name = req.session.account.first_name;
    
    adminDal.GetNonAdminUsers(function (err, result)
        {
            if (err) {
                data.message = "An error occured when attempting to get all users.";
            }
            else {
                res.render('admin/all_users.ejs', {rs: result, data : data});
            }
        }
    );
});

router.get('/one', function(req, res) {

    var data = {};
    data.access = req.session.account.access_lvl;
    data.first_name = req.session.account.first_name;

    adminDal.GetUserByID(req.query.account_id, function (err, result)
        {
            if (err) {
                data.message = "An error occured when attempting to get all users.";
            }
            else {
                res.render('admin/one_user.ejs', {rs: result, data : data});
            }
        }
    );
});

router.get('/one/deleteUser', function(req, res) {

    var data = {};
    data.access = req.session.account.access_lvl;
    data.first_name = req.session.account.first_name;

    adminDal.DeleteUser(req.query.account_id, function (err, result)
        {
            if (err) {
                data.message = "An error occured when attempting to delete user.";
            }
            else {
                data.message = "User has been successfully deleted.";
                res.render('admin/admin_main.ejs', {rs: result, data : data});
            }
        }
    );
});

router.get('/one/updateUser', function(req, res) {

    var data = {};
    data.access = req.session.account.access_lvl;
    data.first_name = req.session.account.first_name;

    adminDal.UpdateUser(req.query.account_id, req.query.firstName, req.query.lastName, req.query.email, req.query.access, function (err, result)
        {
            if (err) {
                data.message = "An error occured when attempting to update user.";
            }
            else {
                data.message = "User has been successfully updated.";
                res.render('admin/admin_main.ejs', {rs: result, data : data});
            }
        }
    );
});

module.exports = router;