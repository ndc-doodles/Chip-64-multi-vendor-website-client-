"use client";

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { sendOtpApi } from "@/API/userAPI";
import RegisterForm from "@/Components/Register/RegisterForm";
import { ArrowLeft } from "lucide-react";

export default function RegisterLayout() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const submitRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setIsLoading(true);
    try {
      await sendOtpApi({
        name: fullName,
        email,
        password,
        purpose: "register",
      });
      toast.success("OTP sent to your email 🤎");
      navigate("/verify-otp", {
        state: { email, name: fullName, purpose: "register" },
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
      setPassword("");
      setConfirmPassword("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] flex items-center justify-center p-6 font-sans selection:bg-[#8bf606] selection:text-black">
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Visual Showcase Card (Updated for Light Mode) */}
        <div className="relative group hidden lg:block">
          <div className="absolute -inset-1 bg-[#8bf606]/10 rounded-[2rem] blur-xl opacity-50"></div>
          <div className="relative rounded-[2rem] overflow-hidden border border-gray-100 shadow-2xl shadow-gray-200 aspect-[4/5] bg-white">
            <img 
              src="/login8.png" 
              alt="Tech Abstract" 
              className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
            />
          
           
          </div>
        </div>

        {/* Right Side: Registration Form */}
        <div className="w-full max-w-md mx-auto">
          <div className="mb-10">
            <button 
              onClick={() => navigate("/login")}
              className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-600 mb-8 hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">Create Your Account to</h1>
            <h2 className="text-3xl font-bold text-primary tracking-tight">Unleash Your Dreams</h2>
            <p className="mt-4 text-gray-500 text-sm">
              Already have an account? <Link to="/" className="text-black font-semibold hover:text-[#7ad805] transition-colors border-b-2 border-[#8bf606] pb-0.5 ml-1">Log in</Link>
            </p>
          </div>

          <RegisterForm
            fullName={fullName}
            setFullName={setFullName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            isLoading={isLoading}
            submitRegister={submitRegister}
          />

          <p className="mt-8 text-[11px] text-gray-400 font-medium leading-relaxed uppercase tracking-widest">
            By signing in, you agree to CHIP's <a href="#" className="text-gray-600 underline hover:text-black">Terms of Service</a>, <br />
            <a href="#" className="text-gray-600 underline hover:text-black">Privacy Policy</a> and <a href="#" className="text-gray-600 underline hover:text-black">Data Usage</a>.
          </p>
        </div>
      </div>
    </div>
  );
}