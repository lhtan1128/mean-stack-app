require('./api/data/db.js');
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser')

var routes = require('./api/routes')

app.set('port',3000);

//middleware will run in sequence
app.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});

// print only files inside css folder
// app.use('/css', function(req, res, next) {
//     console.log(req.method, req.url);
//     next();
// });

//this will auto look for index.html file in public folder and load (localhost:3000)
app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_module', express.static(__dirname + '/node_modules'));

app.use(bodyParser.urlencoded({extended: false}));
//to handle the data send by angular (data angular sent is in json format)
app.use(bodyParser.json());

app.use('/api',routes)
// app.get('/', function(req,res){
//     console.log("GET the homepage");
//     res
//         .status(200)
//         .sendFile(path.join(__dirname, 'public', 'index.html'));
// });

app.get('/json', function(req,res){
    console.log("GET the json");
    res
        .status(200)
        .json({"jsonData": true});
});

app.get('/file', function(req,res){
    console.log("GET the file");
    res
        .status(200)
        .sendFile(path.join(__dirname, 'app.js'));
});

var server = app.listen(app.get('port'), function() {
    var port = server.address().port;
    console.log("Magic happens on port " + port);
});