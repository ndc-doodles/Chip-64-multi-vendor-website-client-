"use client";

import { Trash2, X } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

export default function GoogleDeleteModal({ open, onClose, onConfirm }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

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
          Delete your account?
        </h2>

        <p className="text-sm text-gray-500 text-center mt-2">
          Please re-login with Google to confirm account deletion.
        </p>

        <button
          onClick={onConfirm}
          className="mt-6 w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-gray-900 text-white hover:bg-gray-800"
        >
          <FcGoogle size={20} />
          Continue with Google
        </button>
      </div>
    </div>
  );
}
