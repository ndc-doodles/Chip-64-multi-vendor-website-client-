"use client";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HeaderLayout from "@/Layout/Header/HeaderLayout";
import { logoutUser } from "@/redux/actions/authActions";
import {
  ShoppingBag,
  MapPin,
  Heart,
  Shield,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import {accountStatsApi } from "@/API/userAPI";

export default function AccountHub() {
  const user = useSelector((s) => s.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const [stats,setStats]=useState({
      ordersCount:0,
      addressCount:0
    })

    useEffect(()=>{
      const LoadStats=async()=>{
        try {
           const data= await accountStatsApi()
           setStats(data)
        } catch (error) {
          console.log(error)
        }
      }
      LoadStats()
    },[])

  const logout = async () => {
    await dispatch(logoutUser());
    navigate("/");
  };

  const wishlistItemsCount = useSelector((s) => s.wishlist?.items || []).length;

  const Item = ({ icon: Icon, title, desc, onClick }) => (
    <button
      onClick={onClick}
className="
  group relative overflow-hidden rounded-2xl bg-white p-5 text-left
  border border-gray-100
  transition-all duration-300

  hover:shadow-[0_20px_50px_rgba(141,182,0,0.15)]
  hover:border-[#8DB600]/30

  active:shadow-[0_20px_50px_rgba(141,182,0,0.15)]
  active:border-[#8DB600]/30 cursor-pointer
"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
<div className="
  rounded-xl bg-gray-50 p-3 text-gray-600
  transition-all duration-300
  group-hover:bg-primary group-hover:text-black
  group-active:bg-primary group-active:text-black
">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <p className="font-semibold text-gray-900">{title}</p>
            <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
          </div>
        </div>
<ChevronRight className="
  h-4 w-4 text-gray-300 transition-transform
  group-hover:translate-x-1 group-hover:text-black
  group-active:translate-x-1 group-active:text-black
" />
      </div>
    </button>
  );

  return (
    <main className="min-h-screen bg-[#fafafa] selection:bg-[#8DB600]/30">
      <HeaderLayout />

      <section className="mx-auto max-w-4xl px-6 py-16">
        {/* Subtle Green Glow Background Elements */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#8DB600]/5 blur-[120px] pointer-events-none -z-10" />

        {/* Profile Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-[#8DB600] font-bold tracking-widest text-xs uppercase">Your Account</span>
            <h1 className="text-4xl font-bold text-gray-900 mt-2">
Hello,{" "}
<span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-500">
  {user?.name ? user.name.split(" ")[0] : "Guest"}
</span>
            </h1>
            <p className="text-gray-500 text-sm mt-1">{user?.email}</p>
          </div>
          
         {user ? (
  <button
    onClick={logout}
    className="flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-red-500 transition-colors uppercase tracking-wider cursor-pointer"
  >
    <LogOut size={14} />
    Sign Out
  </button>
) : (
  <button
    onClick={() => navigate("/login")}
    className="text-xs font-semibold text-gray-400 hover:text-[#8DB600] transition-colors uppercase tracking-wider"
  >
    Sign In
  </button>
)}

        </div>

        {/* Stats Strip - Minimalist Green Touch */}
        <div className="grid grid-cols-3 gap-6 mb-10">
          {[
            { label: "Orders", val: stats.ordersCount, color: "text-gray-900" },
            { label: "Wishlist", val: wishlistItemsCount, color: "text-[#8DB600]" },
            { label: "Addresses", val: stats.addressCount, color: "text-gray-900" }
          ].map((stat, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm cursor-pointer">
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.val}</p>
              <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Settings Grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          <Item
            icon={ShoppingBag}
            title="Order History"
            desc="Manage your recent purchases"
            onClick={() => navigate("/orders")}
          />
          <Item
            icon={Heart}
            title="My Wishlist"
            desc="View your saved favorites"
            onClick={() => navigate("/wishlist")}
          />
          <Item
            icon={MapPin}
            title="Saved Addresses"
            desc="Edit your delivery locations"
            onClick={() => navigate("/address")}
          />
          <Item
            icon={Shield}
            title="Privacy Settings"
            desc="Update password & security"
            onClick={() => navigate("/security")}
          />
        </div>

        {/* Support Card */}
        <div className="mt-10 p-6 rounded-2xl bg-primary text-black flex items-center justify-between overflow-hidden relative">
            <div className="relative z-10">
                <h3 className="font-bold text-lg text-black">Need any help?</h3>
                <p className="text-black text-sm">Our support team is available 24/7</p>
            </div>
            <button className="relative z-10 bg-white text-black px-5 py-2 rounded-full text-sm font-bold hover:bg-gray-100 transition-colors cursor-pointer" onClick={()=>navigate("/contact")}>
                Contact Us
            </button>
            {/* Decorative Circle */}
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
        </div>

      </section>
    </main>
  );
}