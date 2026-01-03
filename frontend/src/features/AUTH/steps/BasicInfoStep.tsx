import React, { useRef, useState } from "react";
import { Eye, EyeOff, Upload, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import InputGroup from "../../../shared/components/ui/InputGroup";
import Button from "../../../shared/components/ui/Button";
import { SignUpFormData } from "../types/login";

interface Props {
  formData: SignUpFormData;
  setFormData: React.Dispatch<React.SetStateAction<SignUpFormData>>;
  onNext: () => void;
}

const BasicInfoStep: React.FC<Props> = ({ formData, setFormData, onNext }) => {
  const navigate = useNavigate();
  const companyPdfRef = useRef<HTMLInputElement>(null);
  const userPdfRef = useRef<HTMLInputElement>(null);

  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange =
    (field: "company_profile_pdf" | "user_profile_pdf") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files?.[0]) return;

      setFormData((prev) => ({
        ...prev,
        [field]: e.target.files![0],
      }));
    };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmpassword) {
      alert("Passwords do not match");
      return;
    }

    onNext();
  };

  return (
    <div className="animate-in fade-in slide-in-from-right duration-500">
      <h2 className="text-2xl font-bold text-center text-slate-900 dark:text-slate-100 mb-6">
        Sign Up
      </h2>

      <form onSubmit={handleNext} className="space-y-4">
        {/* Company */}
        <div className="flex items-end gap-3">
          <div className="flex-1">
            <InputGroup
              label="Company Name"
              name="company_name"
              value={formData.company_name}
              onChange={handleChange}
            />
          </div>

          <button
            type="button"
            onClick={() => companyPdfRef.current?.click()}
            className="h-11 w-11 mb-5 flex items-center justify-center rounded-md
      bg-blue-600 hover:bg-blue-500 text-white shadow-md
      dark:bg-blue-500 dark:hover:bg-blue-400"
            title="Upload Company Profile PDF"
          >
            <Upload size={18} />
          </button>

          <input
            ref={companyPdfRef}
            type="file"
             accept="image/*"
            hidden
            onChange={handleFileChange("company_profile_pdf")}
          />
        </div>

        {formData.company_profile_pdf && (
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Company PDF: {formData.company_profile_pdf.name}
          </p>
        )}

        {/* Optional file feedback */}

        <div className="flex items-end gap-3">
          <div className="flex-1">
            <InputGroup
              label="Employee Name"
              name="emp_name"
              value={formData.emp_name}
              onChange={handleChange}
            />
          </div>

          <button
            type="button"
            onClick={() => userPdfRef.current?.click()}
            className="h-11 w-11 mb-5 flex items-center justify-center rounded-md
      bg-blue-600 hover:bg-blue-500 text-white shadow-md
      dark:bg-blue-500 dark:hover:bg-blue-400"
            title="Upload User Profile PDF"
          >
            <Upload size={18} />
          </button>

          <input
            ref={userPdfRef}
            type="file"
            accept="image/*"

            hidden
            onChange={handleFileChange("user_profile_pdf")}
          />
        </div>

        {formData.user_profile_pdf && (
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            User PDF: {formData.user_profile_pdf.name}
          </p>
        )}

        {/* Email */}
        <InputGroup
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        {/* Phone */}
        <InputGroup
          label="Phone"
          type="tel"
          name="mobile_no"
          value={formData.mobile_no}
          onChange={handleChange}
        />

        {/* Location */}
        <InputGroup
          label="Location"
          name="user_location"
          value={formData.user_location}
          placeholder="India"
          onChange={handleChange}
        />

        {/* Gender (Boolean) */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Gender
          </label>
          <select
            value={formData.gender ? "male" : "female"}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                gender: e.target.value === "male",
              }))
            }
            className="
              w-full h-11 px-3 rounded-md border
              bg-white dark:bg-slate-800
              border-slate-300 dark:border-slate-700
              text-slate-900 dark:text-slate-100
              focus:outline-none focus:ring-1 focus:ring-blue-500
            "
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        {/* Marital Status (Boolean) */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Marital Status
          </label>
          <select
            value={formData.maratial_status ? "married" : "unmarried"}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                maratial_status: e.target.value === "married",
              }))
            }
            className="
              w-full h-11 px-3 rounded-md border
              bg-white dark:bg-slate-800
              border-slate-300 dark:border-slate-700
              text-slate-900 dark:text-slate-100
              focus:outline-none focus:ring-1 focus:ring-blue-500
            "
          >
            <option value="unmarried">Unmarried</option>
            <option value="married">Married</option>
          </select>
        </div>

        {/* Password */}
        <InputGroup
          label="Password"
          type={showPass ? "text" : "password"}
          name="password"
          value={formData.password}
          onChange={handleChange}
          icon={showPass ? Eye : EyeOff}
          onIconClick={() => setShowPass(!showPass)}
          isPasswordToggle
        />

        {/* Confirm Password */}
        <InputGroup
          label="Confirm Password"
          type={showConfirmPass ? "text" : "password"}
          name="confirmpassword"
          value={formData.confirmpassword}
          onChange={handleChange}
          icon={showConfirmPass ? Eye : EyeOff}
          onIconClick={() => setShowConfirmPass(!showConfirmPass)}
          isPasswordToggle
        />

        {/* Submit */}
        <div className="pt-4">
          <Button
            type="submit"
            className="flex items-center justify-center gap-2"
          >
            Next Step <ArrowRight size={18} />
          </Button>
        </div>

        <p className="text-center text-sm mt-6 text-slate-600 dark:text-slate-400">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-blue-600 dark:text-blue-400 underline"
          >
            Sign In
          </button>
        </p>
      </form>
    </div>
  );
};

export default BasicInfoStep;
