var db = require('../db');

exports.findAll = function (cb) {
    return db.get().collection('flowers').find().toArray(function (err, docs) {
        cb(err, docs);
    })
};

exports.findAllIdAndName = function (cb) {
    return db.get().collection('flowers').find({}, {_id: true, name: true}).toArray(function (err, docs) {
        cb(err, docs);
    })
};

exports.findById = function (id, cb) {
    return db.get().collection('flowers').findOne({_id: id}, function (err, doc) {
        cb(err, doc);
    })
};
