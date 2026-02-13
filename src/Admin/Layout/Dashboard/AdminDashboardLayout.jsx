"use client";

import { useEffect, useState } from "react";
import { Card } from "@/Components/ui/card";
import { fetchDashboardApi } from "@/API/adminApi";

import {
  Users,
  Store,
  ShoppingBag,
  IndianRupee,
  Percent,
} from "lucide-react";

import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export function AdminDashboardContent() {
  const [data, setData] = useState(null);
  const [range, setRange] = useState("daily");
  const [loading, setLoading] = useState(true);

  /* ================= FETCH DASHBOARD ================= */
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetchDashboardApi(range);
        setData(res);
      } catch (err) {
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [range]);

  if (loading) {
    return (
      <div className="p-6 text-sm text-muted-foreground">
        Loading dashboard...
      </div>
    );
  }

  const { stats, revenueChart, recentOrders, recentVendors } = data;

  /* ================= STAT CARDS ================= */
  const statCards = [
    {
      label: "Revenue",
      value: `₹${stats.totalSales.toLocaleString()}`,
      icon: IndianRupee,
      color: "text-green-600",
    },
    {
      label: "Commission",
      value: `₹${stats.totalCommission.toLocaleString()}`,
      icon: Percent,
      color: "text-primary",
    },
    {
      label: "Orders",
      value: stats.totalOrders,
      icon: ShoppingBag,
    },
    {
      label: "Users",
      value: stats.totalUsers,
      icon: Users,
    },
    {
      label: "Vendors",
      value: stats.totalVendors,
      icon: Store,
    },
  ];

  return (
    <div className="space-y-8 p-6">

      {/* =====================================================
         STATS GRID
      ===================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {statCards.map((s) => {
          const Icon = s.icon;

          return (
            <Card
              key={s.label}
              className="p-6 flex items-center justify-between hover:shadow-md transition"
            >
              <div>
                <p className="text-sm text-muted-foreground">{s.label}</p>
                <p className={`text-2xl font-bold ${s.color || ""}`}>
                  {s.value}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-muted">
                <Icon size={20} />
              </div>
            </Card>
          );
        })}
      </div>



      {/* =====================================================
         REVENUE CHART
      ===================================================== */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-lg">Revenue Overview</h3>

          <select
            value={range}
            onChange={(e) => setRange(e.target.value)}
            className="border rounded-lg px-3 py-1 text-sm cursor-pointer"
          >
            <option value="daily">Daily</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>

        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueChart}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#8bf606"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>



      {/* =====================================================
         TABLES
      ===================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* -------- Recent Orders -------- */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Recent Orders</h3>

          <div className="space-y-3">
            {recentOrders.map((o) => (
              <div
                key={o._id}
                className="flex justify-between border-b pb-2 text-sm"
              >
                <div>
                  <p className="font-medium">{o.user?.name}</p>
                  <p className="text-muted-foreground text-xs">
                    {o.orderNumber}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-semibold">₹{o.totalAmount}</p>
                  <p className="text-xs text-muted-foreground">
                    {o.paymentStatus}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>



        {/* -------- Pending Vendors -------- */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4">
            Pending Vendor Requests
          </h3>

          <div className="space-y-3">
            {recentVendors.map((v) => (
              <div
                key={v._id}
                className="flex justify-between border-b pb-2 text-sm"
              >
                <div>
                  <p className="font-medium">{v.storeName}</p>
                  <p className="text-muted-foreground text-xs">{v.email}</p>
                </div>

                <span className="text-yellow-600 font-medium">
                  Pending
                </span>
              </div>
            ))}
          </div>
        </Card>

      </div>
    </div>
  );
}
