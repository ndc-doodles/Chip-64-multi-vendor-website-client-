"use client";

import React, { useEffect, useState } from "react";
import {
  Building2,
  Landmark,
  FileText,
  Lock,
  ShieldCheck,
  LogOut,
  Save,
  ChevronRight,
} from "lucide-react";
import { useDispatch } from "react-redux";
import {
  getVendorProfileApi,
  updateProfileVendorApi,
  updateVendorBankApi,
  changePasswordVendorApi,
} from "@/API/vendorApi";
import { StatusBadge } from "@/Seller/Component/Settings/StatusBade";
import { InputField } from "@/Seller/Component/Settings/InputField";
import { toast } from "sonner";
import { KycCard } from "@/Seller/Component/Settings/KycCard";
import { useNavigate } from "react-router-dom";

export default function SellerSettings() {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("profile");
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  /* ================= FETCH PROFILE ================= */
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await getVendorProfileApi();
        setVendor(res.vendor);
      } catch {
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  /* ================= FORMS ================= */
  const [profileForm, setProfileForm] = useState({
    name: "",
    phone: "",
    storeName: "",
    storeDescription: "",
  });

  const [bankForm, setBankForm] = useState({
    bankName: "",
    ifsc: "",
    accountNumber: "",
    upiId: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    if (!vendor) return;

    setProfileForm({
      name: vendor.name,
      phone: vendor.phone,
      storeName: vendor.storeName,
      storeDescription: vendor.storeDescription,
    });

    setBankForm({
      bankName: vendor.bankDetails?.bankName || "",
      ifsc: vendor.bankDetails?.ifsc || "",
      accountNumber: vendor.bankDetails?.accountNumber || "",
      upiId: vendor.bankDetails?.upiId || "",
    });
  }, [vendor]);

  const handleLogout = () => {
    dispatch({ type: "VENDOR_LOGOUT" });
    navigate("/vendor");
  };

  /* ================= SUBMIT HANDLERS ================= */
  const handleUpdate = async () => {
    try {
      if (activeTab === "profile") await updateProfileVendorApi(profileForm);
      if (activeTab === "bank") await updateVendorBankApi(bankForm);
      if (activeTab === "security") {
        await changePasswordVendorApi(passwordForm);
        setPasswordForm({ oldPassword: "", newPassword: "" });
      }

      const refreshed = await getVendorProfileApi();
      setVendor(refreshed.vendor);
      toast.success("Updated successfully");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Update failed");
    }
  };

  if (loading) return <p className="p-8">Loading settings...</p>;

  const tabs = [
    { id: "profile", label: "Store Profile", icon: Building2 },
    { id: "bank", label: "Bank & Payout", icon: Landmark },
    { id: "kyc", label: "KYC Documents", icon: FileText },
    { id: "security", label: "Security", icon: Lock },
    { id: "account", label: "Account Info", icon: ShieldCheck },
  ];

  return (
    <main className="w-full bg-[#FAFAFA] min-h-screen pb-24 md:pb-20">
      {/* HEADER */}
      <div className="bg-white border-b px-4 md:px-6 py-4">
        <div className="max-w-6xl mx-auto flex-col items-center justify-between">
         <h1 className="text-2xl font-black text-gray-900">Settings</h1>
         <h1 className="text-xs uppercase tracking-widest text-gray-400 mt-1">Manage your account</h1>
        </div>
      </div>

      {/* TABS - Added scrollable container for mobile */}
      <nav className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b">
        <div className="max-w-6xl mx-auto flex overflow-x-auto scrollbar-hide px-4 md:px-6 gap-6 md:gap-8 no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 md:py-5 text-[10px] md:text-xs font-black uppercase tracking-widest whitespace-nowrap transition-colors flex-shrink-0 ${
                activeTab === tab.id ? "text-[#39b02c] border-b-2 border-[#39b02c]" : "text-gray-400"
              }`}
            >
              <div className="flex items-center gap-2">
                <tab.icon size={16} />
                {tab.label}
              </div>
            </button>
          ))}
        </div>
      </nav>

      {/* CONTENT */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 mt-6 md:mt-12">
        <div className="bg-white rounded-[24px] md:rounded-[40px] border shadow-sm overflow-hidden mb-20">
          <div className="p-6 md:p-14 space-y-6 md:space-y-10">
            {/* PROFILE */}
            {activeTab === "profile" && (
              <div className="space-y-6">
                <InputField
                  label="Owner Name"
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                />
                <InputField label="Email" value={vendor.email} disabled />
                <InputField
                  label="Store Name"
                  value={profileForm.storeName}
                  onChange={(e) => setProfileForm({ ...profileForm, storeName: e.target.value })}
                />
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Store Description</label>
                  <textarea
                    className="w-full p-4 md:p-5 bg-gray-50 rounded-[16px] md:rounded-[24px] text-sm focus:outline-none focus:ring-1 focus:ring-[#39b02c]"
                    rows={4}
                    value={profileForm.storeDescription}
                    onChange={(e) => setProfileForm({ ...profileForm, storeDescription: e.target.value })}
                  />
                </div>
              </div>
            )}

            {/* BANK */}
            {activeTab === "bank" && (
              <div className="space-y-6">
                <InputField
                  label="Bank Name"
                  value={bankForm.bankName}
                  onChange={(e) => setBankForm({ ...bankForm, bankName: e.target.value })}
                />
                <InputField
                  label="IFSC"
                  value={bankForm.ifsc}
                  onChange={(e) => setBankForm({ ...bankForm, ifsc: e.target.value })}
                />
                <InputField
                  label="Account Number"
                  value={bankForm.accountNumber}
                  onChange={(e) => setBankForm({ ...bankForm, accountNumber: e.target.value })}
                />
                <InputField
                  label="UPI ID"
                  value={bankForm.upiId}
                  onChange={(e) => setBankForm({ ...bankForm, upiId: e.target.value })}
                />
              </div>
            )}

            {/* KYC */}
            {activeTab === "kyc" && (
              <div className="space-y-6 md:space-y-8">
                <div>
                  <h2 className="text-xl md:text-2xl font-black text-gray-900">KYC Documents</h2>
                  <p className="text-xs md:text-sm text-gray-500 mt-1">Uploaded documents used for verification</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                  <KycCard label="PAN Card" url={vendor.documents?.panCard} />
                  <KycCard label="ID Proof" url={vendor.documents?.idProof} />
                  <KycCard label="Bank Proof" url={vendor.documents?.bankProof} />
                  <KycCard label="GST Certificate" url={vendor.documents?.gstCertificate} />
                </div>
              </div>
            )}

            {/* SECURITY */}
            {activeTab === "security" && (
              <div className="space-y-6">
                <InputField
                  label="Old Password"
                  type="password"
                  value={passwordForm.oldPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, oldPassword: e.target.value })}
                />
                <InputField
                  label="New Password"
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                />
              </div>
            )}

            {/* ACCOUNT */}
            {activeTab === "account" && (
              <div className="space-y-6 md:space-y-8">
                <div className="bg-gray-50 rounded-2xl md:rounded-3xl p-4 md:p-6 border space-y-4">
                  <div className="flex justify-between text-xs md:text-sm">
                    <span className="text-gray-500">Account Status</span>
                    <span className="font-semibold capitalize text-green-600">{vendor.status}</span>
                  </div>
                  <div className="flex justify-between text-xs md:text-sm overflow-hidden">
                    <span className="text-gray-500">Vendor ID</span>
                    <span className="font-mono text-[10px] md:text-xs text-gray-700 truncate ml-4">{vendor._id}</span>
                  </div>
                  <div className="flex justify-between text-xs md:text-sm">
                    <span className="text-gray-500">Joined On</span>
                    <span className="font-semibold">{new Date(vendor.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="bg-rose-50 border border-rose-100 rounded-2xl md:rounded-3xl p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-rose-900 font-bold text-lg">Sign out</h4>
                    <p className="text-rose-700/70 text-xs md:text-sm">You’ll be logged out from this device.</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full md:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-rose-600 text-white rounded-xl md:rounded-2xl text-xs font-black uppercase tracking-widest shadow-md hover:bg-rose-700 transition-all"
                  >
                    <LogOut size={18} /> Logout
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* UPDATE BUTTON - Sticky on Mobile */}
          {activeTab !== "account" && (
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t md:relative md:bg-gray-50 md:px-10 md:py-6 md:flex md:justify-end z-40">
              <button
                onClick={handleUpdate}
                className="w-full md:w-auto flex items-center justify-center gap-2 px-10 py-4 md:py-3 bg-[#39b02c] text-white rounded-xl md:rounded-2xl font-black uppercase tracking-widest text-xs md:text-sm shadow-xl md:shadow-none"
              >
                <Save size={18} /> Update
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}