const express = require('express');
let router = express.Router();
const item = require('../controller/item');

router.post('/add', item.add_item);

module.exports = router