import React, { useState, useEffect, useRef } from "react";
import { searchProductsApi } from "@/API/userAPI";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";

export default function SearchBar({ onClose }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  /* ================= AUTO FOCUS (mobile nice UX) ================= */
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  /* ================= DEBOUNCE SEARCH ================= */
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.trim()) {
        const data = await searchProductsApi(query);
        setResults(data);
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  /* ================= SEARCH ACTION ================= */
  const handleSearch = () => {
    if (!query.trim()) return;

    navigate(`/shop?search=${query}`);
    onClose?.();   // ⭐ auto close overlay
  };

  return (
    <div className="relative w-full max-w-md">
      
      {/* ================= INPUT ================= */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="w-full pl-10 pr-10 py-3 rounded-xl bg-gray-100 focus:outline-none"
        />

        {/* 🔍 SEARCH ICON BUTTON */}
        <button
          onClick={handleSearch}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
        >
          <Search size={18} />
        </button>

        {/* ❌ CLEAR BUTTON */}
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* ================= DROPDOWN RESULTS ================= */}
      {results.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-xl z-50 max-h-80 overflow-y-auto">
          {results.map((p) => (
            <div
              key={p._id}
              onClick={() => {
                navigate(`/product/${p.slug}`);
                onClose?.();   // ⭐ close mobile overlay
              }}
              className="flex items-center gap-3 p-3 hover:bg-gray-100 cursor-pointer"
            >
              <img
                src={p.mainImage}
                className="w-10 h-10 object-contain"
              />

              <div>
                <p className="text-sm font-medium">{p.name}</p>
                <p className="text-xs text-gray-500">₹{p.basePrice}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
