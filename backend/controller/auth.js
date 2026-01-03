const dbClient = require('../db.js');
const { status } = require('http-status');
const bcrypt = require("bcrypt");
let saltRounds = 10;

async function getHashPassword(password) {
    try {
        return await bcrypt.hash(password, saltRounds);
    } catch (err) {
        throw err;
    }
}

async function comparePassword(userPassword, dbPassword) {
    return await bcrypt.compare(userPassword, dbPassword);
}

async function super_Admin_Signup(req, res, next) {
    const {
        company_name,
        emp_name,
        email,
        password,
        confirm_password,
        mobile_no,
        user_position,
        department,
        user_location,
        maratial_status,
        gender,
        basic_salary,
        house_rent_allowanace,
        standard_allowanace,
        perforamance_bonus,
        leave_travel_allowanace,
        fixed_allowanace,
        employee_pf,
        employer_pf,
        professional_tax,
        total_working_hours,
        total_sick_leave,
        total_paid_leave
    } = req.body;

    console.log(req.body)
    try {

        const company_profile_id = req.files.company_profile_pdf[0].path;
        const profile_id = req.files.user_profile_pdf[0].path;

        const data = await dbClient.query("select * from generate_company_code($1)", [company_name]);
       
        const company_code = data.rows[0].generate_company_code;
  
        console.log('company_code',company_code)
        const hashpassword = await getHashPassword(password);
        // const confirmpassword = await getHashPassword(confirm_password);

        // const isPasswordMatch = await comparePassword(password,confirmpassword);
        // if (!isPasswordMatch) {
        //     res.status(400).send({
        //         success: false,
        //         messagee: "Incorrect confirm password  OR  password."

        //     });
        // }
        console.log('hashpassword',hashpassword)
        const result = await dbClient.query("select * from superadmin_signup_insert($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25)",
            [
                company_name,
                company_profile_id,
                company_code,
                emp_name,
                email,
                hashpassword,
                mobile_no,
                user_position,
                department,
                user_location,
                profile_id,
                maratial_status,
                gender,
                basic_salary,
                house_rent_allowanace,
                standard_allowanace,
                perforamance_bonus,
                leave_travel_allowanace,
                fixed_allowanace,
                employee_pf,
                employer_pf,
                professional_tax,
                total_working_hours,
                total_sick_leave,
                total_paid_leave]
        );
        console.log('result',result)
        return res.send({ success: true, result: result });
    } catch (error) {
        if (error.code === '23505') {
            return res.status(409).json({
              message: 'Company already exists. Try a different company name.'
            });
          }
          return res.status(status.INTERNAL_SERVER_ERROR).send({ success: false, message: 'Your check in time is not store please call admin person.' })
    }
}
async function All_Signin(req, res, next) {
    
    try {
        const { login_id , password } = req.body;

        const result = await dbClient.query("select * from auth_signin_by_login_id($1)",[login_id]);

        if (!result || result.rows.length === 0) {
            res.status(400).send({
                success: false,
                messagee: "user details are wrong"

            });
        }

        const isPasswordMatch = await comparePassword(password,result.rows[0].password_hash);
        if (!isPasswordMatch) {
            res.status(400).send({
                success: false,
                messagee: "user details are wrong"

            });
        }

        return res.send({ success: true, result: result.rows[0] });

    } catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR).send({ success: false, message: 'Your check in time is not store please call admin person.' })
    }
}

async function logout(req, res, next) {
    
    try {
        const { login_id , password } = req.body;

        const result = await dbClient.query("select * from auth_signin_by_login_id($1)",[login_id]);

        if (!result || result.rows.length === 0) {
            res.status(400).send({
                success: false,
                messagee: "user details are wrong"

            });
        }

        const isPasswordMatch = await comparePassword(password,result.rows[0].password_hash);
        if (!isPasswordMatch) {
            res.status(400).send({
                success: false,
                messagee: "user details are wrong"

            });
        }

        return res.send({ success: true, result: result.rows[0] });

    } catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR).send({ success: false, message: 'Your check in time is not store please call admin person.' })
    }
}

module.exports = {
    super_Admin_Signup,
    All_Signin

}
