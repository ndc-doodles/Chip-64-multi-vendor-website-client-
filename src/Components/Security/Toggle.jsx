

export default function Toggle({ label }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-700">{label}</span>
      <input
        type="checkbox"
        defaultChecked
        className="w-4 h-4 accent-gray-900"
      />
    </div>
  );
}