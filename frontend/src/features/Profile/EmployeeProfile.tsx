import { useState } from "react";
import { Mail, Phone, MapPin, Calendar } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import Card from "../../shared/components/ui/Card";
import StatusDot from "../../shared/components/ui/StatusDot";
import SalaryTab from "./SalaryTab";

const TABS = [
  { id: "personal", label: "Personal Info" },
  { id: "private", label: "Private Info" },
  { id: "salary", label: "Salary Info" },
];

interface EmployeeProfileProps {
  isAdmin?: boolean;
}

const EmployeeProfile: React.FC<EmployeeProfileProps> = ({ isAdmin }) => {
  const { employeeId } = useParams<{ employeeId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("personal");

  // TODO: replace with API call
  const employee = {
    id: employeeId,
    name: "Employee Name",
    role: "UX Designer",
    status: "present",
    avatar: "https://i.pravatar.cc/150",
  };

  return (
    <div className="max-w-6xl mx-auto mt-8 px-4 animate-in fade-in">
      <button
        onClick={() => navigate("/")}
        className="text-hr-muted hover:text-hr-text mb-6"
      >
        ← Back to Employees
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6 h-fit text-center lg:col-span-1">
          <div className="relative inline-block">
            <img
              src={employee.avatar}
              alt={employee.name}
              className="w-32 h-32 rounded-full mx-auto border-4 border-hr-bg mb-4"
            />
            <div className="absolute bottom-2 right-2">
              <StatusDot status={employee.status} />
            </div>
          </div>

          <h2 className="text-xl font-bold text-hr-text">
            {employee.name}
          </h2>
          <p className="text-hr-primary font-medium">
            {employee.role}
          </p>

          <div className="mt-8 text-left space-y-4">
            <div className="flex items-center gap-3 text-sm text-hr-muted">
              <Mail size={16} /> email@company.com
            </div>
            <div className="flex items-center gap-3 text-sm text-hr-muted">
              <Phone size={16} /> +91 98765 43210
            </div>
            <div className="flex items-center gap-3 text-sm text-hr-muted">
              <MapPin size={16} /> Ahmedabad, India
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2">
          <Card className="min-h-[500px]">
            <div className="flex border-b border-hr-border">
              {TABS.map((tab) => {
                if (tab.id === "salary" && !isAdmin) return null;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 py-4 text-sm font-medium relative ${
                      activeTab === tab.id
                        ? "text-hr-primary"
                        : "text-hr-muted"
                    }`}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-hr-primary" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="p-6">
              {activeTab === "personal" && (
                <div className="text-hr-text">
                  Personal Details Component Here…
                </div>
              )}
              {activeTab === "private" && (
                <div className="text-center text-hr-muted py-10">
                  <Calendar size={48} className="mx-auto opacity-20 mb-2" />
                  Restricted Access
                </div>
              )}
              {activeTab === "salary" && isAdmin && <SalaryTab login_id={loginId} />}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
