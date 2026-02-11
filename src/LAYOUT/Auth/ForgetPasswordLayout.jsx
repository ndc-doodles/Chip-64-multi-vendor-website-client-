import React, { useState } from "react";
import Login from "@/Components/Login/LoginForm";
import { useNavigate, Link } from "react-router-dom";
import api from "../../API/axiosInstance";
import { toast } from "sonner";
import { sendOtpApi } from "@/API/userAPI";

const ForgotPasswordLayout = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const submitForgot = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const data = await sendOtpApi( {
      email,
      purpose: "reset",        
    });

    toast.success("Reset code sent to your email 🤎");

    navigate("/reset-otp", { state: { email, purpose: "reset" } });
  } catch (err) {
    console.error("Forgot password error:", err.response?.data || err.message);
    toast.error(err.response?.data?.message || "Something went wrong");
  } finally {
    setIsLoading(false);
  }
};


  return (
    <Login
      mainContent={
        <>
          {/* Branding */}
          <div className="space-y-2 mt-6 text-center md:text-left md:ml-[100px]">
            <h2 className=" text-4xl md:text-5xl font-medium tracking-tight text-foreground">
              CHIP
              <br />
              <span className="text-primary">
                             64
              </span>
            </h2>
            <div className="h-0.5 w-12 bg-linear-to-r from-transparent via-accent to-transparent md:mx-0 mx-auto my-4" />
            <p className="text-xs tracking-widest text-muted-foreground font-medium">
              Everything Tech. One Place
            </p>
          </div>

          <form
            onSubmit={submitForgot}
            className="space-y-6 w-full max-w-[340px] mx-auto md:mx-0 md:ml-[100px] mt-6"
          >
            {/* Heading */}
            <div className="space-y-3 text-left">
              <h2 className="text-xl font-light text-foreground">
                Forgot your password?
              </h2>
              <p className="text-xs text-muted-foreground font-light">
                Enter your email and we will send you a reset code.
              </p>
            </div>

            {/* Email */}
            <div className="space-y-2 text-left">
              <label
                htmlFor="email"
                className="block text-xs tracking-widest text-muted-foreground font-light uppercase"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-border/50 bg-card text-foreground placeholder:text-muted-foreground/60 px-3 py-2 rounded-lg focus:border-accent focus:ring-2 focus:ring-accent/30 outline-none transition-all"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90  font-light tracking-widest uppercase text-sm h-11 transition-all rounded-lg disabled:opacity-60 text-black"
            >
              {isLoading ? "Sending..." : "Send Reset Code"}
            </button>

            {/* Back */}
            <div className="pt-4 border-t border-border/30 text-center text-sm text-muted-foreground font-light">
              <Link to="/" className="hover:text-accent transition-colors">
                Return to login
              </Link>
            </div>
          </form>
        </>
      }
    />
  );
};

export default ForgotPasswordLayout;
