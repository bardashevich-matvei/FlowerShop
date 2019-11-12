var Users = require('../models/users');

exports.findAll = function (req, res) {
    Users.findAll(function (err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs);
    })
};

exports.auth = function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    Users.findByUsername(username, function (err, user) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        if (user) {
            if (Users.comparePassword(password, user.password)) {
                req.session.user = user._id;
                res.send({_id: user._id});
            } else {
                console.log(err);
                return res.sendStatus(500);
            }
        } else {
            console.log(err);
            return res.sendStatus(500);
        }
    });
};

exports.register = function (req, res) {
    var user = {
        username: req.body.username,
        password: Users.cryptPassword(req.body.password),
        telNumber: req.body.telNumber
    };
    Users.findByUsername(user.username, function (err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        if (doc) return res.sendStatus(500);
        Users.save(user, function (err, doc) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            res.send(doc);
        })
    })
};

exports.checkAuth = function (req, res, next) {
    if (!req.session.user) {
        next('Для доступа к данному пункту необходимо авторизироваться!');
    }
    next();
};