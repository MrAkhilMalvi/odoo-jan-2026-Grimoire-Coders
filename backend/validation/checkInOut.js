const {Joi} = require('celebrate');

module.exports = {
    store_user_checkin : {
        body : Joi.object({
            login_id : Joi.string().required()
        })
    },
    last_check_in : {
        body : Joi.object({
            login_id : Joi.string().required()
        })
    },
    store_user_checkout : {
        body : Joi.object({
            login_id : Joi.string().required()
        })
    },
}