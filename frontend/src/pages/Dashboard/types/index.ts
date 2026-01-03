export interface EmployeeAPI {
  login_id: string;
  employee_name: string;
  employee_position: string;
  employee_status: string;
  profile_image?: string;
}

export interface EmployeeUI {
  id: string;
  name: string;
  role: string;
  status: string;
  avatar: string;
}
