const express = require('express');
const router = express.Router();
const {celebrate , Segments} = require('celebrate');
const employeeCTRL = require('../controller/employee');
const paramValidation = require('../validation/employee');
// const passport = require('../helper/passport.js')

router.route('/store/new/employee')
.post(
    // passport.isLoggedIn,
    celebrate({[Segments.BODY] : paramValidation.store_new_employee.body}),
    employeeCTRL.store_new_employee
);

router.route('/employee/list')
.get(
    // passport.isLoggedIn,
    employeeCTRL.get_employee_list
);

router.route('/employee/profile')
.post(
    // passport.isLoggedIn,
    celebrate({[Segments.BODY] : paramValidation.employee_profile_data.body}),
    employeeCTRL.employee_profile_data
)

router.route('/employee/salary/details')
.post(
    // passport.isLoggedIn,
    celebrate({[Segments.BODY] : paramValidation.employee_salary_details.body}),
    employeeCTRL.employee_salary_details
);

router.route('/update/employee/profile')
.post(
    // passport.isLoggedIn,
    celebrate({[Segments.BODY] : paramValidation.update_employee_profile.body}),
    employeeCTRL.update_employee_profile
)


module.exports = router;