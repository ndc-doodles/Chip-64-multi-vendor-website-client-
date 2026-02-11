"use client";

import {
  LayoutDashboard,
  Package,
  Users,
  Store,
  Menu,
  X,
  ShieldCheck,
  Tag,
  CreditCard,
  CircleSlashIcon,
  ShieldMinus,
  Currency,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import SidebarItem from "../../Components/Sidebar/AdminSidebarItem";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
  { id: "categories", label: "Categories", icon: Package, path: "/admin/category" },
  {id:"brands", label:"Brands",icon:Tag,path:"/admin/brands"},
  { id: "users", label: "Users", icon: Users, path: "/admin/users" },
  { id: "vendors", label: "Vendors", icon: Store, path: "/admin/vendors" },
  {id:"coupons",label:"Coupons",icon:CreditCard,path:"/admin/coupons"},
  {id:"payout",label:"Payout",icon:CircleSlashIcon ,path:"/admin/payout"},
  {id:"commission",label:"Commission",icon:ShieldMinus,path:"/admin/commissions"},
  {id:"wallet",label:"Wallet",icon:Currency,path:"/admin/wallet"}
  
];

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const activeItem = navItems.find((item) =>
    location.pathname.startsWith(item.path)
  )?.id;

  return (
    <>
      {/* Mobile toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden bg-white shadow-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-screen w-[260px]
        bg-gray-50 border-r border-gray-200 z-40
        transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">

          {/* Brand */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gray-900 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-base font-semibold text-gray-900">
                  CHIP 64
                </h1>
                <p className="text-xs text-gray-500">Admin</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => (
              <SidebarItem
                key={item.id}
                icon={item.icon}
                label={item.label}
                active={activeItem === item.id}
                onClick={() => {
                  navigate(item.path);
                  setIsOpen(false);
                }}
              />
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}
