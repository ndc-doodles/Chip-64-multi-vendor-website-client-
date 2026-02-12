import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { useState } from "react";

export default function AdminLoginForm({
  email,
  password,
  setEmail,
  setPassword,
  isLoading,
  error,
  onSubmit,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form onSubmit={onSubmit} className="space-y-6">

      {/* Email */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-[#2a2826]/80">
          Email Address
        </Label>
        <Input
          type="email"
          placeholder="enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          className="h-11 bg-white border-[#2a2826]/10
            focus:border-[#8b7355] focus:ring-[#8b7355]/20"
        />
      </div>

      {/* Password */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-[#2a2826]/80">
          Password
        </Label>
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            className="h-11 pr-10 bg-white border-[#2a2826]/10
              focus:border-[#8b7355] focus:ring-[#8b7355]/20"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            disabled={isLoading}
            className="absolute right-3 top-1/2 -translate-y-1/2
              text-[#2a2826]/40 hover:text-[#2a2826]/70"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="text-sm text-[#8b4513] bg-[#8b4513]/5
          border border-[#8b4513]/10 rounded-lg px-4 py-3">
          {error}
        </div>
      )}

      {/* Submit */}
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full h-11 bg-[#2a2826] hover:bg-[#1a1614]
          text-white tracking-wide transition-all
          hover:shadow-[0_8px_20px_rgba(42,40,38,0.25)]"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Signing In...
          </>
        ) : (
          "Sign In"
        )}
      </Button>

      
    </form>
  );
}
