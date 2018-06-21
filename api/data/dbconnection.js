var MongoClient = require('mongodb').MongoClient;
var Server = require('mongodb').Server;
var dburl = 'mongodb://localhost:27017';

var _connection = null;

var open = function() {
    MongoClient.connect(dburl ,function(err, client){
        if(err){
            console.log("DB connection failed.",err);
            return;
        }
        var db = client.db('meanhotel');

        _connection = db;
        console.log("DB connection open", db);
    });

    // var mongoClient = new MongoClient(new Server("localhost", 27017), {native_parser: true});
    //
    // mongoClient.open(function(err, mongoclient) {
    //         if(err){
    //             console.log("DB connection failed");
    //             return;
    //         }
    //
    //         _connection = d
    // });
};

var get = function() {
    return _connection;
};

module.exports ={
    open: open,
    get: get
}