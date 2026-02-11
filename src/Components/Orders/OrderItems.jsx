"use client";

export function OrderItems({ items }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-light">Order Items</h2>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item._id}
            className="flex gap-4 border-b pb-4 last:border-b-0"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 rounded object-cover bg-muted"
            />

            <div className="flex-1">
              <h3 className="font-light">{item.name}</h3>
              <p className="text-sm text-muted-foreground">
                Qty: {item.qty}
              </p>
            </div>

            <div className="text-right">
              <p className="font-light">
                ₹{(item.price * item.qty).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
