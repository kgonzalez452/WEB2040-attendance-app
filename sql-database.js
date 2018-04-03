var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    pas: '',
    database: 'attendance'
});

connection.connect();

module.exports = connection;