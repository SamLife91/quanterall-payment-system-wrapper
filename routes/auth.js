const express = require('express');
let router = express.Router();
const auth = require('../controller/auth');

router.post('/login', (req, res, next) => {
  auth.login(req, res, next)
})
router.post('/register', auth.register)

module.exports = router