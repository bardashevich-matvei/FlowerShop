var Orders = require('../models/orders');
var Bouquets = require('../models/bouquets');
var ObjectID = require('mongodb').ObjectID;

exports.save = function (req, res) {
    var order = req.body;
    order.userId = ObjectID(order.userId);
    Bouquets.findByIdWithNameAndImage(Number(order.bouquetId), function (err, bouquet) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        } else {
            if (!bouquet) return res.sendStatus(500);
            order.bouquet = bouquet;
            Orders.save(order, function (err, doc) {
                if (err) {
                    console.log(err);
                    return res.sendStatus(500);
                }
                res.send(doc);
            })
        }
    });
};

exports.self = function (req, res) {
    var user = req.body;
    Orders.findAllByUserId(ObjectID(user._id), function (err, orders) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.render('pages/myOrders', {
            head: {title: 'Мои заказы'},
            data: orders
        });
    })
};