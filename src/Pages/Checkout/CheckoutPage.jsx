"use client";

import { useEffect, useState } from "react";
import AddressSection from "@/Components/Checkout/AddressSection";
import ItemsSection from "@/Components/Checkout/ItemsSection";
import SummarySection from "@/Components/Checkout/SummarySection";
import PaymentSection from "@/Components/Checkout/PaymentMethod";
import { getCheckoutItemsApi } from "@/API/userAPI";

import {
  placeOrderApi,
  verifyRazorpayApi,
} from "@/API/userAPI";
import {
  getCartApi,
  getAddressesApi,
  createAddressApi,
} from "@/API/userAPI";
import { toast } from "sonner";

export default function CheckoutPage() {
  /* ---------------- ADDRESS ---------------- */
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [appliedCoupon, setAppliedCoupon] = useState(null);


  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
  });

  /* ---------------- PAYMENT ---------------- */
  const [paymentMethod, setPaymentMethod] = useState("COD");

  /* ---------------- CART ---------------- */
  const [items, setItems] = useState([]);

  /* ---------------- LOAD CART ---------------- */
  useEffect(() => {
    fetchCheckoutItems();
    fetchAddresses();
  }, []);

const handlePlaceOrder = async () => {
  if (!selectedAddress) {
    toast.error("Please select a delivery address");
    return;
  }

  try {
    const res = await placeOrderApi({
      addressId: selectedAddress._id,
      paymentMethod,
      couponId: appliedCoupon?.couponId || null,
    });

    // ✅ COD
    if (paymentMethod === "COD") {
      toast.success("Order placed successfully");
      window.location.href = `/order-success/${res.orderId}`;
      return;
    }

    // ✅ RAZORPAY
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      amount: res.razorpayOrder.amount,
      currency: "INR",
      order_id: res.razorpayOrder.id,
      name: "CHIP",
      description: "Order Payment",
      handler: async (response) => {
        await verifyRazorpayApi({
          orderId: res.orderId,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpaySignature: response.razorpay_signature,
        });

        toast.success("Payment successful");
        window.location.href = `/order-success/${res.orderId}`;
      },
      theme: { color: "#111827" },
    };

    new window.Razorpay(options).open();
  } catch (err) {
    toast.error(err?.message || "Order failed");
  }
};

  const fetchCheckoutItems = async () => {
  try {
    const res = await getCheckoutItemsApi();

    setItems(res.items || []);

  } catch {
    toast.error("Failed to load checkout items");
  }
};


  /* ---------------- LOAD ADDRESSES ---------------- */
const fetchAddresses = async () => {
  try {
    const res = await getAddressesApi();


    // ✅ FIX IS HERE
    setAddresses(res.addresses || []);

    // auto-select default address if exists
    const defaultAddr = res.addresses?.find(
      (addr) => addr.isDefault
    );

    if (defaultAddr) {
      setSelectedAddress(defaultAddr);
    }
  } catch (error) {
    console.error("Failed to load addresses", error);
  }
};


  /* ---------------- ADD NEW ADDRESS ---------------- */
  const handleSaveAddress = async () => {
    try {
      const res = await createAddressApi(formData);
      toast.success("Address saved");

      await fetchAddresses();
      setSelectedAddress(res.data);
    } catch {
      toast.error("Failed to save address");
    }
  };

  /* ---------------- CALCULATIONS ---------------- */
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const shipping = subtotal > 100 ? 0 : 12.99;
  const total = subtotal + shipping;
/* ---------------- EMPTY CHECKOUT ---------------- */
if (!items.length) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">

      <div className="text-center max-w-md">

        <h2 className="text-2xl font-bold mb-3">
          No items to checkout
        </h2>

        <p className="text-gray-500 mb-6 text-sm">
          Your cart is empty. Add products before proceeding.
        </p>

        <button
          className="
            bg-primary
            text-black
            px-8 py-3
            rounded-full
            font-semibold
            transition
            hover:scale-105
          "
          onClick={() => window.location.href = "/shop"}
        >
          Continue Shopping
        </button>

      </div>

    </div>
  );
}

  return (
    <div className="min-h-screen bg-background">
<main className="
  mx-auto max-w-7xl
  px-4 sm:px-6 lg:px-8
  py-6 sm:py-10 lg:py-12
  pb-24 lg:pb-12   
">        <div className="grid gap-8 lg:grid-cols-3">

          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 space-y-8">
            <AddressSection
              savedAddresses={addresses}
              selectedAddress={selectedAddress}
              setSelectedAddress={setSelectedAddress}
              formData={formData}
              setFormData={setFormData}
              onSaveAddress={handleSaveAddress}

            />

           <ItemsSection
  items={items.map(item => ({
    id: item.productId,
    name: item.name,
    price: item.price,
    quantity: item.qty,
    image: item.image,
  }))}
/>


            <PaymentSection
              paymentMethod={paymentMethod}
              onPaymentMethodChange={setPaymentMethod}
            />
          </div>

          {/* RIGHT COLUMN */}
    <SummarySection
  subtotal={subtotal}
  shipping={shipping}
  total={total}
  selectedAddress={selectedAddress}
  paymentMethod={paymentMethod}
  appliedCoupon={appliedCoupon}
  setAppliedCoupon={setAppliedCoupon}
  onPlaceOrder={handlePlaceOrder}
/>

{/* ================= MOBILE STICKY CHECKOUT BAR ================= */}
<div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-black/10 px-4 py-3 lg:hidden">

  <div className="flex items-center justify-between gap-4">

    {/* Total */}
    <div>
      <p className="text-[11px] uppercase tracking-widest text-gray-400">
        Total
      </p>
      <p className="text-lg font-black">
        ₹{total.toLocaleString()}
      </p>
    </div>

    {/* CTA */}
    <button
      className="
        flex-1
        bg-primary
        text-black
        py-3
        rounded-full
        font-bold
        text-sm
        transition
        hover:scale-[1.02]
        active:scale-95
      "
      onClick={handlePlaceOrder}

    >
      Place Order
    </button>

  </div>
</div>

        </div>
      </main>
    </div>
  );
}
