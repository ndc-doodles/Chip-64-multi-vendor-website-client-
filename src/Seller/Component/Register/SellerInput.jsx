"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function SellerInput({ label, type = "text", ...props }) {
  const [show, setShow] = useState(false);

  const isPassword = type === "password";

  return (
    <div className="space-y-1">
      <label className="text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </label>

      <div className="relative">
        <input
          {...props}
          type={isPassword && show ? "text" : type}
          className="
            w-full rounded-md border border-border
            px-3 py-2 pr-10 text-sm
            focus:outline-none focus:ring-1 focus:ring-accent
          "
        />

        {/* 👁 Eye toggle */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-foreground"
            tabIndex={-1}
          >
            {show ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
    </div>
  );
}
