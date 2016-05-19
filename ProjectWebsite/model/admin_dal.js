var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.GetByEmail = function(email, password, callback) {
    var query = 'CALL Account_GetByEmail(?, ?)';
    var query_data = [email, password];

    connection.query(query, query_data, function(err, result) {
        if(err){
            callback(err, null);
        }
        /* NOTE: Stored Procedure results are wrapped in an extra array
         and only one user record should be returned,
         // so return only the one result*/
         else if(result[0].length == 1) {
            callback(err, result[0][0]);
         }
         else {
            callback(err, null);
         }
    });
 };

exports.GetNonAdminUsers = function(callback) {
    var query = 'SELECT account_id, first_name, last_name, email, access_lvl FROM WebUser';
    query += ' WHERE access_lvl < 3;';

    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            console.log(result);
            callback(false, result);
        }
    );
};

exports.GetUserByID = function(user_id, callback) {
    var query = 'SELECT account_id, first_name, last_name, email, access_lvl FROM WebUser';
    query += ' WHERE account_id = ?;';

    connection.query(query, user_id,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            console.log(result);
            callback(false, result);
        }
    );
};

exports.AddUser = function(first_name, last_name, email, password, callback) {
    console.log(first_name, last_name, email, password, callback);

    var values = [first_name, last_name, email, password, 0];//Access lvl of 0 by default

    var query = 'INSERT INTO WebUser(first_name, last_name, email, password, access_lvl) VALUES (?, ?, ?, ?, ?);';
    
    connection.query( query, values,
        function(err, result){
            if(err)
            {
                console.log(this.sql);
                callback(err, null);
            }

            console.log(values);
            callback(err, values);
        });
};

exports.DeleteUser = function(user_id, callback) {
    console.log(user_id, callback);

    var query = 'DELETE FROM WebUser WHERE account_id = ?;';

    connection.query( query, user_id,
        function(err, result){
            if(err)
            {
                console.log(this.sql);
                callback(err, null);
            }

            console.log(true);
            callback(err, true);
        });
};

exports.UpdateUser = function(user_id,first,last,email,access,callback) {
    console.log(user_id,first,last,email,access, callback);

    var data = [first,last,email,access,user_id];
    var query = 'UPDATE WebUser SET first_name = ?, last_name = ?, email = ?, access_lvl = ? WHERE account_id = ?;';

    connection.query( query, data,
        function(err, result){
            if(err)
            {
                console.log(this.sql);
                callback(err, null);
            }

            console.log(true);
            callback(err, true);
        });
};