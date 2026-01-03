import React, { useState } from 'react';
import BasicInfoStep from './steps/BasicInfoStep';
import SalaryConfigStep from './steps/SalaryConfigStep';
import { SignUpFormData, INITIAL_DATA } from './types/login';
import toast from 'react-hot-toast';
import { signUp } from './services/loginService';
import { useNavigate } from 'react-router-dom';

const SignUpWizard = () => {
  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState<SignUpFormData>(INITIAL_DATA);
  const navigate = useNavigate();

const handleFinalSubmit = async () => {
  if (formData.password !== formData.confirmpassword) {
    toast.error("Passwords do not match");
    return;
  }

  try {
    await signUp(formData);
    toast.success("Account created successfully");
    navigate("/login");
  } catch (err: any) {
    toast.error(err?.message || "Signup failed");
  }
};


  return (
    <div className="min-h-screen bg-hr-bg flex items-center justify-center p-4 font-sans">
      {/* Wrapper Card - Width expands on Step 2 */}
      <div className={`bg-hr-card border border-hr-border rounded-xl shadow-2xl p-8 w-full transition-all duration-500 ease-in-out ${step === 1 ? 'max-w-lg' : 'max-w-5xl'}`}>
        
        {/* Step Progress Dots */}
        <div className="flex justify-center gap-2 mb-6">
          <div className={`h-2 rounded-full transition-all duration-300 ${step === 1 ? 'w-8 bg-hr-primary' : 'w-2 bg-hr-border'}`} />
          <div className={`h-2 rounded-full transition-all duration-300 ${step === 2 ? 'w-8 bg-hr-primary' : 'w-2 bg-hr-border'}`} />
        </div>

        {step === 1 ? (
          <BasicInfoStep 
            formData={formData} 
            setFormData={setFormData} 
            onNext={() => setStep(2)} 
          />
        ) : (
          <SalaryConfigStep 
            formData={formData} 
            setFormData={setFormData} 
            onBack={() => setStep(1)}
            onSubmit={handleFinalSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default SignUpWizard;