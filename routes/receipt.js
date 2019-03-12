const express = require('express');
let router = express.Router();
const receipt = require('../controller/receipt');

router.post('/fiscal', receipt.fiscal)
router.post('/non-fiscal', (req, res) => {})
router.post('reversal', (req, res) => {})

module.exports = router