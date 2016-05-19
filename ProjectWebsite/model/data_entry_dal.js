var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.InsertProduct = function(product_name, description, sale_price, cost, callback) {
    console.log(product_name, description, sale_price, cost, callback);

    var values = [product_name, description, sale_price, cost];

    var query = 'INSERT INTO Products (prod_name, description, sale_price, cost) VALUES (?, ?, ?, ?);';

    connection.query( query, values,
        function(err, result){
            if(err)
            {
                console.log(this.sql);
                callback(err, null);
            }
            console.log(result);
            callback(err, result);
        });
};