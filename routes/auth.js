const express = require('express');
let router = express.Router();
const auth = require('../controller/auth');

router.route.post('/login', auth.login);
router.route.post('/register', auth.login);

module.exports = router