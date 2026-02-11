
import { Shield, Lock, Laptop, LogOut, Trash2, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Card from "@/Components/Security/SecuirityCard";
import Toggle from "@/Components/Security/Toggle";
import { useSelector } from "react-redux";
import HeaderLayout from "@/Layout/Header/HeaderLayout";
import { useState } from "react";
import { toast } from "sonner";
import DeleteAccountModal from "@/Components/Security/deleteAccountModal";
import GoogleDeleteModal from "@/Components/Security/GoogleDeleteAccountModal";
import { deleteAccountApi } from "@/API/userAPI";
import { deleteGoogleAccountApi } from "@/API/userAPI";
import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";

export default function SecurityPrivacy() {
  const user=useSelector((s)=>s.user?.user)
  const navigate = useNavigate();
  const email=user?.email
  const recentLogin = user?.recentLogins?.[0];
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [googleDeleteOpen, setGoogleDeleteOpen] = useState(false);
   const dispatch=useDispatch()
const [loading, setLoading] = useState(false);


const googleDelete = useGoogleLogin({
  onSuccess: async (tokenResponse) => {
    try {
      await deleteGoogleAccountApi(tokenResponse.access_token);

      dispatch({ type: "LOGOUT" });
      window.location.href = "/";
    } catch (err) {
      toast.error("Failed to delete account");
    }
  },
  onError: () => toast.error("Google verification failed"),
});
const handleLocalDelete = async (password) => {
  try {
    setLoading(true);
    await deleteAccountApi(password)
    dispatch({ type: "LOGOUT" });
    window.location.href = "/";
  } catch (err) {
    toast.error(err.response?.data?.message || "Delete failed");
  } finally {
    setLoading(false);
  }
};


  return (
    <>
    <HeaderLayout/>
    <main className="min-h-screen bg-gray-50">
      <section className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-semibold text-gray-900">
            Security & Privacy
          </h1>
          <p className="text-gray-500 mt-2">
            Password and account security settings
          </p>
        </div>

        <div className="space-y-8">
          {/* ================= PASSWORD ================= */}
          <Card
            icon={Lock}
            title="Password & Login"
            desc="Update your password and secure your account"
            action="Change"
            onClick={() => navigate("/security/change-password")}
          />

          {/* ================= LOGIN ACTIVITY ================= */}
         <div className="space-y-3 text-sm text-gray-600">
  {recentLogin ? (
    <>
      <p>
        • {recentLogin.device} —{" "}
        <span className="text-gray-900 font-medium">
          {recentLogin.location || "Unknown location"}
        </span>
      </p>
      <p className="text-xs text-gray-400">
        Last login:{" "}
        {new Date(recentLogin.loggedAt).toLocaleString()}
      </p>
    </>
  ) : (
    <p className="text-xs text-gray-400">No login activity found</p>
  )}
</div>

          {/* ================= CONNECTED ACCOUNTS ================= */}
          <div className="bg-white rounded-2xl border shadow-sm p-6">
            <h3 className="font-medium text-gray-900 mb-4">
              Connected Accounts
            </h3>

            <div className="flex items-center justify-between">
              <div>
                {user?.authProvider==="google"? (
                   <p className="text-sm font-medium text-gray-900">
                  Google Account
                </p> 
                ):  <p className="text-sm font-medium text-gray-900">
                  Standard Login
                </p> }
               
               <span><p className="text-sm  text-gray-700">{email}</p></span>
              </div>

             
  <span className="text-sm text-green-600 font-medium">Connected</span>
            </div>
          </div>

          {/* ================= DEVICES ================= */}
          <Card
            icon={Laptop}
            title="Devices & Sessions"
            desc="View active devices and sessions"
            action="View"
            onClick={() => navigate("/security/sessions")}
          />
         <DeleteAccountModal
  open={deleteOpen}
  onClose={() => setDeleteOpen(false)}
  loading={loading}
  onConfirm={handleLocalDelete}
/>
        <GoogleDeleteModal
  open={googleDeleteOpen}
  onClose={() => setGoogleDeleteOpen(false)}
  onConfirm={() => googleDelete()}
/>

          <div className="bg-white rounded-2xl border border-red-200 p-6">
            <h3 className="font-medium text-red-600 mb-2">
              Danger Zone
            </h3>

            <p className="text-sm text-gray-500 mb-4">
              Permanently delete your account and data
            </p>

           <button
  onClick={() => {
    if (user?.authProvider === "google") {
      setGoogleDeleteOpen(true);
    } else {
      setDeleteOpen(true);
    }
  }}
  className="flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700"
>
  <Trash2 size={16} />
  Delete Account
</button>

          </div>          
        </div>
      </section>
    </main>
    </>
  );
}

