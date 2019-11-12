var Flowers = require('../models/flowers');
var ObjectID = require('mongodb').ObjectID;

exports.findAll = function (req, res) {
    Flowers.findAll(function (err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs);
    })
};

exports.findAllIdAndName = function (req, res) {
    Flowers.findAllIdAndName(function (err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.render('pages/flowers', {
            head: {title: 'Доставка цветов, Минск, дешево'},
            data: docs
        });
    })
};

exports.findById = function (req, res) {
    Flowers.findById(ObjectID(req.params.id), function (err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(doc);
    })
};