// src/Components/Navbar/Navbar.jsx
"use client";

import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AccountDropdown from "../Account/AccountDropdown";
import SearchBar from "../SearchBar/SearchBar";

export default function Navbar({ isMenuOpen = false, onToggleMenu = () => {} ,color}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((s) => s.user?.user);
  const wishlistCount=useSelector((s)=>s.wishlist.items.length)
  const cartCount=useSelector((s)=>s.cart.items.length)
  const [navOpen, setNavOpen] = useState(isMenuOpen);
  const [accountOpen, setAccountOpen] = useState(false);
  const containerRef = useRef(null);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);


  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  return (
   <>
<nav
  ref={containerRef}
  className="
    sticky top-0 z-50
    py-2
    backdrop-blur-xl
    rounded-2xl
    shadow-lg
    w-full
  "
>
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/home" className="shrink-0 group">
            <div className="relative">
<div className="font-bold text-primary text-xl md:text-2xl px-2 md:px-10">
                CHIP64
              </div>
<div className="absolute inset-0 
  blur-lg 
  opacity-0 group-hover:opacity-25 
  transition-opacity duration-200 
  -z-10">
</div>            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center gap-1">
            <Link to="/" className="px-4 py-2 text-sm font-medium text-black dark:text-gray-300 hover:text-secondary dark:hover:text-purple-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 rounded-lg transition-all duration-200">
              Home
            </Link>
            <Link to="/shop" className="px-4 py-2 text-sm font-medium text-black dark:text-gray-300 hover:text-secondary dark:hover:text-purple-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 rounded-lg transition-all duration-200">
              Shop
            </Link>
          
            <Link to="/about" className="px-4 py-2 text-sm font-medium text-black dark:text-gray-300 hover:text-secondary dark:hover:text-purple-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 rounded-lg transition-all duration-200">
              About
            </Link>
            <Link to="/contact" className="px-4 py-2 text-sm font-medium text-black dark:text-gray-300 hover:text-secondary dark:hover:text-purple-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 rounded-lg transition-all duration-200">
              Contact
            </Link>

            {/* Become a Seller */}
            <Link
              to="/seller/register"
              className="ml-6 relative inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold 
 rounded-full hover:shadow-lg  hover:bg-secondary-foreground hover:text-primary hover:scale-105 transition-all duration-200 overflow-hidden group
 bg-primary text-black 
 "
            >
              <span className="relative z-10 ">Become a Seller</span>
              <svg className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              <div className="absolute inset-0 bg-gradient-to-r from-gren-600 to-green-900 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </Link>
          </div>
          {/* 🔥 Desktop Search */}
<div className="hidden xl:flex flex-1 justify-center px-6">
  <SearchBar />
</div>

          {/* Icons: Wishlist, Cart, User */}
          <div className="flex items-center gap-2  hover:text-secondary">
            {/* 🔍 Mobile Search Toggle */}
<button
  className="xl:hidden p-2.5 rounded-full hover:bg-gray-100 transition"
  onClick={() => setMobileSearchOpen((s) => !s)}
  aria-label="Search"
>
  <svg
    className="w-5 h-5 text-black"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
    />
  </svg>
</button>

            {/* Wishlist */}
           <button
  className="relative p-2.5 hover:bg-white dark:hover:bg-gray-800 rounded-full transition-all duration-200 hover:scale-110 group-hover:text-blue-600"
  aria-label="Wishlist"
  onClick={() => navigate("/wishlist")}
>
  <svg
    className="w-5 h-5 text-black  dark:text-gray-300  group-hover:text-blue-600 dark:group-hover:text-pink-400 transition-colors hover:text-secondary"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  </svg>

  {/* ❤️ COUNT BADGE */}
  {wishlistCount > 0 && (
    <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1
      rounded-full bg-[#77DD77] text-black text-[10px]
      flex items-center justify-center font-semibold shadow-md">
      {wishlistCount > 99 ? "99+" : wishlistCount}
    </span>
  )}
</button>


            {/* Cart */}
        <button
  className="relative p-2.5 hover:bg-gray-100 hover:text-red- dark:hover:bg-gray-800 hover:rounded-full transition-all duration-200 hover:scale-110"
  aria-label="Wishlist"
  onClick={() => navigate("/cart")}
>
  <svg
    className="w-5 h-5 text-black dark:text-gray-300 transition-colors  hover:text-secondary"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >

    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
    />
  </svg>

  {/* 🛒 CART COUNT */}
  {cartCount > 0 && (
    <span
      className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1
      rounded-full bg-[#8DB600] text-black text-[10px]
      flex items-center justify-center font-semibold shadow-md"
    >
      {cartCount > 99 ? "99+" : cartCount}
    </span>
  )}
</button>


            {/* User */}
            <div className="relative group">
             {/* User */}
<button
  className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all duration-200 hover:scale-110 "
  aria-label="Account"
  onClick={() => navigate("/account")}
>
  <svg
    className="w-5 h-5 text-black dark:text-gray-300 group-hover:text-secondary dark:group-hover:text-blue-400 transition-colors"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
</button>

              <span className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-gray-900 dark:bg-gray-100 px-3 py-1.5 text-xs font-medium text-white dark:text-gray-900 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                Account
              </span>

            </div>
{/* 🔍 MOBILE SEARCH OVERLAY */}
{mobileSearchOpen && (
  <div className="xl:hidden fixed inset-0 z-[999] bg-white"   onClick={() => setMobileSearchOpen(false)}
>
    
    {/* Header */}
    <div className="flex items-center gap-3 px-4 py-3 border-b">
      <button
        onClick={() => setMobileSearchOpen(false)}
        className="p-2 rounded-full hover:bg-gray-100"
      >
        ←
      </button>
      <span className="font-semibold">Search</span>
    </div>

    {/* Search Bar */}
    <div className="p-4"   onClick={(e) => e.stopPropagation()}   // ⭐ VERY IMPORTANT
>
<SearchBar onClose={() => setMobileSearchOpen(false)} />
    </div>

  </div>
)}

            {/* Mobile Menu Button */}
            <button
              className="xl:hidden p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all duration-200"
              onClick={() => { setNavOpen((s) => !s); onToggleMenu(); }}
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {navOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        {/* 🔥 Mobile Search */}


      </div>

      {/* Mobile Menu */}
      {navOpen && (
        <div className="xl:hidden border-t border-gray-200/50 dark:border-gray-800/50 bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl">
          <div className="px-4 py-4 space-y-1">
            <Link to="/home" className="block px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 rounded-lg transition-all duration-200">
              Home
            </Link>
            <Link to="/shop" className="block px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 rounded-lg transition-all duration-200">
              Shop
            </Link>
            
            <Link to="/about" className="block px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 rounded-lg transition-all duration-200">
              About
            </Link>
            <Link to="/contact" className="block px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 rounded-lg transition-all duration-200">
              Contact
            </Link>
            <Link
              to="/seller/register"
              className="mt-4 flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold bg-primary text-black hover:bg-primary hover:text-primary rounded-full hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-200"
            >
              Become a Seller
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>


          </div>

        </div>
      )}
    </nav>
    
</>
  );
}