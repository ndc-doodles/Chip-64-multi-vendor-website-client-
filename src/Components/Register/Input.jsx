export default function Input({ label, value, onChange, placeholder, type = "text" }) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        placeholder={placeholder}
        className="mt-2 w-full px-4 py-3 bg-gray-100 rounded-lg
                   border border-gray-200 focus:ring-2 focus:ring-gray-900 outline-none"
      />
    </div>
  );
}
