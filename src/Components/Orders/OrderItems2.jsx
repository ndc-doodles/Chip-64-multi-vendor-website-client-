export default function OrderItems({ items }) {
  return (
    <div className="bg-white border rounded-xl p-6 space-y-4">
      <h3 className="font-medium">Order Items</h3>

      {items.map((item) => (
        <div
          key={item._id}
          className="flex items-center justify-between border-b last:border-b-0 pb-4"
        >
          <div className="flex items-center gap-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 rounded-lg object-cover"
            />

            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-muted-foreground">
                Qty: {item.qty}
              </p>

              {/* ✅ ITEM STATUS */}
              <span
                className={`inline-block mt-1 px-3 py-0.5 rounded-full text-xs font-semibold
                  ${
                    item.status === "DELIVERED"
                      ? "bg-green-100 text-green-700"
                      : item.status === "SHIPPED"
                      ? "bg-purple-100 text-purple-700"
                      : item.status === "CONFIRMED"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-yellow-100 text-yellow-700"
                  }
                `}
              >
                {item.status}
              </span>
            </div>
          </div>

          <p className="font-medium">₹{item.price.toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}
