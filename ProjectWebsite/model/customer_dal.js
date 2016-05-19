var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.InsertCustomer = function(first, mid, last, email, phone,  street1, street2, city, state, zip, country, callback) {
    console.log(first, mid, last, email, phone,  street1, street2, city, state, zip, country, callback);

    //Convert telephone string into pure numbers for database
    var tel = phone;
    var numb = tel.match(/\d/g);
    if(numb)
        numb = numb.join("");

    var values = [first, mid, last, email, numb, street1, street2, city, state, zip, country];

    var query = 'CALL Customer_Add(?,?,?,?,?,?,?,?,?,?,?);';

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
}

exports.InsertAddress = function(customer_id, street1, street2, city, state, zip, country, callback) {
    console.log(customer_id, street2, city, state, zip, country, callback);

    var values = [customer_id, street1, street2, city, state, zip, country];

    var query = 'INSERT INTO Addresses (customer_id, street_1, street_2, city, state, zip, country) ';
    query += 'VALUES (?, ?, ?, ?, ?, ?, ?);';

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
}