const express = require('express');
const router = express.Router();
// const {celebrate , Segments} = require('celebrate');
const authCtrl = require('../controller/auth');
const upload = require('../controller/multer');
const passport = require ('../helpers/passport')


router.post(
    '/signup',
    upload.fields([
      { name: 'company_profile_pdf', maxCount: 1 },
      { name: 'user_profile_pdf', maxCount: 1 }
    ]),
    authCtrl.super_Admin_Signup
  );
  
  router.post(
    '/login',
    passport.authenticate('local'),
    authCtrl.All_Signin
  );
  
  

// const paramValidation = require('../validation/checkInOut.js');
// const passport = require('../helper/passport.js')

// router.route('/signup')
// .post(
// // //    passport.isLoggedIn,
// // celebrate({[Segments.BODY] : paramValidation.store_user_checkin.body}),
// authCtrl.super_Admin_Signup
// );



module.exports = router;