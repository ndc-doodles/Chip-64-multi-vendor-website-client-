import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderByIdApi } from "@/API/userAPI";

import OrderTimeline from "@/Components/Orders/OrderTimeline";
import AddressCard from "@/Components/Orders/AddressCard";
import OrderItems from "@/Components/Orders/OrderItems2";
import PriceSummary from "@/Components/Orders/PrizeSummary";

const getDerivedStatus = (items = []) => {
  if (items.every((i) => i.status === "DELIVERED")) return "DELIVERED";
  if (items.some((i) => i.status === "SHIPPED")) return "SHIPPED";
  if (items.some((i) => i.status === "CONFIRMED")) return "CONFIRMED";
  return "PLACED";
};
export default function OrderDetailPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const  data  = await getOrderByIdApi(orderId);
        setOrder(data.order);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) return <p className="text-center py-20">Loading...</p>;
  if (!order) return <p className="text-center py-20">Order not found</p>;
const derivedStatus = getDerivedStatus(order.items);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-primary">Order Details</h1>
          <p className="text-sm text-muted-foreground">
            Order ID: {order.orderNumber}
          </p>
        </div>

        <span
          className={`px-4 py-1 rounded-full text-sm ${
            order.paymentStatus === "PAID"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {order.paymentStatus}
        </span>
      </div>

      {/* Timeline */}
      <OrderTimeline status={derivedStatus} />


      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <AddressCard address={order.address} />
          <OrderItems items={order.items} />
        </div>

        <PriceSummary order={order} />
      </div>
    </div>
  );
}
