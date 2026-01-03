import { useEffect, useState } from "react";
import { DollarSign, Save } from "lucide-react";
import { empSalary, employeeUpdate } from "./services/profileService";

interface SalaryTabProps {
  login_id: string;
}

interface SalaryState {
  basic_salary: number;
  hra_percentage: number;
  fixed_allowance: number;
}

const SalaryTab: React.FC<SalaryTabProps> = ({ login_id }) => {
  const [salary, setSalary] = useState<SalaryState>({
    basic_salary: 0,
    hra_percentage: 0,
    fixed_allowance: 0,
  });

  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  /* -------------------- FETCH SALARY ON TAB OPEN -------------------- */
  useEffect(() => {
    const fetchSalary = async () => {
      try {
        setLoading(true);
        const res = await empSalary(login_id);

        setSalary({
          basic_salary: res.basic_salary ?? 0,
          hra_percentage: res.hra_percentage ?? 0,
          fixed_allowance: res.fixed_allowance ?? 0,
        });
      } catch (err) {
        console.error("Failed to load salary");
      } finally {
        setLoading(false);
      }
    };

    fetchSalary();
  }, [login_id]);

  /* -------------------- CALCULATE TOTAL -------------------- */
  useEffect(() => {
    const hraAmount =
      (salary.basic_salary * salary.hra_percentage) / 100;
    const gross =
      salary.basic_salary + hraAmount + salary.fixed_allowance;

    setTotal(gross);
  }, [salary]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSalary((prev) => ({
      ...prev,
      [e.target.name]: Number(e.target.value),
    }));
  };

  /* -------------------- SAVE SALARY -------------------- */
  const handleSave = async () => {
    try {
      setSaving(true);

      await employeeUpdate({
        login_id,
        about_desc: "",
        job_desc: JSON.stringify(salary), // optional if backend expects
        hobbie_desc: "",
      });

      alert("Salary updated successfully");
    } catch (err) {
      alert("Failed to update salary");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-hr-muted">Loading salary...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-hr-bg/50 p-4 rounded-lg border border-hr-border">
        <h4 className="text-hr-primary font-semibold mb-4 flex items-center gap-2">
          <DollarSign size={18} /> Wage Definition
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-hr-muted block mb-1">
              Basic Salary
            </label>
            <input
              type="number"
              name="basic_salary"
              value={salary.basic_salary}
              onChange={handleChange}
              className="w-full bg-hr-input border border-hr-border rounded px-3 py-2 text-hr-text"
            />
          </div>

          <div>
            <label className="text-xs text-hr-muted block mb-1">
              HRA %
            </label>
            <input
              type="number"
              name="hra_percentage"
              value={salary.hra_percentage}
              onChange={handleChange}
              className="w-full bg-hr-input border border-hr-border rounded px-3 py-2 text-hr-text"
            />
          </div>

          <div>
            <label className="text-xs text-hr-muted block mb-1">
              Fixed Allowance
            </label>
            <input
              type="number"
              name="fixed_allowance"
              value={salary.fixed_allowance}
              onChange={handleChange}
              className="w-full bg-hr-input border border-hr-border rounded px-3 py-2 text-hr-text"
            />
          </div>
        </div>
      </div>

      {/* TOTAL */}
      <div className="bg-hr-card border border-hr-border p-6 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-hr-primary">
            Total CTC
          </span>
          <span className="text-2xl font-bold text-white">
            ₹{total.toLocaleString()}
          </span>
        </div>
      </div>

      {/* SAVE BUTTON */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 rounded-md bg-hr-primary text-white hover:opacity-90"
        >
          <Save size={16} />
          {saving ? "Saving..." : "Save Salary"}
        </button>
      </div>
    </div>
  );
};

export default SalaryTab;
