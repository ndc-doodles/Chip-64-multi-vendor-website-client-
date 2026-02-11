import React, { useState } from "react";
import { Edit, Power, RefreshCw, Package, Search } from "lucide-react";

// Mock data

function ToggleSwitch({ checked, onChange, disabled, loading }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      disabled={disabled || loading}
      onClick={() => !disabled && !loading && onChange(!checked)}
      className={`relative inline-flex items-center h-7 w-14 rounded-full transition-all duration-300 focus:outline-none focus:ring-4 ${
        checked
          ? "bg-gradient-to-r from-emerald-500 to-green-600 focus:ring-emerald-200 shadow-md shadow-emerald-200"
          : "bg-gradient-to-r from-gray-300 to-gray-400 focus:ring-gray-200"
      } ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer hover:scale-105"}`}
      title={checked ? "Active - Click to disable" : "Inactive - Click to enable"}
    >
      <span
        className={`block h-5 w-5 transform rounded-full bg-white shadow-lg transition-all duration-300 ${
          checked ? "translate-x-8" : "translate-x-1"
        }`}
      />
      {loading && (
        <svg
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-white"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3" />
          <path d="M22 12a10 10 0 00-10-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
      )}
    </button>
  );
}

function DesktopRow({ p, onEdit, onToggle, loading }) {
  return (
    <tr className="border-b border-gray-100 last:border-0 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 group">
      <td className="py-4 px-6">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-gray-200 shadow-md group-hover:shadow-lg transition-all duration-200">
            <img src={p.mainImage} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-base group-hover:text-blue-600 transition-colors">{p.name}</h3>
            <p className="text-sm text-gray-500 mt-1 max-w-md line-clamp-2">{p.description || "—"}</p>
          </div>
        </div>
      </td>
      <td className="py-4 px-6">
        <div className="flex items-center gap-3">
          <div
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold shadow-sm ${
              p.isActive
                ? "bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 ring-2 ring-emerald-200"
                : "bg-gradient-to-r from-rose-100 to-red-100 text-rose-700 ring-2 ring-rose-200"
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${p.isActive ? "bg-emerald-500 animate-pulse" : "bg-rose-500"}`} />
            {p.isActive ? "Active" : "Inactive"}
          </div>
          <ToggleSwitch checked={!!p.isActive} onChange={() => onToggle && onToggle(p)} loading={!!loading} />
        </div>
      </td>
      <td className="py-4 px-6">
        <button
          onClick={() => onEdit && onEdit(p)}
          className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold flex items-center gap-2 hover:shadow-lg hover:scale-105 transition-all duration-200"
          type="button"
        >
          <Edit size={16} />
          Edit
        </button>
      </td>
    </tr>
  );
}
function ProductCard({ p, onEdit, onToggle, loading }) {
  return (
    <article className="flex flex-col gap-3 p-4 rounded-xl border border-gray-200 bg-white shadow-md hover:shadow-lg transition-all duration-300">
      
      {/* Image */}
      <div className="w-full h-36 rounded-lg overflow-hidden border border-gray-200">
        <img
          src={p.mainImage}
          alt={p.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="space-y-2">
        <h3 className="text-sm font-bold text-gray-800 line-clamp-1">
          {p.name}
        </h3>

        <p className="text-xs text-gray-600 line-clamp-2">
          {p.description}
        </p>

        {/* Status + Toggle */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div
            className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-[10px] font-bold ${
              p.isActive
                ? "bg-emerald-100 text-emerald-700"
                : "bg-rose-100 text-rose-700"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                p.isActive ? "bg-emerald-500" : "bg-rose-500"
              }`}
            />
            {p.isActive ? "Active" : "Inactive"}
          </div>

          <ToggleSwitch
            checked={!!p.isActive}
            onChange={() => onToggle && onToggle(p)}
            loading={!!loading}
          />
        </div>

        {/* Edit Button */}
        <button
          onClick={() => onEdit && onEdit(p)}
          className="w-full mt-2 px-3 py-2 text-sm bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2"
        >
          <Edit size={14} />
          Edit
        </button>
      </div>
    </article>
  );
}


export default function ProductList({
  products = mockProducts,
  onEdit = () => {},
  onToggle = () => {},
  loadingIds = new Set(),
  onRefresh = () => {},
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border-2 border-blue-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
            <Package className="text-white" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Products</h2>
            <p className="text-sm text-gray-600">{products.length} total products</p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 pl-10 pr-4 py-2.5 rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
            />
          </div>
          <button
            onClick={onRefresh}
            className="p-2.5 bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-50 hover:scale-105 transition-all duration-200"
            title="Refresh"
          >
            <RefreshCw size={20} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block w-full rounded-2xl border-2 border-gray-200 bg-white shadow-lg overflow-hidden">
        <table className="w-full table-auto">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
            <tr className="text-sm text-gray-700 font-bold uppercase">
              <th className="text-left py-4 px-6">Product</th>
              <th className="text-left py-4 px-6">Status</th>
              <th className="text-left py-4 px-6">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan="3" className="py-12 px-6 text-center">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                      <Package size={32} className="text-gray-400" />
                    </div>
                    <p className="text-gray-600 font-semibold">
                      {searchTerm ? "No products found" : "No products yet"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {searchTerm ? "Try a different search term" : "Create your first product to get started"}
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredProducts.map((p) => (
                <DesktopRow key={p._id} p={p} onEdit={onEdit} onToggle={onToggle} loading={loadingIds.has(p._id)} />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden">
        {filteredProducts.length === 0 ? (
          <div className="rounded-2xl border-2 border-gray-200 bg-white p-8 text-center shadow-lg">
            <div className="flex flex-col items-center justify-center gap-3">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                <Package size={32} className="text-gray-400" />
              </div>
              <p className="text-gray-600 font-semibold">
                {searchTerm ? "No products found" : "No products yet"}
              </p>
              <p className="text-sm text-gray-500">
                {searchTerm ? "Try a different search term" : "Create your first product to get started"}
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredProducts.map((p) => (
              <ProductCard key={p._id} p={p} onEdit={onEdit} onToggle={onToggle} loading={loadingIds.has(p._id)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}