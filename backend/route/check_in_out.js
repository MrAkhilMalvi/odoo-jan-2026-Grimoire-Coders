const express = require('express');
const router = express.Router();
const {celebrate , Segments} = require('celebrate');
const checkInOutCtrl = require('../controller/checkInOut.js');
const paramValidation = require('../validation/checkInOut.js');
// const passport = require('../helper/passport.js')

router.route('/store/checkin')
.post(
//    passport.isLoggedIn,
celebrate({[Segments.BODY] : paramValidation.store_user_checkin.body}),
checkInOutCtrl.store_user_checkin
);

router.route('/store/checkout')
.post(
//    passport.isLoggedIn,
celebrate({[Segments.BODY] : paramValidation.store_user_checkout.body}),
checkInOutCtrl.store_user_checkout
);

router.route('/last/checkin')
.post(
//    passport.isLoggedIn,
celebrate({[Segments.BODY] : paramValidation.last_check_in.body}),
checkInOutCtrl.last_check_in
);

module.exports = router;