import { useState, useRef } from "react";
import { Eye, EyeOff, Upload } from "lucide-react";
import InputGroup from "../../../shared/components/ui/InputGroup";
import Button from "../../../shared/components/ui/Button";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    companyName: "",
    name: "",
    email: "",
    mobile_no: "",
    password: "",
    confirmPassword: "",
    logo: null,
  });

  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogoUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, logo: file });
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    console.log("API CALL: Registration Payload", formData);
  };

  return (
    <div className="min-h-screen bg-hr-bg flex items-center justify-center p-4">
      <div className="bg-hr-card border border-hr-border rounded-xl shadow-2xl p-8 w-full max-w-lg relative">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up Page</h2>

        <form onSubmit={handleSignUp} className="space-y-3">
          {/* Company Name + Logo Upload */}
          <div className="flex gap-3 items-end">
            <div className="flex-grow">
              <InputGroup
                label="Company Name"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
              />
            </div>

            <button
              type="button"
              onClick={handleLogoUpload}
              className="mb-5 bg-blue-600 hover:bg-blue-500 text-white p-3 rounded-md shadow-lg"
              title="Upload Logo"
            >
              <Upload size={18} />
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={handleFileChange}
            />
          </div>

          <InputGroup
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <InputGroup
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <InputGroup
            label="Phone"
            type="tel"
            name="phone"
            value={formData.mobile_no}
            onChange={handleChange}
          />

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

          <InputGroup
            label="Confirm Password"
            type={showConfirmPass ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            icon={showConfirmPass ? Eye : EyeOff}
            onIconClick={() => setShowConfirmPass(!showConfirmPass)}
            isPasswordToggle
          />

          <Button type="submit">Sign Up</Button>

          <p className="text-center text-sm mt-6">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-hr-primary underline"
            >
              Sign In
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
