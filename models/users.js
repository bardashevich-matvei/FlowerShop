var db = require('../db');
var bcrypt = require('bcrypt');

exports.findAll = function (cb) {
    return db.get().collection('users').find().toArray(function (err, docs) {
        cb(err, docs);
    })
};

exports.auth = function (username, password, cb) {
    return db.get().collection('users').findOne({username: username, password: password}, {password: false}
    , function (err, doc) {
        cb(err, doc);
    })
};

exports.save = function (user, cb) {
    return db.get().collection('users').insertOne(user, function (err, doc) {
            cb(err, doc);
        });
};

exports.findById = function (id, cb) {
    return db.get().collection('users').findOne({_id: id}, function (err, doc) {
        cb(err, doc);
    })
};

exports.findByUsername = function (username, cb) {
    return db.get().collection('users').findOne({username: username}, function (err, doc) {
        cb(err, doc);
    })
};

exports.cryptPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(9))
};

exports.comparePassword = function(password, hash) {
    return bcrypt.compareSync(password, hash);
};