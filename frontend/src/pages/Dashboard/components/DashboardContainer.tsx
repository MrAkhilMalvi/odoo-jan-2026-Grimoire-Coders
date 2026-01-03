import { useEffect, useState } from "react";
import Dashboard from "../Dashboard";
import { employeeList } from "../../../features/Profile/services/profileService";
import { EmployeeUI } from "../types/index";

const DashboardContainer = () => {
  const [employees, setEmployees] = useState<EmployeeUI[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const res = await employeeList();

        const mapped: EmployeeUI[] = res.data.map((emp: any) => ({
          id: emp.login_id,
          name: emp.employee_name,
          role: emp.employee_position,
          status: emp.employee_status ?? "offline",
          avatar:
            emp.profile_image ??
            "/avatar-placeholder.png",
        }));

        setEmployees(mapped);
      } finally {
        setLoading(false);
      }
    };

    loadEmployees();
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;

  return <Dashboard employees={employees} />;
};

export default DashboardContainer;
