export default function PriceSummary({ order }) {
  return (
    <div className="bg-gray-50 border rounded-xl p-6 h-fit">
      <h3 className="font-medium mb-4">Price Details</h3>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{order.subtotal}</span>
        </div>

        {order.discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Coupon Discount</span>
            <span>- ₹{order.discount}</span>
          </div>
        )}

        <div className="flex justify-between">
          <span>Delivery</span>
          <span>Free</span>
        </div>
      </div>

      <div className="border-t mt-4 pt-4 flex justify-between font-semibold">
        <span>Total</span>
        <span>₹{order.totalAmount}</span>
      </div>
    </div>
  );
}
