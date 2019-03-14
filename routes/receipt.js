const express = require('express');
let router = express.Router();
const receipt = require('../controller/receipt');

router.post('/fiscal', receipt.fiscal)
router.post('/non-fiscal', receipt.non_fiscal)
router.post('/reversal', receipt.reversal)

module.exports = router