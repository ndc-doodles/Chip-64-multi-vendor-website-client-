
import { ChevronRight } from "lucide-react";
export default function Card({ icon: Icon, title, desc, action, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-white rounded-2xl border shadow-sm p-6 flex items-center justify-between hover:shadow-md transition"
    >
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-gray-100">
          <Icon size={20} className="text-gray-700" />
        </div>
        <div className="text-left">
          <p className="font-medium text-gray-900">{title}</p>
          <p className="text-sm text-gray-500">{desc}</p>
        </div>
      </div>

      <div className="flex items-center gap-1 text-sm text-gray-500">
        {action}
        <ChevronRight size={16} />
      </div>
    </button>
  );
}