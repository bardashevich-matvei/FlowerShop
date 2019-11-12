var Bouquets = require('../models/bouquets');

exports.findAllWithoutDescription = function (req, res) {
    Bouquets.findAllWithoutDescription(function (err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs);
    })
};

exports.findById = function (req, res) {
    Bouquets.findById(Number(req.params.id), function (err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        if (!doc) return res.sendStatus(500);
        res.render('pages/catalogFlower', {
            head: {title: doc.name},
            data: doc
        });
    })
};
