import React from "react";

const AdminSidebar = ({ activeItem, onNavigate, isOpen = false, onClose = () => {} }) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard" },
    { id: "orders", label: "Orders" },
    { id: "products", label: "Products" },
    { id: "customers", label: "Customers" },
    { id: "categories", label: "Categories" },
    { id: "settings", label: "Settings" },
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden={!isOpen}
      />

      <aside
        className={`
          fixed left-0 top-0 z-50 h-screen w-64
          text-foreground
          border-r border-border
          flex flex-col backdrop-blur-xl
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:w-64
        `}
        style={{ background: "oklch(0.78 0.05 60)" }}
      >
        {/* Close button (mobile only) */}
        <div className="flex items-center justify-between px-6 py-4 md:hidden">
          <div>
            <h1 className="text-lg font-serif">Leather Haven</h1>
          </div>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="p-2 rounded-md hover:bg-muted/10"
            type="button"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 6l12 12M6 18L18 6" />
            </svg>
          </button>
        </div>

        {/* Brand (desktop) */}
        <div className="px-8 py-6 hidden md:block">
          <h1 className="text-2xl font-serif tracking-wide">Leather Haven</h1>
          <p className="text-xs text-muted-foreground uppercase tracking-[0.2em] mt-2">Admin Panel</p>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-6 py-6 space-y-1">
          {menuItems.map((item) => {
            const isActive = activeItem === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate && onNavigate(item.id);
                  onClose && onClose(); // close on mobile
                }}
                className={`w-full text-left px-4 py-3 text-xs uppercase tracking-[0.15em] transition-all duration-300 relative ${
                  isActive ? "text-foreground font-medium" : "text-foreground/70 hover:text-foreground"
                }`}
                type="button"
              >
                {isActive && <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[2px] bg-accent rounded-full" />}
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-8 py-8 border-t border-border/40">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary/15 rounded-full flex items-center justify-center">
              <span className="text-xs font-medium">AD</span>
            </div>
            <div>
              <p className="text-sm font-medium">Admin</p>
              <p className="text-xs text-muted-foreground">admin@leatherhaven.com</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
