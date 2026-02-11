"use client";

import { useState } from "react";
import { toast } from "sonner";
import api from "@/API/axiosInstance";
import Input from "@/Components/Security/ChangePasswordInput";
import { getPasswordStrength } from "@/Utils/PasswordStrength";
import { changePassword } from "@/API/userAPI";

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);

  // ✅ FIX: use newPassword
  const strength = getPasswordStrength(newPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (strength.score === 1) {
      toast.error("Password is too weak");
      return;
    }

    setLoading(true);

    try {
      await changePassword(currentPassword,newPassword)

      toast.success("Password updated successfully");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="max-w-lg mx-auto px-4 py-14">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            Change Password
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Update your account password securely
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border shadow-sm p-6 space-y-5"
        >
          {/* Current Password */}
          <Input
            label="Current password"
            value={currentPassword}
            onChange={setCurrentPassword}
            show={showCurrent}
            toggleShow={() => setShowCurrent((s) => !s)}
          />

          {/* New Password */}
          <Input
            label="New password"
            value={newPassword}
            onChange={setNewPassword}
            show={showNew}
            toggleShow={() => setShowNew((s) => !s)}
          />

          {/* ✅ Password Strength Meter */}
          {newPassword && (
            <div className="mt-2 space-y-1">
              <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    strength.score === 1
                      ? "w-1/3 bg-red-500"
                      : strength.score === 2
                      ? "w-2/3 bg-yellow-500"
                      : "w-full bg-green-600"
                  }`}
                />
              </div>

              <p
                className={`text-xs font-medium ${
                  strength.score === 1
                    ? "text-red-600"
                    : strength.score === 2
                    ? "text-yellow-600"
                    : "text-green-600"
                }`}
              >
                {strength.label} password
              </p>
            </div>
          )}

          {/* Confirm Password */}
          <Input
            label="Confirm new password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            show={showConfirm}
            toggleShow={() => setShowConfirm((s) => !s)}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-primary text-black py-3 rounded-xl font-medium hover:bg-gray-800 transition disabled:opacity-60"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </section>
    </main>
  );
}
