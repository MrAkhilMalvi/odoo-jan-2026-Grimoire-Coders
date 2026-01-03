const { Joi } = require('celebrate');

module.exports = {
  superadmin_signup: {
    body: Joi.object({
      company_name: Joi.string().required(),
      emp_name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      confirm_password: Joi.string().valid(Joi.ref('password')).required(),

      mobile_no: Joi.string().required(),
      user_position: Joi.string().required(),
      department: Joi.string().required(),
      user_location: Joi.string().required(),

      maratial_status: Joi.boolean().required(),
      gender: Joi.string().required(),

      basic_salary: Joi.number().precision(2).required(),
      house_rent_allowanace: Joi.number().precision(2).required(),
      standard_allowanace: Joi.number().precision(2).required(),
      perforamance_bonus: Joi.number().precision(2).required(),
      leave_travel_allowanace: Joi.number().precision(2).required(),
      fixed_allowanace: Joi.number().precision(2).required(),
      employee_pf: Joi.number().precision(2).required(),
      employer_pf: Joi.number().precision(2).required(),
      professional_tax: Joi.number().precision(2).required(),

      total_working_hours: Joi.number().integer().required(),
      total_sick_leave: Joi.number().integer().required(),
      total_paid_leave: Joi.number().integer().required()
    })
  }
};
