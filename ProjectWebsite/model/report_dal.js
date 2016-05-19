var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.GetAllTransactions = function(callback) {
    
    var query = 'SELECT transaction_id, concat(\'$\', format(trans_value, 2)) AS trans_value, '
    query += 'description, DATE_FORMAT(trans_date,\'%m/%d/%Y\') AS trans_date, source_name FROM Transactions;'
    
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
}

exports.GetTransactionByID = function(trans_id, callback) {
    console.log(trans_id);
    var query = 'SELECT transaction_id ,concat(\'$\', format(trans_value, 2)) AS trans_value, '
    query += 'description, DATE_FORMAT(trans_date,\'%m/%d/%Y\') AS trans_date, source_name FROM Transactions '
    query += 'WHERE transaction_id = ' + trans_id + ";";
    
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}

exports.GetAllProducts = function(callback) {
    
    var query = 'SELECT product_id ,concat(\'$\', format(sale_price, 2)) AS sale_price, ';
    query += 'concat(\'$\',format(cost, 4)) AS cost, prod_name, description FROM Products;';
    
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
}

exports.GetProductByID = function(prod_id, callback) {
    console.log(prod_id);
    var query = 'SELECT product_id ,concat(\'$\', format(sale_price, 2)) AS sale_price, ';
    query += 'concat(\'$\',format(cost, 4)) AS cost, prod_name, description FROM Products ';
    query += 'WHERE product_id = ' + prod_id + ";";

    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}