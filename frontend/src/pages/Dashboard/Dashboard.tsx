import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import EmployeeCard from "./EmployeeCard";

interface Employee {
  id: string;
  name: string;
  role: string;
  status: string;
  avatar: string;
}

interface DashboardProps {
  employees: Employee[];
}

const Dashboard: React.FC<DashboardProps> = ({ employees }) => {
  const navigate = useNavigate();

  const handleSelectEmployee = (employeeId: string) => {
    navigate(`/profile/${employeeId}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-2xl font-bold text-hr-text">Employees</h1>

        <div className="relative w-full sm:w-64">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-hr-muted"
            size={18}
          />
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-hr-card border border-hr-border rounded-lg pl-10 pr-4 py-2 text-sm text-hr-text focus:ring-1 focus:ring-hr-primary outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {employees.map((emp) => (
          <EmployeeCard
            key={emp.id}
            employee={emp}
            onClick={() => handleSelectEmployee(emp.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
