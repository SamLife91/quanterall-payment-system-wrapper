const express = require('express');
let router = express.Router();
const operator = require('../controller/operator');

router.post('/info', operator.get_operator)

module.exports = router