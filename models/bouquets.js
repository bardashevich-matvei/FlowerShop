var fs = require('fs');

exports.findAllWithoutDescription = function (cb) {
    this.findAll(function (err, docs) {
        if (err) {
            return cb(err);
        }
        docs.forEach(function (element) {
            delete element['description'];
        });
        cb(err, docs);
    });
};

exports.findById = function (id, cb) {
    this.findAll(function (err, data) {
        if (err) return cb(err);
        var doc;
        for (var i = 0; i < data.length; i++) {
            if (data[i]._id === id) {
                doc = data[i];
                break;
            }
        }
        cb(err, doc);
    });
};

exports.findByIdWithNameAndImage = function (id, cb) {
    this.findById(id, function (err, doc) {
        if (err) return cb(err);
        doc = {
            name: doc.name,
            image: doc.image
        };
        cb(err, doc);
    })
};

exports.findAll = function (cb) {
    fs.readFile('public/resource/json/bouquets.json', 'utf8', function (err, data) {
        cb(err, err ? null : JSON.parse(data));
    });
};