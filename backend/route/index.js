const express = require('express');
const router = express.Router();
const checkInOutRoute = require('./check_in_out.js')

router.route('/checkinout', checkInOutRoute)

module.exports = router;