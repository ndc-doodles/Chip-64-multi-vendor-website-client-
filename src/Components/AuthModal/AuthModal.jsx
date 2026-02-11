
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";

export default function AuthRequiredModal({
  open,
  onClose,
  onGoogleLogin,
  onEmailLogin,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      {/* Modal */}
      <div className="relative w-full max-w-md rounded-3xl bg-white shadow-2xl animate-in fade-in zoom-in">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition"
        >
          <X size={18} />
        </button>

        {/* Content */}
        <div className="px-8 py-10 text-center">
          {/* Icon */}
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-blue-950 text-white text-xl">
            🔒
          </div>

          {/* Title */}
          <h2 className="font-serif text-2xl font-light text-gray-900">
            Sign in to continue
          </h2>

          {/* Subtitle */}
          <p className="mt-3 text-sm text-gray-500">
            Save your cart, track orders, and enjoy a seamless checkout
            experience.
          </p>

          {/* Actions */}
          <div className="mt-8 space-y-3">
            {/* Google */}
            <Button
              onClick={onGoogleLogin}
              className="w-full rounded-xl bg-blue-950 hover:bg-blue-900 text-white h-11 font-medium tracking-wide"
            >
                              <FcGoogle size={22} />
                
              Continue with Google
            </Button>

            {/* Email */}
            <Button
              onClick={onEmailLogin}
              variant="outline"
              className="w-full rounded-xl h-11 font-medium"
            >
              Sign in with Email
            </Button>
          </div>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3 text-xs text-gray-400">
            <span className="h-px flex-1 bg-gray-200" />
            or
            <span className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Soft action */}
          <button
            onClick={onClose}
            className="text-sm text-gray-500 hover:text-gray-800 transition"
          >
            Continue browsing
          </button>
        </div>
      </div>
    </div>
  );
}