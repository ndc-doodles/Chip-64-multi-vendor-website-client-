export default function SidebarItem({ icon: Icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
        text-sm font-medium transition-colors duration-200
        ${active ? "bg-gray-900 text-white" : "text-gray-700 hover:bg-gray-200"}`}
    >
      <Icon className="w-4 h-4" strokeWidth={2} />
      <span>{label}</span>
    </button>
  );
}
