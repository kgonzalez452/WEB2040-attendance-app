var port = process.env.PORT || 5678;
var express = require('express');
var app = express();
var bodyParser = require('body-parser'); //parses the body
var mongoDB = require('./mongo-database');
var sqlDB = require('./sql-database');
var passport = require('passport')(passport); //to create the user


app.use( function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5678');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Header', 'X-Requested-With, content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

app.use('/assets', express.static(__dirname + '/assets'));

require('./app/routes')(app, mongoDB, sqlDB);

app.listen(port, function (err){
    if(err){
        console.log('error', err);
        console.log('Server Listening on' + port);
    }
});