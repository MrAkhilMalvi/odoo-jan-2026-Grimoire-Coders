export interface EmployeeDetails {
employee_name : string;
employee_email  : string;
employee_mobileno : string;
employee_role_type : string;
employee_department : string;
employee_position : string;
employee_nationality : string;
employee_maratial_status : string;
employee_monthly_salary : string;
employee_gender : string;
}


export interface EmployeeAPI {
  login_id: string;
  employee_name: string;
  employee_position: string;
  employee_status: string;
  profile_image?: string;
}



export interface empUpdate {
  about_desc : string;
 job_desc : string;
  hobbie_desc : string;
   login_id : string;
}