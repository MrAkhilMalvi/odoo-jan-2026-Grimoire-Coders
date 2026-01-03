const express = require('express');
const router = express.Router();
const checkInOutRoute = require('./check_in_out.js')
const authRoute = require('./auth.js');


router.use('/checkinout', checkInOutRoute);
router.use('/auth', authRoute);

module.exports = router;