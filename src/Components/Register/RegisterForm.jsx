"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Check,
  X
} from "lucide-react";
import { getPasswordStrength } from "@/Utils/PasswordStrength";

export default function RegisterForm({
  fullName,
  setFullName,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  isLoading,
  submitRegister,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  /* ================= INPUT STYLE ================= */
  const inputStyle = `
    w-full
    bg-white
    border border-gray-200
    rounded-xl
    px-4 py-4
    text-gray-900
    placeholder:text-gray-400
    focus:outline-none
    focus:border-[#8bf606]
    focus:ring-4
    focus:ring-[#8bf606]/10
    shadow-sm
    transition-all
  `;

  /* ================= PASSWORD LOGIC ================= */
const { label, score } = getPasswordStrength(password);

  const strengthMap = [
    { label: "Weak", color: "bg-red-400", width: "25%" },
    { label: "Medium", color: "bg-yellow-400", width: "50%" },
    { label: "Good", color: "bg-blue-400", width: "75%" },
    { label: "Strong", color: "bg-[#8bf606]", width: "100%" },
  ];

const current = strengthMap[score];

  /* ================= RULES ================= */
  const rules = [
    { label: "8+ characters", valid: password.length >= 8 },
    { label: "Uppercase letter", valid: /[A-Z]/.test(password) },
    { label: "Number", valid: /[0-9]/.test(password) },
  ];

  const passwordsMatch =
    confirmPassword && password === confirmPassword;

  return (
    <form onSubmit={submitRegister} className="space-y-5">

      {/* ================= FULL NAME ================= */}
      <input
        type="text"
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        required
        className={inputStyle}
      />

      {/* ================= EMAIL ================= */}
      <input
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className={inputStyle}
      />

      {/* ================= PASSWORD ================= */}
      <div className="space-y-3">

        {/* input */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={inputStyle}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* ===== Animated strength bar ===== */}
        {password && (
          <>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full ${current.color} transition-all duration-300`}
                style={{ width: current.width }}
              />
            </div>

            <p className="text-xs text-gray-500 font-medium">
              Strength: {label}
            </p>

            {/* ===== Rules list ===== */}
            <div className="space-y-1 text-xs">
              {rules.map((rule, i) => (
                <div key={i} className="flex items-center gap-2">
                  {rule.valid ? (
                    <Check size={14} className="text-[#8bf606]" />
                  ) : (
                    <X size={14} className="text-gray-300" />
                  )}
                  <span
                    className={
                      rule.valid ? "text-gray-700" : "text-gray-400"
                    }
                  >
                    {rule.label}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* ================= CONFIRM PASSWORD ================= */}
      <div className="relative space-y-1">
        <input
          type={showConfirm ? "text" : "password"}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className={`${inputStyle} ${
            confirmPassword &&
            (passwordsMatch
              ? "border-[#8bf606]"
              : "border-red-400")
          }`}
        />

        <button
          type="button"
          onClick={() => setShowConfirm(!showConfirm)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
        >
          {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>

        {confirmPassword && (
          <p
            className={`text-xs font-medium ${
              passwordsMatch
                ? "text-[#8bf606]"
                : "text-red-500"
            }`}
          >
            {passwordsMatch
              ? "Passwords match ✓"
              : "Passwords do not match"}
          </p>
        )}
      </div>

      {/* ================= BUTTON ================= */}
      <button
        type="submit"
        disabled={isLoading}
        className="
          w-full
          mt-6
          bg-primary
          text-black
          hover:text-primary
          hover:bg-black
          font-bold
          py-4
          rounded-xl
          flex items-center justify-between
          px-6
          hover:shadow-lg hover:shadow-gray-200
          transition-all
          disabled:opacity-60
          group
          cursor-pointer
        "
      >
        <span>
          {isLoading ? "Sending OTP..." : "Create Account"}
        </span>

        <div className="bg-[#8bf606] text-black p-1 rounded-full group-hover:scale-110 transition-transform">
          <ArrowRight size={18} strokeWidth={3} />
        </div>
      </button>
    </form>
  );
}
