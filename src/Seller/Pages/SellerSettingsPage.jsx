import VendorSidebar from "../Component/Common/VendorSidebar";
import SellerSettings from "../Layout/Settings/SellerSettingsLayout";
import { useState } from "react";
import { Menu } from "lucide-react";

export default function SellerSettingsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex bg-background overflow-hidden">

      {/* ================= MOBILE MENU BUTTON ================= */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white border rounded-lg shadow"
      >
        <Menu size={20} />
      </button>

      {/* ================= SIDEBAR ================= */}
      <VendorSidebar
        activeItem="settings"
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onNavigate={() => setSidebarOpen(false)}
      />

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 overflow-y-auto">
        <SellerSettings />
      </main>

    </div>
  );
}
