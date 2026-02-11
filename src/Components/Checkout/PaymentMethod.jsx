"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Banknote, CreditCard } from "lucide-react";

export default function PaymentSection({
  paymentMethod,
  onPaymentMethodChange,
}) {
  return (
    <section className="space-y-6 border-t border-border pt-8">
      <div className="space-y-2">
        <h2 className="text-xl font-light tracking-tight text-foreground">
          Payment Method
        </h2>
        <p className="text-sm text-muted-foreground">
          Choose your preferred payment option
        </p>
      </div>

      <RadioGroup value={paymentMethod} onValueChange={onPaymentMethodChange}>
        <div className="space-y-3">

          {/* Cash on Delivery */}
          <label className="flex cursor-pointer items-center gap-4 rounded-lg border border-border p-4 transition-all hover:bg-secondary">
            <RadioGroupItem
              value="COD"
              id="cod"
              className="border-border"
            />

            <div className="flex flex-1 items-center gap-3">
              <Banknote className="h-5 w-5 text-muted-foreground" />
              <div>
                <Label
                  htmlFor="cod"
                  className="text-base font-medium text-foreground cursor-pointer"
                >
                  Cash on Delivery
                </Label>
                <p className="text-xs text-muted-foreground">
                  Pay when your order arrives
                </p>
              </div>
            </div>
          </label>

          {/* Razorpay */}
          <label className="flex cursor-pointer items-center gap-4 rounded-lg border border-border p-4 transition-all hover:bg-secondary">
            <RadioGroupItem
              value="RAZORPAY"
              id="razorpay"
              className="border-border"
            />

            <div className="flex flex-1 items-center gap-3">
              <CreditCard className="h-5 w-5 text-muted-foreground" />
              <div>
                <Label
                  htmlFor="razorpay"
                  className="text-base font-medium text-foreground cursor-pointer"
                >
                  Razorpay
                </Label>
                <p className="text-xs text-muted-foreground">
                  UPI, Cards, Netbanking
                </p>
              </div>
            </div>
          </label>

        </div>
      </RadioGroup>
    </section>
  );
}
