import React from "react";
import {
  ArrowLeft,
  CheckCircle,
  Briefcase,
  Clock,
  Calendar,
  ShieldAlert,
} from "lucide-react";
import Button from "../../../shared/components/ui/Button";
import { SignUpFormData } from "../types/login";

interface Props {
  formData: SignUpFormData;
  setFormData: React.Dispatch<React.SetStateAction<SignUpFormData>>;
  onBack: () => void;
  onSubmit: () => void;
}



// Simple Percentage Input
const PercentageRow = ({
  label,
  value,
  onChange,
  name,
  isHighlight = false,
}: {
  label: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  isHighlight?: boolean;
}) => {
  return (
    <div
      className={`
        group flex items-center justify-between p-4 rounded-xl border transition-all duration-200

        ${
          isHighlight
            ? `
              bg-blue-500/10 border-blue-500/30
              dark:bg-blue-400/10 dark:border-blue-400/30
            `
            : `
              bg-white border-slate-200 hover:border-slate-300
              dark:bg-slate-900 dark:border-slate-800 dark:hover:border-slate-700
            `
        }
      `}
    >
      <label
        htmlFor={name}
        className="
          text-sm font-medium flex-1 cursor-pointer
          text-slate-700 dark:text-slate-300
        "
      >
        {label}
      </label>

      <div className="relative flex items-center">
        <input
          id={name}
          type="number"
          min="0"
          max="100"
          step="0.01"
          name={name}
          value={value}
          onChange={onChange}
          placeholder="0"
          className="
            w-24 text-right font-bold text-lg rounded-lg px-3 py-2 outline-none transition-all

            bg-white border border-slate-300 text-slate-900
            focus:border-blue-500 focus:ring-1 focus:ring-blue-500

            dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100
            dark:focus:border-blue-400 dark:focus:ring-blue-400

            [appearance:textfield]
            [&::-webkit-outer-spin-button]:appearance-none
            [&::-webkit-inner-spin-button]:appearance-none
          "
        />

        <span
          className="
            ml-3 text-sm font-bold w-4
            text-slate-500 dark:text-slate-400
          "
        >
          %
        </span>
      </div>
    </div>
  );
};

// Standard Input for Days/Hours
const PolicyRow = ({
  label,
  value,
  unit,
  onChange,
  name,
}: {
  label: string;
  value: number;
  unit: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
}) => (
  <div className="flex items-center justify-between p-4 rounded-xl border bg-hr-card border-hr-border">
    <label className="text-sm font-medium text-hr-text">{label}</label>
    <div className="flex items-center gap-2">
      <input
        type="number"
        name={name}
        value={value}
        onChange={onChange}
        className="w-20 text-right font-mono text-sm rounded px-2 py-1.5 outline-none bg-transparent border-b border-hr-border focus:border-hr-primary text-white transition-colors"
      />
      <span className="text-xs text-hr-muted w-8 text-right">{unit}</span>
    </div>
  </div>
);

/* -------------------------------------------------------------------------- */
/*                                MAIN COMPONENT                              */
/* -------------------------------------------------------------------------- */

const SalaryConfigStep: React.FC<Props> = ({
  formData,
  setFormData,
  onBack,
  onSubmit,
}) => {
  // General Change Handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = parseFloat(e.target.value);
    if (isNaN(val)) val = 0;
    if (val < 0) val = 0; // Prevent negative inputs

    setFormData((prev) => ({ ...prev, [e.target.name]: val }));
  };

  return (
    <div className="w-full max-w-5xl mx-auto animate-in fade-in slide-in-from-right duration-500">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onBack}
          className="p-2 rounded-full hover:bg-hr-border text-hr-muted hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Salary Configuration
          </h2>
          <p className="text-sm text-hr-muted">
            Define the percentage breakdown for employee salaries.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* LEFT COLUMN: Structure Definition */}
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-4 px-1">
              <Briefcase size={18} className="text-hr-muted" />
              <h3 className="text-sm font-bold text-hr-muted uppercase tracking-wider">
                Components Breakdown
              </h3>
            </div>

            <PercentageRow
              label="Basic Salary"
              name="basic_salary"
              value={formData.basic_salary}
              onChange={handleChange}
              isHighlight
            />

            <PercentageRow
              label="House Rent Allowance (HRA)"
              name="house_rent_allowanace"
              value={formData.house_rent_allowanace}
              onChange={handleChange}
            />
            <PercentageRow
              label="Standard Allowance"
              name="standard_allowanace"
              value={formData.standard_allowanace}
              onChange={handleChange}
            />
            <PercentageRow
              label="Performance Bonus"
              name="perforamance_bonus"
              value={formData.perforamance_bonus}
              onChange={handleChange}
            />
            <PercentageRow
              label="LTA"
              name="leave_travel_allowanace"
              value={formData.leave_travel_allowanace}
              onChange={handleChange}
            />
            <PercentageRow
              label="Fixed / Special Allowance"
              name="fixed_allowanace"
              value={formData.fixed_allowanace}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* RIGHT COLUMN: Policies */}
        <div className="space-y-8">
          {/* Work Policy */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 px-1">
              <Clock size={18} className="text-blue-400" />
              <h3 className="font-bold text-hr-text">Work Policy</h3>
            </div>
            <div className="bg-[#1E2028]/50 rounded-xl p-1 border border-hr-border space-y-2">
              <PolicyRow
                label="Total Hours / Day"
                name="total_working_hours"
                value={formData.total_working_hours}
                unit="hrs"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Leave Policy */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 px-1">
              <Calendar size={18} className="text-yellow-400" />
              <h3 className="font-bold text-hr-text">Leave Policy</h3>
            </div>
            <div className="bg-[#1E2028]/50 rounded-xl p-1 border border-hr-border space-y-2">
              <PolicyRow
                label="Paid Leaves (Yearly)"
                name="total_paid_leave"
                value={formData.total_paid_leave}
                unit="days"
                onChange={handleChange}
              />
              <PolicyRow
                label="Sick Leaves (Yearly)"
                name="total_sick_leave"
                value={formData.total_sick_leave}
                unit="days"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Deductions (Percent) */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 px-1">
              <ShieldAlert size={18} className="text-red-400" />
              <h3 className="font-bold text-hr-text">
                Deductions (% of Basic)
              </h3>
            </div>
            <div className="bg-[#1E2028]/50 rounded-xl p-1 border border-hr-border space-y-2 border-l-2 border-l-red-500/20">
              <PercentageRow
                label="PF Contribution (Employee)"
                name="employee_pf"
                value={formData.employee_pf}
                onChange={handleChange}
              />
              <PercentageRow
                label="Professional Tax"
                name="professional_tax"
                value={formData.professional_tax}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 pt-6 border-t border-hr-border flex justify-end">
        <div className="w-full md:w-72">
          <Button
            onClick={onSubmit}
            className="w-full flex justify-center gap-2 h-12 text-base"
          >
            <CheckCircle size={20} /> Finalize Configuration
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SalaryConfigStep;
