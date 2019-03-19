const express = require('express');
let router = express.Router();
const auth = require('../controller/auth');

router.post('/login', auth.login)
router.post('/register', auth.register)

module.exports = router