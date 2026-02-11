export default function ItemsSection({ items = [] }) {
  return (
    <section className="space-y-6 border-t border-border pt-8">
      <div className="space-y-2">
        <h2 className="text-xl font-sans tracking-tight text-foreground">
          Order Items
        </h2>
        <p className="text-sm  font-sans text-muted-foreground">
          Review your selected items
        </p>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b border-border pb-4 last:border-b-0 last:pb-0"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-secondary text-3xl">
                  <img
    src={item.image}
    alt={item.name}
    className="h-full w-full object-cover"
  />

              </div>

              <div className="space-y-1">
                <p className="font-medium text-foreground font-sans">
                  {item.name}
                </p>
                <p className="text-sm text-muted-foreground font-sans">
                  Qty: {item.quantity}
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className="font-medium text-foreground font-sans">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
              <p className="text-xs text-muted-foreground">
                ${item.price.toFixed(2)} each
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}