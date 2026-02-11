"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import CouponTable from "@/Admin/Layout/Coupon/CouponTable";
import CreateCouponModal from "@/Admin/Layout/Coupon/CreateCouponModal";
import { getAllCouponsApi } from "@/API/adminApi";
import AdminSidebar from "@/Admin/Layout/Sidebar/AdminSidebarLayout";

export default function CouponsPage() {
  const [coupons, setCoupons] = useState([]);
  const [open, setOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [type, setType] = useState("ALL");

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    const data = await getAllCouponsApi();
    setCoupons(data);
  };

  const filteredCoupons = useMemo(() => {
    return coupons.filter((coupon) => {
      const matchesSearch = coupon.code
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus =
        status === "ALL" ||
        (status === "ACTIVE" && coupon.isActive) ||
        (status === "DISABLED" && !coupon.isActive);

      const matchesType =
        type === "ALL" || coupon.discountType === type;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [coupons, search, status, type]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 ml-0 md:ml-64 p-4 sm:p-6 space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Coupons</h1>
            <p className="text-sm text-muted-foreground">
              Manage discount coupons
            </p>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 bg-black text-white px-5 py-2 rounded-full"
          >
            <Plus size={16} />
            Create Coupon
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard label="Total Coupons" value={coupons.length} />
          <StatCard
            label="Active Coupons"
            value={coupons.filter(c => c.isActive).length}
          />
          <StatCard
            label="Expired Coupons"
            value={coupons.filter(
              c => new Date(c.expiryDate) < new Date()
            ).length}
          />
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border p-4 flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              placeholder="Search coupon code..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 input"
            />
          </div>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="input w-full lg:w-44"
          >
            <option value="ALL">All Status</option>
            <option value="ACTIVE">Active</option>
            <option value="DISABLED">Disabled</option>
          </select>

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="input w-full lg:w-44"
          >
            <option value="ALL">All Types</option>
            <option value="PERCENTAGE">Percentage</option>
            <option value="FLAT">Flat</option>
          </select>
        </div>

        {/* Table */}
        <CouponTable coupons={filteredCoupons} refresh={fetchCoupons} />

        {/* Modal */}
        <CreateCouponModal
          open={open}
          setOpen={setOpen}
          refresh={fetchCoupons}
        />
      </main>
    </div>
  );
}

/* ---------------- Stats Card ---------------- */

function StatCard({ label, value }) {
  return (
    <div className="bg-white rounded-xl border p-5">
      <p className="text-sm text-gray-500">{label}</p>
      <h3 className="text-2xl font-semibold mt-1">{value}</h3>
    </div>
  );
}
