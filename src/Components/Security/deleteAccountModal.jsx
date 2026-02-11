"use client";

import { useState } from "react";
import { Trash2, X, Eye, EyeOff } from "lucide-react";

export default function DeleteAccountModal({
  open,
  onClose,
  onConfirm,
  loading,
}) {
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={18} />
        </button>

        <div className="flex justify-center mb-4">
          <div className="h-14 w-14 rounded-full bg-red-50 flex items-center justify-center">
            <Trash2 className="text-red-600" size={26} />
          </div>
        </div>

        <h2 className="text-lg font-semibold text-center">
          Confirm account deletion
        </h2>

        <p className="text-sm text-gray-500 text-center mt-2">
          Enter your password to permanently delete your account.
        </p>

        {/* Password */}
        <div className="mt-5 relative">
          <input
            type={show ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl bg-gray-100 focus:ring-2 focus:ring-red-500 outline-none"
          />
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {show ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-gray-300 hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            onClick={() => onConfirm(password)}
            disabled={loading || !password}
            className="flex-1 py-2.5 rounded-xl bg-red-600 text-white hover:bg-red-700 disabled:opacity-60"
          >
            {loading ? "Deleting..." : "Delete Account"}
          </button>
        </div>
      </div>
    </div>
  );
}
