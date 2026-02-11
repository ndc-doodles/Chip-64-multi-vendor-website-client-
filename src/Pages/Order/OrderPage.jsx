"use client";

import { useEffect, useState } from "react";
import { OrdersFilter } from "@/Components/Orders/OrdersFilter";
import { OrdersList } from "@/Components/Orders/OrdersList";
import { getUserOrdersApi } from "@/API/userAPI";
import { toast } from "sonner";
import HeaderLayout from "@/Layout/Header/HeaderLayout";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  /* ---------------- FETCH ORDERS ---------------- */
  const fetchOrders = async () => {
    try {
      setLoading(true);

      const params = {};
      if (statusFilter !== "all") params.status = statusFilter;
      if (paymentFilter !== "all") params.paymentStatus = paymentFilter;

      const res = await getUserOrdersApi(params);
      setOrders(res.orders || []);
    } catch (err) {
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [statusFilter, paymentFilter]);

  return (
    <>
      <HeaderLayout />

      <main className="min-h-screen bg-background">

        {/* ✅ mobile padding smaller, desktop untouched */}
        <div
          className="
            mx-auto max-w-6xl
            px-4 sm:px-6 lg:px-8
            py-6 sm:py-10 lg:py-12
            pb-20 sm:pb-12
          "
        >
          {/* ================= FILTERS ================= */}
          {/* 
             ✅ Mobile: sticky top bar for better UX
             ✅ Desktop: normal flow
          */}
          <div
            className="
              sticky top-0 z-20
              bg-background/90 backdrop-blur-md
              -mx-4 px-4 py-3
              sm:static sm:bg-transparent sm:backdrop-blur-none sm:p-0 sm:mx-0
              mb-6
            "
          >
            <OrdersFilter
              statusFilter={statusFilter}
              paymentFilter={paymentFilter}
              onStatusChange={setStatusFilter}
              onPaymentChange={setPaymentFilter}
            />
          </div>

          {/* ================= LIST ================= */}
          {loading ? (
            <p className="text-center text-muted-foreground py-16">
              Loading orders...
            </p>
          ) : orders.length === 0 ? (
            /* ✅ Better mobile empty state */
            <div className="text-center py-24 space-y-3">
              <p className="text-lg font-semibold">
                No orders yet
              </p>
              <p className="text-sm text-muted-foreground">
                Your purchases will appear here
              </p>
            </div>
          ) : (
            <OrdersList orders={orders} />
          )}
        </div>
      </main>
    </>
  );
}
