"use client";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { SuccessHeader } from "@/Components/Orders/OrderHeader";
import { OrderConfirmation } from "@/Components/Orders/OrderConfirmation";
import { OrderItems } from "@/Components/Orders/OrderItems";
import { NextSteps } from "@/Components/Orders/NextSteps";

import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { getOrderByIdApi } from "@/API/userAPI";
import { toast } from "sonner";
import { useSelector } from "react-redux";

export default function SuccessPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const user=useSelector((s)=>s.user)

  /* ---------------- FETCH ORDER ---------------- */
  useEffect(() => {
    if (!orderId) return;

    (async () => {
      try {
        const res = await getOrderByIdApi(orderId);
        setOrder(res.order);
      } catch (err) {
        toast.error("Failed to load order");
      } finally {
        setLoading(false);
      }
    })();
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading order details...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Order not found
      </div>
    );
  }

  return (
  <main className="min-h-screen bg-background">
    <div
      className="
        mx-auto max-w-4xl
        px-4
        py-6 sm:py-10 lg:py-12
      "
    >
      <SuccessHeader />

      {/* ================= GRID ================= */}
      <div
        className="
          grid
          gap-8 sm:gap-10 lg:gap-12
          lg:grid-cols-3
        "
      >
        {/* ================= LEFT ================= */}
        <div className="lg:col-span-2 space-y-8 sm:space-y-10 lg:space-y-12">
          <OrderConfirmation order={order} />

          <OrderItems items={order.items} />

          <NextSteps
            status={order.orderStatus}
            expectedDelivery={order.expectedDelivery}
          />
        </div>

        {/* ================= RIGHT (SUMMARY) ================= */}
        <div className="lg:col-span-1">
          <div
            className="
              rounded-lg border bg-card
              p-4 sm:p-6
              space-y-5
              lg:sticky lg:top-8
            "
          >
            <div>
              <p className="text-sm text-muted-foreground">Order Total</p>
              <p className="text-2xl sm:text-3xl font-light">
                ₹{order.totalAmount.toFixed(2)}
              </p>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{order.subtotal.toFixed(2)}</span>
              </div>

              {order.discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Coupon Discount</span>
                  <span>-₹{order.discount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>₹{order?.shipping?.toFixed(2) || 0}</span>
              </div>

              <div className="border-t pt-3 flex justify-between font-medium">
                <span>Total</span>
                <span>₹{order.totalAmount.toFixed(2)}</span>
              </div>
            </div>

            {/* Buttons stack nicely on mobile */}
            <div className="flex flex-col gap-3">
              <Button
                className="w-full"
                onClick={() => navigate(`/orders/${order._id}`)}
              >
                Track Order
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>

              <Button variant="outline" className="w-full">
                Download Receipt
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= FOOTER ================= */}
      <div
        className="
          mt-10 sm:mt-14 lg:mt-16
          flex flex-col gap-4
          border-t pt-6 sm:pt-8
        "
      >
        <Button
          variant="outline"
          className="bg-blue-950 text-white w-full sm:w-auto"
          onClick={() => navigate("/shop")}
        >
          Continue Shopping
        </Button>
      </div>
    </div>
    {/* ================= MOBILE STICKY ACTION BAR ================= */}
<div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-black/10 px-4 py-3 sm:hidden">

  <div className="flex items-center gap-3">

    {/* Track Order */}
    <button
      className="
        flex-1
        border border-black/10
        py-3
        rounded-full
        font-semibold
        text-sm
        transition
        active:scale-95
      "
      onClick={() => navigate(`/orders/${order._id}`)}
    >
      Track Order
    </button>

    {/* Continue Shopping */}
    <button
      className="
        flex-1
        bg-primary
        text-black
        py-3
        rounded-full
        font-bold
        text-sm
        transition
        active:scale-95
      "
      onClick={() => navigate("/shop")}
    >
      Continue Shopping
    </button>

  </div>
</div>

  </main>
);

}
