import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  Settings, 
  LogOut, 
  User, 
  X,
  ChevronUp,
  Wallet
} from "lucide-react";

const VendorSidebar = ({
  activeItem,
  onNavigate,
  isOpen = false,
  onClose = () => {},
}) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/seller/dashboard" },
    { id: "orders", label: "Orders", icon: ShoppingBag, path: "/seller/orders" },
    { id: "products", label: "Products", icon: Package, path: "/vendor/product" },
    { id: "settings", label: "Settings", icon: Settings, path: "/seller/settings" },
    {id:"wallet",label:"Wallet",icon:Wallet,path:"/seller/wallet"}
  ];

  const vendor = useSelector((state) => state.vendor.vendor);
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch({ type: "VENDOR_LOGOUT" });
    navigate("/vendor");
  };

  return (
    <>
      {/* Backdrop - Modern Blur */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      <aside
        className={`
          fixed left-0 top-0 z-50 h-screen w-64
          bg-[#151516] text-[#f5f5f5]
          border-r border-white/5
          flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static
        `}
      >
        {/* Mobile header */}
        <div className="flex items-center justify-between px-6 py-5 md:hidden">
          <h1 className="text-xl font-bold tracking-tight text-[#39b02c]">CHIP PRO</h1>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Brand - Modernized */}
        <div className="px-8 py-8 hidden md:block">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#39b02c] rounded-lg flex items-center justify-center text-white font-bold italic">C</div>
            <h1 className="text-xl font-bold tracking-tight uppercase">Chip <span className="text-[#39b02c]">64</span></h1>
          </div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 mt-3 font-semibold">
            Vendor Panel
          </p>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-4 py-4 space-y-1.5">
          {menuItems.map((item) => {
            const isActive = activeItem === item.id;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => {
                  navigate(item.path);
                  onClose();
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl
                  text-[11px] uppercase tracking-[0.12em] font-bold
                  transition-all duration-200 group
                  ${
                    isActive
                      ? "bg-[#39b02c] text-white shadow-lg shadow-[#39b02c]/20"
                      : "text-white/50 hover:bg-white/5 hover:text-white"
                  }
                `}
              >
                <Icon size={18} className={`${isActive ? "text-white" : "text-white/30 group-hover:text-[#39b02c]"} transition-colors`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Vendor Profile Section */}
        <div className="px-4 py-6 border-t border-white/5 relative" ref={dropdownRef}>
          {/* Dropdown - Floating Style */}
          {openDropdown && (
            <div className="absolute bottom-24 left-4 right-4 bg-[#212122] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-5 py-4 text-sm text-red-400 hover:bg-red-500/10 transition-colors font-semibold"
              >
                <LogOut size={16} />
                Sign out
              </button>
            </div>
          )}

          {/* User Toggle Button */}
          <button
            onClick={() => setOpenDropdown((p) => !p)}
            className={`w-full flex items-center justify-between p-3 rounded-2xl transition-all duration-200 ${openDropdown ? 'bg-white/5' : 'hover:bg-white/5'}`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#39b02c] to-[#2d8a22] text-white flex items-center justify-center text-sm font-bold shadow-inner">
                {vendor?.email?.substring(0, 2).toUpperCase() || 'VD'}
              </div>
              <div className="text-left overflow-hidden">
                <p className="text-xs font-bold text-white truncate uppercase tracking-wider">Vendor Store</p>
                <p className="text-[10px] text-white/30 truncate font-medium">{vendor?.email}</p>
              </div>
            </div>
            <ChevronUp size={14} className={`text-white/20 transition-transform duration-300 ${openDropdown ? 'rotate-0' : 'rotate-180'}`} />
          </button>
        </div>
      </aside>
    </>
  );
};

export default VendorSidebar;