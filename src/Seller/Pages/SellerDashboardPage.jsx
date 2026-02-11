import SellerDashboard from "../Layout/Dashboard/SellerDashboardLayout";
import VendorSidebar from "../Component/Common/VendorSidebar";
import { useState } from "react";
import { Menu } from "lucide-react";

export default function SellerDashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="max-h-screen flex bg-background">

      {/* MOBILE MENU BUTTON */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 border rounded-md bg-background"
      >
        <Menu size={20} />
      </button>

      {/* SIDEBAR */}
      <VendorSidebar
        activeItem="dashboard"
        onNavigate={() => setSidebarOpen(false)}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-x-hidden">
        <SellerDashboard />
      </main>

    </div>
  );
}
