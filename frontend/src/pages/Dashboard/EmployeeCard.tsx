import StatusDot from "../../shared/components/ui/StatusDot";

interface Employee {
  id: string;
  name: string;
  role: string;
  status: string;
  avatar: string;
}

interface EmployeeCardProps {
  employee: Employee;
  onClick: () => void;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee, onClick }) => (
  <div
    onClick={onClick}
    className="group bg-hr-card border border-hr-border rounded-xl p-6 cursor-pointer hover:border-hr-primary/50 hover:shadow-lg transition-all relative overflow-hidden"
  >
    <div className="absolute top-4 right-4">
      <StatusDot status={employee.status} />
    </div>

    <div className="flex flex-col items-center">
      <img
        src={employee.avatar}
        alt={employee.name}
        className="w-20 h-20 rounded-full mb-4 border-2 border-hr-bg group-hover:scale-105 transition-transform"
      />

      <h3 className="font-bold text-hr-text text-lg">
        {employee.name}
      </h3>

      <p className="text-sm text-hr-primary">
        {employee.role}
      </p>

      <div className="mt-6 w-full pt-4 border-t border-hr-border flex justify-between text-xs text-hr-muted">
        <span>ID: {employee.id.slice(-4)}</span>
        <span>Joined: 2022</span>
      </div>
    </div>
  </div>
);

export default EmployeeCard;
