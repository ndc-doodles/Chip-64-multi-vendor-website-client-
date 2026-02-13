"use client";

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useGoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import AuthForm from "@/Components/Login/AuthForm";
import {
  googleLoginApi,
  loginUserApi,
} from "@/API/userAPI";
import { fetchWishlist } from "@/redux/actions/wishlistActions";
import { fetchCart } from "@/redux/actions/cartActions";

export default function LoginLayout() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* ---------- GOOGLE LOGIN ---------- */
  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const data = await googleLoginApi(tokenResponse.access_token);

        dispatch({
          type: "SET_USER",
          payload: {
            user: data.user,
            accessToken: data.accessToken,
          },
        });

        dispatch(fetchWishlist());
        dispatch(fetchCart());

        toast.success("Welcome back");
        navigate("/");
      } catch (err) {
        toast.error("Google login failed");
      }
    },
  });

  /* ---------- EMAIL LOGIN ---------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = await loginUserApi(email, password);

      dispatch({
        type: "SET_USER",
        payload: {
          user: data.user,
          accessToken: data.accessToken,
        },
      });

      dispatch(fetchWishlist());
      dispatch(fetchCart());

      navigate("/");
    } catch (err) {
      toast.error("Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] flex items-center justify-center p-6  selection:bg-[#8bf606] selection:text-black">
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* ============ LEFT IMAGE (same as register) ============ */}
        <div className="relative group hidden lg:block">
          <div className="absolute -inset-1 bg-[#8bf606]/10 rounded-[2rem] blur-xl opacity-50"></div>

          <div className="relative rounded-[2rem] overflow-hidden border border-gray-100 shadow-2xl shadow-gray-200 aspect-[4/5] bg-white">
            <img
              src="/login8.png"
              alt="Login Visual"
              className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>

        {/* ============ RIGHT FORM ============ */}
        <div className="w-full max-w-md mx-auto">

          <div className="mb-10">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-600 mb-8 hover:bg-gray-50 transition"
            >
              <ArrowLeft size={20} />
            </button>

            <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">
              Welcome Back
            </h1>

            <h2 className="text-3xl font-bold text-primary tracking-tight">
              Login to Continue
            </h2>

            <p className="mt-4 text-gray-500 text-sm">
              Don’t have an account?
              <Link
                to="/register"
                className="text-black font-semibold hover:text-[#7ad805] border-b-2 border-[#8bf606] ml-1 "
              >
                Sign up
              </Link>
            </p>
          </div>

          <AuthForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            isLoading={isLoading}
            handleSubmit={handleSubmit}
            loginWithGoogle={loginWithGoogle}
          />
        </div>
      </div>
    </div>
  );
}
