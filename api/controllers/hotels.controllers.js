var dbconn = require('../data/dbconnection.js');
var ObjectId = require('mongodb').ObjectId;
var hotelData = require('../data/hotel-data.json')

module.exports.hotelsGetAll = function(req, res){

    var db = dbconn.get();
    var collection = db.collection('hotels');

    var offset = 0;
    var count = 5;

    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset,10)
    }

    if(req.query && req.query.count){
        count = parseInt(req.query.count,10)
    }

    collection
        .find()
        .skip(offset)
        .limit(count)
        .toArray(function(err, docs){
            console.log("Found hotels", docs);
            res
                .status(200)
                .json(docs);
        });
};

module.exports.hotelsGetOne = function(req, res){
    var db = dbconn.get();
    var collection = db.collection('hotels');

    var hotelId = req.params.hotelId;

    console.log("GET the hotelId", hotelId);

    collection
        .findOne({"_id": ObjectId(hotelId)}, function(err, docs){
            console.log("Found hotels", docs);
            res
                .status(200)
                .json(docs);
        });
};

module.exports.hotelsAddOne = function(req, res){
    var db = dbconn.get();
    var collection = db.collection('hotels');
    var newHotel;

    console.log("POST new hotel");
    if(req.body && req.body.name && req.body.stars){
        newHotel = req.body;
        newHotel.stars = parseInt(req.body.stars, 10);

        collection.insertOne(newHotel, function(err, response){
            console.log(response);
            console.log(response.ops);
            res
                .status(201)
                .json(response.ops);
        })

    }else{
        console.log("data missing from body");
        res
            .status(400)
            .json("Required data missing from body");
    }

};