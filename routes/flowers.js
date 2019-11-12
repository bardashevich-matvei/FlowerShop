var express = require('express');
var router = express.Router();
var flowersController = require('../controller/flowers');

router.get('/', flowersController.findAllIdAndName);
router.get('/:id', flowersController.findById);

module.exports = router;