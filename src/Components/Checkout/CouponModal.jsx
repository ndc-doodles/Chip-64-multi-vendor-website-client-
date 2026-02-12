"use client";

import { useEffect, useState } from "react";
import { X, Tag } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { getAvailableCouponsApi } from "@/API/userAPI";
import { toast } from "sonner";

export default function CouponModal({
  open,
  onClose,
  onApply,   // expects coupon CODE
  cartTotal,
}) {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ---------------- FETCH AVAILABLE COUPONS ---------------- */
  useEffect(() => {
    if (!open) return;

    fetchCoupons();
  }, [open]);

  const fetchCoupons = async () => {
    try {
      setLoading(true);
      const res = await getAvailableCouponsApi(cartTotal);
      setCoupons(res.coupons || []);
    } catch (err) {
      toast.error("Failed to load coupons");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-xl bg-white p-6 space-y-4">

        {/* Header */}
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <Tag className="h-5 w-5" />
            Available Coupons
          </h3>
          <button onClick={onClose}>
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        {/* Body */}
        {loading ? (
          <p className="text-sm text-muted-foreground">
            Loading coupons...
          </p>
        ) : coupons.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No coupons available for this order
          </p>
        ) : (
          <div className="space-y-3">
            {coupons.map((coupon) => (
              <div
                key={coupon._id}
                className="flex justify-between items-center rounded-lg border p-4"
              >
                <div>
                  <p className="font-medium">{coupon.code}</p>
                  <p className="text-xs text-muted-foreground">
                    {coupon.discountType === "PERCENTAGE"
                      ? `${coupon.discountValue}% off`
                      : `₹${coupon.discountValue} off`}
                    {coupon.maxDiscountAmount &&
                      ` (Max ₹${coupon.maxDiscountAmount})`}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Min order ₹{coupon.minOrderValue}
                  </p>
                </div>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onApply(coupon.code)} // ✅ ONLY CODE
                >
                  Apply
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
