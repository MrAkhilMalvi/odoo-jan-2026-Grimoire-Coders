import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import InputGroup from "../../../shared/components/ui/InputGroup";
import Button from "../../../shared/components/ui/Button";
import { useNavigate } from "react-router-dom";
import { signin } from "../services/loginService"; // adjust path
import { ILoginPayload, ISignInForm } from "../types/login";

const SignIn = () => {
  const [formData, setFormData] = useState<ISignInForm>({
    identifier: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.identifier || !formData.password) {
      alert("Please enter Login ID / Email and password");
      return;
    }

    const payload: ILoginPayload = {
      login_id: formData.identifier.trim(), // ✅ mapping happens here
      password: formData.password,
    };

    try {
      setLoading(true);

      const response = await signin(payload);

      console.log("LOGIN SUCCESS:", response);

      navigate("/");
    } catch (error: any) {
      alert(error?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-hr-bg flex items-center justify-center p-4">
      <div className="bg-hr-card border border-hr-border rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Sign In Page</h2>

        <form onSubmit={handleLogin} className="mt-8 space-y-4">
          <InputGroup
            label="Login Id / Email"
            name="identifier"
            value={formData.identifier}
            onChange={handleChange}
            placeholder="Enter ID or Email"
          />

          <InputGroup
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter Password"
            icon={showPassword ? Eye : EyeOff}
            onIconClick={() => setShowPassword(!showPassword)}
            isPasswordToggle
          />

          <div className="mt-6">
            <Button type="submit" disabled={loading}>
              {loading ? "Signing In..." : "SIGN IN"}
            </Button>
          </div>

          <p className="text-center text-sm mt-6">
            Don&apos;t have an Account?{" "}
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="text-hr-primary underline"
            >
              Sign Up
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
