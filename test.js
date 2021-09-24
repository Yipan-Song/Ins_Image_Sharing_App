var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678"
});

con.connect(function(err) {
    if (err)
         console.log("Error connecting to Database "+ err);
     else
        console.log("Connected to Database");
});