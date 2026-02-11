
import { Link } from "react-router-dom";
import { ChevronRight, Package, Truck, CheckCircle2 } from "lucide-react";

const getDerivedStatus = (items = []) => {
  if (items.every((i) => i.status === "DELIVERED")) return "DELIVERED";
  if (items.some((i) => i.status === "SHIPPED")) return "SHIPPED";
  if (items.some((i) => i.status === "CONFIRMED")) return "CONFIRMED";
  return "PLACED";
};
export function OrdersList({ orders }) {
  const getStatusIcon = (status) => {
    switch (status) {
      case "CONFIRMED":
      case "PLACED":
        return <Package className="w-4 h-4 text-muted-foreground" />;
      case "SHIPPED":
        return <Truck className="w-4 h-4 text-blue-600" />;
      case "DELIVERED":
        return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      default:
        return null;
    }
  };

  if (!orders?.length) {
    return (
      <div className="text-center py-16">
        <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-lg text-muted-foreground">No orders  not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => {
        const firstItem = order.items[0];
        const derivedStatus=getDerivedStatus(order.items)

        return (
          <Link
            key={order._id}
            to={`/orders/${order._id}`}
            className="block"
          >
            <div className="border rounded-lg p-4 bg-card hover:bg-secondary/40 transition cursor-pointer">
              <div className="flex gap-4 items-start">

                {/* PRODUCT IMAGE */}
                <img
                  src={firstItem.image}
                  alt={firstItem.name}
                  className="w-20 h-20 rounded-md object-cover bg-muted"
                />

                {/* DETAILS */}
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-foreground">
                      {firstItem.name}
                    </h3>
                    {order.items.length > 1 && (
                      <span className="text-xs text-muted-foreground">
                        +{order.items.length - 1} more
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    {getStatusIcon(derivedStatus)}
                    <span>{derivedStatus}</span>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    Ordered on{" "}
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>

                {/* PRICE */}
                <div className="text-right space-y-1">
                  <p className="text-lg font-light text-foreground">
                    ₹{order.totalAmount.toFixed(2)}
                  </p>
                  <ChevronRight className="w-5 h-5 text-muted-foreground ml-auto" />
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
