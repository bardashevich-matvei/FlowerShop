var db = require('../db');

exports.save = function (order, cb) {
    return db.get().collection('orders').insertOne(order, function (err, doc) {
        cb(err, doc);
    });
};

exports.findAllByUserId = function (id, cb) {
    return db.get().collection('orders').find({userId: id}).toArray(function (err, docs) {
        cb(err, docs);
    });
};