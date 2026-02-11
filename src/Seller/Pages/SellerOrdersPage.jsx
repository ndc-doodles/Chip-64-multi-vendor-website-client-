import VendorSidebar from "../Component/Common/VendorSidebar";
import { useState } from "react";
import SellerOrderLayout from "../Layout/Orders/OrdersLayout";
import { Menu } from "lucide-react";

export default function SellerWalletPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-background overflow-hidden">

      {/* ================= MOBILE MENU BUTTON ================= */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 border rounded-md bg-background shadow"
      >
        <Menu size={20} />
      </button>

      {/* ================= SIDEBAR ================= */}
      <VendorSidebar
        activeItem="orders"
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onNavigate={() => setSidebarOpen(false)}
      />

      {/* ================= MAIN CONTENT ================= */}
      <main
        className="
          flex-1
          h-screen
          overflow-y-auto
          overflow-x-hidden
        "
      >
        <SellerOrderLayout />
      </main>

    </div>
  );
}
