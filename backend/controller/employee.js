const dbClient = require('../db.js');
const {status} = require('http-status');
const bcrypt = require('bcrypt');
const saltRoute = 10;

async function store_new_employee(req,res,next){
    const {
        employee_name,
        employee_email,
        employee_mobileno,
        employee_role_type,
        employee_department,
        employee_position,
        employee_nationality,
        employee_maratial_status,
        employee_monthly_salary,
        employee_gender
    } = req.body;

    const {
        login_id,
        company_id
    } = req.user;

    try {

    const filename = req.file.filename;

    const filepath = `/uploads/${filename}`;

    const resultProfileId = await dbClient.query('select * from store_profile_path($1)', [filepath]);

    const profileId = resultProfileId.rows[0].profile_id;

    const hasPassword = await bcrypt.hash(employee_mobileno, saltRoute);

    const companycodeResult = await dbClient.query('select * from get_company_code($1)', [company_id]);

    const companyCode = companycodeResult.rows[0].company_code;

    const emplCountResult = await dbClient.query('select * from get_company_employee_count($1)', [company_id]);

    const emplCount = emplCountResult.rows[0].total_employee;

    const userLoginId = generateLoginId(companyCode, employee_name, emplCount ); 

    // storing new employee data
    await dbClient.query('select * from store_new_employee_data($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)', [
        company_id,
        employee_name,
employee_email,
hasPassword,
employee_mobileno,
login_id,
employee_role_type,
employee_department,
employee_position,
employee_nationality,
employee_maratial_status,
employee_monthly_salary,
profileId,
userLoginId,
employee_gender
    ]);

    res.send({success : true});

    } catch (error) {
        res.status(status.INTERNAL_SERVER_ERROR).send({success : false, message : 'New employee data is not stored.'});
    }
}

function generateLoginId({
  companyCode,
  employeeName,
  employeeCount
}) {
  if (!companyCode || !employeeName || employeeCount == null) {
    throw new Error("Missing required fields");
  }

  // Normalize name
  const nameParts = employeeName.trim().split(/\s+/);

  const firstName = nameParts[0];
  const lastName = nameParts[nameParts.length - 1];

  const firstCode = firstName.substring(0, 2).toUpperCase();
  const lastCode = lastName.substring(0, 2).toUpperCase();

  const year = new Date().getFullYear();

  const paddedCount = String(employeeCount).padStart(4, "0");

  return `${companyCode.toUpperCase()}${firstCode}${lastCode}${year}${paddedCount}`;
}


async function get_employee_list(req,res,next){
    const {
        company_id
    } = req.user;

    try {
        const result = await dbClient.query('select * from get_employee_list($1)', [company_id]);

        res.send({success : true, result : result.rows});
    } catch (error) {
        res.status(status.INTERNAL_SERVER_ERROR).send("Internal server error")
    }
}

async function employee_profile_data(req,res,next){
    const {login_id } = req.body;
    try {
        const reuslt = await dbClient.query('select * from get_employee_profile_data($1)', [login_id]);

        res.send({success : true});
    } catch (error) {
        res.status(status.INTERNAL_SERVER_ERROR).send({success : false});
    }
}

async function employee_salary_details(req,res,next){
    const { login_id } = req.body;
    try {

const salResult = await dbClient.query(
      "SELECT * FROM get_basic_salary_info($1)",
      [req.user.company_id]
    );

    if (salResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Salary structure not configured"
      });
    }

    const cut = salResult.rows[0];

    // 2️⃣ Get employee monthly salary
    const empResult = await dbClient.query(
      "SELECT * FROM get_employe_salary_details($1)",
      [login_id]
    );

    if (empResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Employee salary not found"
      });
    }

    const emp = empResult.rows[0];
    const monthlyWage = emp.monthly_wage;

    // 3️⃣ Salary breakup calculations
    const salaryBreakup = {
      monthly_wage: monthlyWage,
      yearly_wage: emp.yearly_wage,

      // Earnings (% based)
      basic_salary: Math.round(monthlyWage * cut.basic_salary / 100),
      house_rent_allowance: Math.round(monthlyWage * cut.house_rent_allowanace / 100),
      standard_allowance: Math.round(monthlyWage * cut.standard_allowanace / 100),
      performance_bonus: Math.round(monthlyWage * cut.performance_bonus / 100),
      leave_travel_allowance: Math.round(monthlyWage * cut.leave_travel_allowanace / 100),
      fixed_allowance: Math.round(monthlyWage * cut.fixed_allowanace / 100),

      // Deductions
      employee_pf: Math.round(monthlyWage * cut.employee_pf / 100),
      employer_pf: Math.round(monthlyWage * cut.employer_pf / 100),

      // ✅ FIXED RUPEE VALUE (IMPORTANT)
      professional_tax: cut.professional_tax
    };

    // 4️⃣ Totals
    salaryBreakup.total_earnings =
      salaryBreakup.basic_salary +
      salaryBreakup.house_rent_allowance +
      salaryBreakup.standard_allowance +
      salaryBreakup.performance_bonus +
      salaryBreakup.leave_travel_allowance +
      salaryBreakup.fixed_allowance;

    salaryBreakup.total_deductions =
      salaryBreakup.employee_pf +
      salaryBreakup.professional_tax;

    salaryBreakup.net_salary =
      salaryBreakup.total_earnings - salaryBreakup.total_deductions;

    // 5️⃣ Final response
    return res.status(200).json({
      success: true,
      data: salaryBreakup
    });
    } catch (error) {
        res.status(status.INTERNAL_SERVER_ERROR).send({success : false});
    }
}


async function update_employee_profile(req,res,next){
    const {about_desc, job_desc, hobbie_desc, login_id} = req.body;
    try {
        await dbClient.query('select * from update_employee_info($1, $2, $3, $4)', [about_desc, job_desc, hobbie_desc, login_id])
    } catch (error) {
        res.status(status.INTERNAL_SERVER_ERROR).send({success : false});
    }
}



module.exports = {
    store_new_employee,
    get_employee_list,
    employee_profile_data,
    employee_salary_details,
    update_employee_profile
}