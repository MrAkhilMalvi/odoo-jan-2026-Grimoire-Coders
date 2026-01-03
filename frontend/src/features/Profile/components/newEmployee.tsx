import { useState } from "react";
import { newEmployee } from "../services/profileService";
import { EmployeeDetails } from "../types/index";
import { useNavigate } from "react-router-dom";

const NewEmployee = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<EmployeeDetails>({
    employee_name: "",
    employee_email: "",
    employee_mobileno: "",
    employee_role_type: "",
    employee_department: "",
    employee_position: "",
    employee_nationality: "",
    employee_maratial_status: "",
    employee_monthly_salary: "",
    employee_gender: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    await newEmployee(form);
    navigate("/dashboard"); // refresh list
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <input
        name="employee_name"
        onChange={handleChange}
        placeholder="Employee Name"
      />
      <input
        name="employee_email"
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        name="employee_mobileno"
        onChange={handleChange}
        placeholder="Mobile"
      />

      <button onClick={handleSubmit}>
        Create Employee
      </button>
    </div>
  );
};

export default NewEmployee;
