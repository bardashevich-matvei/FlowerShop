var express = require('express');
var router = express.Router();
var usersController = require('../controller/users');

router.get('/', function (req, res) {
    res.render('pages/index', {head: {title: 'Доставка цветов, Минск, дешево'}});
});

router.get('/registration', function (req, res) {
    res.render('pages/registration', {head: {title: 'Регистрация'}});
});

router.post('/registration', usersController.register);

router.get('/login', function (req, res) {
    res.render('pages/login', {head: {title: 'Авторизация'}});
});

router.post('/login', usersController.auth);

router.get('/about', function (req, res) {
    res.render('pages/about', {head: {title: 'О нас'}});
});

router.get('/logout', function (req, res) {
    if (req.session.user) {
        delete req.session.user;
        res.end('{"status" : 200}');
    }
});

module.exports = router;