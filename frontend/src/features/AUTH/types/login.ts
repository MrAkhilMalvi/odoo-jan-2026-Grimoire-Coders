



export interface SignUpFormData {
  // Step 1: Basic Info
  company_name: string;
  emp_name: string;
  email: string;
  phone: string;
  password: string;
  confirmpassword: string;
  mobile_no: string;
  user_location: string; // INdia,
  maratial_status: boolean;
  gender: boolean;

  // New Fields Requested
  total_working_hours: number;
  total_paid_leave: number;
  total_sick_leave: number;

  // Salary Components (Pre-filled for UI)
  basic_salary: number;
  house_rent_allowanace: number;
  standard_allowanace: number;
  perforamance_bonus: number;
  leave_travel_allowanace: number;
  fixed_allowanace: number;
   company_profile_pdf?: File | null; 
   user_profile_pdf?: File | null; 

  // Deductions
  employee_pf: number;
  employer_pf: number;
  professional_tax: number;
}

export const INITIAL_DATA: SignUpFormData = {
  company_name: "",
  emp_name: "",
  email: "",
  phone: "",
  password: "",
  confirmpassword: "",
  mobile_no: "",
  user_location: "",
  maratial_status: false,
  gender: false,

  total_working_hours: 0,
  total_paid_leave: 0,
  total_sick_leave: 0,

  basic_salary: 0,
  house_rent_allowanace: 0,
  standard_allowanace: 0,
  perforamance_bonus: 0,
  leave_travel_allowanace: 0,
  fixed_allowanace: 0,

  employee_pf: 0,
  employer_pf: 0,
  professional_tax: 0,
};

export interface ILoginPayload {
  login_id: string;
  password: string;
  email?: string; // optional if backend requires
}

// UI STATE (Sign In Form)
export interface ISignInForm {
  identifier: string; // email OR login_id
  password: string;
}