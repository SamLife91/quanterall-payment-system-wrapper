const express = require('express');
let router = express.Router();
const item = require('../controller/item');

router.post('/add', item.add_item);
router.post('/get', item.get_item);
router.post('/all', item.get_all_items);

module.exports = router