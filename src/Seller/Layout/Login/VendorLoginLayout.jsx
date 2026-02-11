"use client";


import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";           
import VendorLoginForm from "@/Seller/Component/Login/AdminLoginForm";
import { vendorLoginApi } from "@/API/vendorApi";

export default function VendorLoginLayout() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

const handleVendorLogin = async (e) => {
  e.preventDefault();
    console.log("🔥 SUBMIT CLICKED"); // ADD THIS

  if (!email || !password) {
    toast.error("Please enter email and password");
    return;
  }

  setIsLoading(true);
  try {
    const data = await vendorLoginApi({ email, password });
      console.log("🔥 SUBMIT CLICKED"); // ADD THIS


    dispatch({
      type: "SET_VENDOR",
      payload: {
        vendor: data.user,
        accessToken: data.accessToken,
      },
    });
    navigate("/seller/dashboard")
    toast.success("Welcome back, Vendor ");
  } catch (err) {
    toast.error(err.response?.data?.message || "Vendor login failed");
    setPassword("");
  } finally {
    setIsLoading(false);
  }
};


  return (
    <section className="relative min-h-screen w-full bg-background flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient base */}
        <div className="absolute inset-0 bg-linear-to-b from-background via-background/95 to-background" />

        {/* Dotted leather texture */}
        <div className="absolute inset-0 opacity-[0.14]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(180,160,130,0.46)_1px,transparent_1px)] bg-size-[34px_34px]" />
        </div>

        {/* Soft spotlight */}
        <div className="absolute inset-0 mix-blend-soft-light">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),transparent_70%)]" />
        </div>

        {/* Warm blobs */}
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[radial-gradient(circle,rgba(196,166,111,0.55),transparent_70%)] blur-3xl opacity-70" />
        <div className="absolute -bottom-24 -left-16 w-64 h-64 rounded-full bg-[radial-gradient(circle,rgba(95,70,55,0.7),transparent_70%)] blur-3xl opacity-65" />
      </div>

      {/* ===== Card ===== */}
      <div className="relative z-10 w-full max-w-md px-6">
        {/* Heading */}
        <div className="mb-8 text-center space-y-2">
          <p className="text-[11px] tracking-[0.25em] uppercase text-muted-foreground">
            CHIP · Vendor
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl font-light tracking-tight text-foreground">
            Dashboard Access
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-2">
            Sign in to manage products, orders and categories.
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-background/80 border border-border/60 backdrop-blur-sm px-6 py-6 sm:px-8 sm:py-8 shadow-[0_18px_50px_rgba(15,10,5,0.45)]">
          <VendorLoginForm
            email={email}
            password={password}
            isLoading={isLoading}
            onEmailChange={setEmail}
            onPasswordChange={setPassword}
            onSubmit={handleVendorLogin}
          />
        </div>

        <p className="mt-4 text-[11px] text-center text-muted-foreground/80 tracking-wide">
          Vendor access is monitored. Contact Admin if you’ve lost your credentials.
        </p>
      </div>
    </section>
  );
}
