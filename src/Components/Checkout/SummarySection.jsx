"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, Tag } from "lucide-react";
import { toast } from "sonner";
import CouponModal from "./CouponModal";
import { validateCouponApi } from "@/API/userAPI";

export default function SummarySection({
  subtotal,
  shipping,
  total,
  selectedAddress,
  paymentMethod,
  onPlaceOrder,
  appliedCoupon, 
  setAppliedCoupon
}) {
  const [couponInput, setCouponInput] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const discount = appliedCoupon ? appliedCoupon.discount : 0;
  const finalTotal = appliedCoupon
    ? appliedCoupon.finalAmount
    : total;

  /* ---------------- APPLY COUPON (ONLY PLACE) ---------------- */
  const applyCoupon = async (code) => {
    if (!code) return;

    try {
      setLoading(true);

      const res = await validateCouponApi({
        code,
        cartTotal: total,
      });

      /*
        res = {
          success: true,
          couponId,
          discount,
          finalAmount
        }
      */

      setAppliedCoupon(res);
      setCouponInput("");
      setShowModal(false);
      toast.success("Coupon applied");
    } catch (err) {
      toast.error(err?.message || "Invalid coupon");
    } finally {
      setLoading(false);
    }
  };



  return (
    <>
      <div className="sticky top-8 space-y-6">
        <div className="space-y-6 rounded-lg border bg-white p-6">

          {/* ---------------- COUPON SECTION ---------------- */}
          <div className="space-y-3">
            <p className="text-sm font-medium flex items-center gap-2">
              <Tag className="h-4 w-4" />
              Apply Coupon
            </p>

            {!appliedCoupon ? (
              <>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter coupon code"
                    value={couponInput}
                    onChange={(e) =>
                      setCouponInput(e.target.value.toUpperCase())
                    }
                  />
                  <Button
                    variant="outline"
                    disabled={!couponInput || loading}
                    onClick={() => applyCoupon(couponInput)}
                  >
                    Apply
                  </Button>
                </div>

                <button
                  className="text-sm underline text-primary"
                  onClick={() => setShowModal(true)}
                >
                  Browse available coupons
                </button>
              </>
            ) : (
              <div className="flex justify-between items-center bg-secondary px-3 py-2 rounded-md text-sm">
                <span className="flex items-center gap-2 text-green-600">
                  <CheckCircle2 className="h-4 w-4" />
                  Coupon applied
                </span>
                <button
                  className="text-xs underline"
                  onClick={() => setAppliedCoupon(null)}
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          {/* ---------------- PRICE BREAKDOWN ---------------- */}
          <div className="space-y-4 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>

           
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>₹{shipping.toFixed(2)}</span>
            </div>

            {appliedCoupon && (
              <div className="flex justify-between text-green-600">
                <span>Coupon Discount</span>
                <span>-₹{discount.toFixed(2)}</span>
              </div>
            )}
          </div>

          <div className="border-t pt-4 flex justify-between">
            <span className="text-base font-medium">Order Total</span>
            <span className="text-2xl font-light">
              ₹{finalTotal.toFixed(2)}
            </span>
          </div>
        </div>
<Button
  size="lg"
  className="hidden lg:flex w-full gap-2"
  onClick={onPlaceOrder}
>
          <CheckCircle2 className="h-5 w-5" />
          Complete Purchase
        </Button>
      </div>

      {/* ---------------- COUPON MODAL ---------------- */}
     <CouponModal
  open={showModal}
  onClose={() => setShowModal(false)}
  onApply={applyCoupon}
  cartTotal={total}   // ✅ MUST PASS THIS
/>
    </>
  );
}
