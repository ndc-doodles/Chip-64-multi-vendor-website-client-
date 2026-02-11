"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import { createCouponApi } from "@/API/adminApi";

export default function CreateCouponModal({ open, setOpen, refresh }) {
  const [form, setForm] = useState({
    code: "",
    discountType: "PERCENTAGE",
    discountValue: "",
    maxDiscountAmount: "",
    minOrderValue: "",
    expiryDate: "",
    usageLimit: ""
  });

  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: name === "code" ? value.toUpperCase() : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.code || !form.discountValue || !form.expiryDate) {
      return toast.error("Required fields missing");
    }

    const payload = {
      code: form.code,
      discountType: form.discountType,
      discountValue: Number(form.discountValue),
      expiryDate: form.expiryDate,
      minOrderValue: Number(form.minOrderValue) || 0,
      usageLimit: Number(form.usageLimit) || undefined
    };

    if (form.discountType === "PERCENTAGE") {
      payload.maxDiscountAmount = Number(form.maxDiscountAmount) || undefined;
    }

    try {
      setLoading(true);
      await createCouponApi(payload);
      toast.success("Coupon created successfully");
      refresh();
      setOpen(false);
    } catch (err) {
      toast.error(err?.message || "Failed to create coupon");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
  <div className="bg-white w-full max-w-lg rounded-2xl 
                  max-h-[90vh] overflow-y-auto 
                  p-6 space-y-5">

        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Create Coupon</h2>
          <button onClick={() => setOpen(false)}>
            <X />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Code */}
          <div>
            <label className="text-sm font-medium">Coupon Code</label>
            <input
              name="code"
              value={form.code}
              onChange={handleChange}
              placeholder="SAVE10"
              className="w-full mt-1 input"
            />
          </div>

          {/* Discount Type */}
          <div>
            <label className="text-sm font-medium">Discount Type</label>
            <select
              name="discountType"
              value={form.discountType}
              onChange={handleChange}
              className="w-full mt-1 input"
            >
              <option value="PERCENTAGE">Percentage</option>
              <option value="FLAT">Flat</option>
            </select>
          </div>

          {/* Discount Value */}
          <div>
            <label className="text-sm font-medium">
              Discount Value {form.discountType === "PERCENTAGE" ? "(%)" : "(₹)"}
            </label>
            <input
              name="discountValue"
              type="number"
              value={form.discountValue}
              onChange={handleChange}
              className="w-full mt-1 input"
            />
          </div>

          {/* Max Discount (Conditional) */}
          {form.discountType === "PERCENTAGE" && (
            <div>
              <label className="text-sm font-medium">Max Discount Amount (₹)</label>
              <input
                name="maxDiscountAmount"
                type="number"
                value={form.maxDiscountAmount}
                onChange={handleChange}
                className="w-full mt-1 input"
              />
            </div>
          )}

          {/* Min Order */}
          <div>
            <label className="text-sm font-medium">Minimum Order Value (₹)</label>
            <input
              name="minOrderValue"
              type="number"
              value={form.minOrderValue}
              onChange={handleChange}
              className="w-full mt-1 input"
            />
          </div>

          {/* Expiry */}
          <div>
            <label className="text-sm font-medium">Expiry Date</label>
            <input
              name="expiryDate"
              type="date"
              value={form.expiryDate}
              onChange={handleChange}
              className="w-full mt-1 input"
            />
          </div>

          {/* Usage Limit */}
          <div>
            <label className="text-sm font-medium">Usage Limit</label>
            <input
              name="usageLimit"
              type="number"
              value={form.usageLimit}
              onChange={handleChange}
              className="w-full mt-1 input"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-4 py-2 rounded-lg border"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-lg bg-black text-white disabled:opacity-60"
            >
              {loading ? "Creating..." : "Create Coupon"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
