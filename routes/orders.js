var express = require('express');
var router = express.Router();
var ordersController = require('../controller/orders');
var usersController = require('../controller/users');

router.post('/', usersController.checkAuth, ordersController.save);
router.post('/self', usersController.checkAuth, ordersController.self);

module.exports = router;