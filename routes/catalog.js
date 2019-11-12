var express = require('express');
var router = express.Router();
var bouquetsController = require('../controller/bouquets');

router.get('/', function (req, res) {
    res.render('pages/catalog', {head: {title: 'Букеты'}});
});

router.get('/list', bouquetsController.findAllWithoutDescription);

router.get('/:id', bouquetsController.findById);

module.exports = router;