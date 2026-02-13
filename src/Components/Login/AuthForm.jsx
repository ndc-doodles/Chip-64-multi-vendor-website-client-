"use client";

import { FcGoogle } from "react-icons/fc";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

export default function AuthForm({
  email,
  setEmail,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  isLoading,
  handleSubmit,
  loginWithGoogle,
}) {
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

  return (
    <>
      {/* Google */}
      <button
        type="button"
        onClick={loginWithGoogle}
        className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 rounded-xl py-4 shadow-sm hover:bg-gray-50 transition mb-6 cursor-pointer"
      >
        <FcGoogle size={22} />
        Continue with Google
      </button>

      {/* divider */}
      <div className="flex items-center mb-6">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="px-4 text-xs text-gray-400 uppercase">or</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputStyle}
          required
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputStyle}
            required
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <div className="text-right">
          <Link to="/forgot-password" className="text-sm text-gray-500 hover:text-black">
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-6 bg-primary hover:bg-black text-black hover:text-primary font-bold py-4 rounded-xl flex items-center justify-center  transition disabled:opacity-60 cursor-pointer"
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </>
  );
}
