
import { Calendar, MapPin, Phone } from "lucide-react";

export function OrderConfirmation({ order }) {
  const address = order.address;

  return (
    <div className="space-y-6">
      <div className="bg-secondary/30 rounded-lg border border-border p-8">
        <div className="grid gap-8 md:grid-cols-2">
          
          {/* Order Info */}
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase mb-2">
              Order Number
            </p>
            <p className="text-2xl font-light text-foreground mb-6">
              #{order.orderNumber || 0}
            </p>

            <p className="text-xs font-medium text-muted-foreground uppercase mb-2">
              Order Date
            </p>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <p className="font-light">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Shipping Address */}
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase mb-4">
              Shipping Address
            </p>

            <div className="space-y-3">
              <p className="font-light text-foreground">
                {address.fullName}
              </p>

              <div className="flex gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5" />
                <div>
                  <p>{address.line1}</p>
                  {address.line2 && <p>{address.line2}</p>}
                  <p>
                    {address.city}, {address.state} - {address.postalCode}
                  </p>
                </div>
              </div>

              <div className="flex gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                <p>{address.phone}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
