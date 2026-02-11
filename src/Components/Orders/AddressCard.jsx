export default function AddressCard({ address }) {
  return (
    <div className="bg-white border rounded-xl p-6">
      <h3 className="font-medium mb-2">Delivery Address</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {address.fullName}<br />
        {address.line1} ,{address.line2}<br />
        {address.street} {address.city}<br />
        {address.state} - {address.postalCode}<br />
        Phone: {address.phone}
      </p>
    </div>
  );
}
