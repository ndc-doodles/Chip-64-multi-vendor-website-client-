import { Eye } from "lucide-react";
import { EyeOff } from "lucide-react";
export default function Input({ label, value, onChange, show, toggleShow }) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="relative mt-2">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required
          className="w-full px-4 py-3 bg-gray-100 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gray-900 outline-none"
        />
        <button
          type="button"
          onClick={toggleShow}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
}
