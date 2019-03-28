const express = require('express');
let router = express.Router();
const device = require('../controller/device');

router.post('/', device.all)
router.post('/list', device.get_device)
router.post('/add', device.add_device)
router.post('/status', device.status)
router.post('/get-time',device.get_time)
router.post('/set-time', device.set_time)

router.post('/documents', device.documents)

module.exports = router