const {Joi} = require('celebrate');
const { employee_profile_data } = require('../controller/employee');

module.exports = {
    store_new_employee : {
        body : Joi.object({
            employee_name : Joi.string().required(),
            employee_email : Joi.string().required(),
            employee_mobileno : Joi.string().min(10).max(10).required(),
            employee_role_type : Joi.string().required(),
            employee_department : Joi.string().required(),
            employee_position : Joi.string().required(),
            employee_nationality : Joi.string().required(),
            employee_maratial_status : Joi.boolean().required(),
            employee_monthly_salary : Joi.number().required(),
            employee_gender : Joi.string().required()
        })
    },

    employee_profile_data : {
        body : Joi.object({
            login_id : Joi.string().required()
        })
    },

    employee_salary_details : {
        body : Joi.object({
            login_id : Joi.string().required()
        })
    },

    update_employee_profile : {
        body : Joi.object({
            login_id : Joi.string().required(),
            about_desc : Joi.string().required() , 
            job_desc  : Joi.string().required(), 
            hobbie_desc  : Joi.string().required()
        }) 
    }
}