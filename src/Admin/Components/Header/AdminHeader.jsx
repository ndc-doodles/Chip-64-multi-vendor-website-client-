
import { Avatar, AvatarFallback } from "@/Components/ui/avatar";

export default function AdminHeader({ title }) {
  return (
    <header className="h-16 border-b border-gray-200 bg-white px-6 md:px-8 flex items-center justify-between">
      <h2 className="text-xl font-semibold text-gray-900">
        {title}
      </h2>

      <div className="flex items-center gap-3">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-medium text-gray-900">Admin User</p>
          <p className="text-xs text-gray-500">admin@chip.com</p>
        </div>

        <Avatar className="w-9 h-9 border-2 border-gray-200">
          <AvatarFallback className="bg-gray-900 text-white text-sm font-medium">
            AU
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
