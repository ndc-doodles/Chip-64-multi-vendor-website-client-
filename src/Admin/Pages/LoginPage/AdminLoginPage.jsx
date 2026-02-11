
import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import AdminLoginForm from "../../Components/Login/AdminLoginForm";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminLoginApi } from "@/API/adminApi";
import { toast } from "sonner";
export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
    const dispatch=useDispatch()
    const navigate=useNavigate()
 const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setIsLoading(true);

  if (!email || !password) {
    setError("Please enter both email and password");
    setIsLoading(false);
    return;
  }

  try {
    const data = await adminLoginApi({ email, password });

    // ✅ admin is stored as user
    dispatch({
      type: "SET_USER",
      payload: {
        user: data.user,
        accessToken: data.accessToken,
      },
    });

    navigate("/admin/dashboard"); // or wherever
  } catch (err) {
    setError(
      err.response?.data?.message || "Admin login failed"
    );
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#f5f3ef]">

      <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-2xl
        shadow-[0_8px_30px_rgb(0,0,0,0.04)]
        border border-black/[0.03] p-8 md:p-12">

        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="mb-4 p-3 rounded-full bg-[#2a2826]/5">
            <ShieldCheck className="w-6 h-6 text-[#2a2826]" />
          </div>
          <h1 className="font-sans text-3xl text-[#2a2826]">
            CHIP
          </h1>
          <p className="font-sans text-sm text-[#2a2826]/60 tracking-widest uppercase">
            Administration Access
          </p>
        </div>

        <AdminLoginForm
          email={email}
          password={password}
          setEmail={setEmail}
          setPassword={setPassword}
          isLoading={isLoading}
          error={error}
          onSubmit={handleSubmit}
        />

        <p className="text-center mt-6 text-xs text-[#2a2826]/40">
          Authorized personnel only
        </p>
      </div>
    </div>
  );
}
