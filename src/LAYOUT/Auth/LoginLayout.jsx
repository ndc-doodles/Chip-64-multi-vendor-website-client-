import React, { useState } from "react";
import Login from "../../COMPONENTS/Login/LoginForm";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import api from "../../API/axiosInstance";
import { useGoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";

const LoginLayout = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
    const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await api.post("/auth/google", {
          token: tokenResponse.access_token,
        });

        dispatch({
          type: "SET_USER",
          payload: {
            user: res.data.user,
            accessToken: res.data.accessToken,
          },
        });

        toast.success("Welcome back 🤎");
        navigate("/");
      } catch (error) {
        console.error(error);
        toast.error("Google login failed");
      }
    },
    onError: () => {
      toast.error("Google Login cancelled");
    },
  });

  
  const submitLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await api.post("/auth/login", { email, password });

      // setting user state to redux
      dispatch({
        type: "SET_USER",
        payload: {
          user: res.data.user,
          accessToken: res.data.accessToken,
        },
      });

      navigate("/");
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Login
      HeadContent={`Sign in <br /> to Leather Haven`}
      mainContent={
        <>
          <div className="space-y-2 mt-6 text-center md:text-left md:ml-[100px]">
            <h2 className="font-serif text-4xl md:text-5xl font-light tracking-tight text-foreground">
              LEATHER
              <br />
              HAVEN
            </h2>
            <div className="h-0.5 w-12 bg-linear-to-r from-transparent via-accent to-transparent md:mx-0 mx-auto my-4" />
            <p className="text-xs tracking-widest text-muted-foreground font-light">
              PREMIUM CRAFTED LEATHER
            </p>
          </div>

          <form
            onSubmit={submitLogin}
            className="space-y-6 w-full max-w-[340px] mx-auto md:mx-0 md:ml-[100px] mt-6"
          >
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

            <div className="space-y-2 text-left">
              <label
                htmlFor="password"
                className="block text-xs tracking-widest text-muted-foreground font-light uppercase"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-border/50 bg-card text-foreground placeholder:text-muted-foreground/60 px-3 py-2 rounded-lg focus:border-accent focus:ring-2 focus:ring-accent/30 outline-none transition-all"
              />
            </div>

            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-xs text-muted-foreground hover:text-accent transition-colors font-light"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-light tracking-widest uppercase text-sm h-11 transition-all rounded-lg disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>

            <div className="pt-4 border-t border-border/30 text-center text-sm text-muted-foreground font-light">
              Don&apos;t have an account?{" "}
              <Link
                to="/register"
                className="text-foreground hover:text-accent font-medium transition-colors"
              >
                Register here
              </Link>
            </div>
          </form>
        </>
      }
    />
  );
};

export default LoginLayout;
