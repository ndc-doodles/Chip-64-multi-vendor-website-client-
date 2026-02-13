"use client";

import { useEffect, useState } from "react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import CartItem from "@/Components/Cart/CartItem";
import {
  getCartApi,
  updateCartItemQtyApi,
  removeCartItemApi,
} from "@/API/userAPI";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchCart } from "@/redux/actions/cartActions";
import HeaderLayout from "@/Layout/Header/HeaderLayout";
import CartRecommendations from "@/Components/Cart/RecommendedCartItems";
import { getCartRecommendationsApi } from "@/API/userAPI";
export default function CartPage() {
  const [items, setItems] = useState([]);
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const [recommendations, setRecommendations] = useState([]);

useEffect(() => {
  if (!items.length) return;

  fetchRecommendations();
}, [items]);

const fetchRecommendations = async () => {
  try {
    const productIds = items
      .map((item) => item.productId || item.product?._id)
      .filter(Boolean); // removes undefined safely

    if (!productIds.length) return;

    const data = await getCartRecommendationsApi({
      cartProductIds: productIds,
    });

    setRecommendations(data);
  } catch (err) {
    console.error("Failed to load recommendations", err);
  }
};
  /* ---------------- LOAD CART ---------------- */
  useEffect(() => {
    (async () => {
      try {
        const res = await getCartApi();
        setItems(res.cart?.items || []);
      } catch {
        toast.error("Failed to load cart");
      }
    })();
  }, []);

  /* ---------------- ACTIONS ---------------- */
  const increaseQty = async (item) => {
    const res = await updateCartItemQtyApi(
      item._id,
      item.qty + 1
    );
    setItems(res.cart.items);
  };

  const decreaseQty = async (item) => {
    if (item.qty <= 1) return;
    const res = await updateCartItemQtyApi(
      item._id,
      item.qty - 1
    );
    setItems(res.cart.items);
  };

  const removeItem = async (id) => {
    const res = await removeCartItemApi(id);
    setItems(res.cart.items);
     dispatch(fetchCart())
  };

  /* ---------------- CALCULATIONS ---------------- */
  const subtotal = items.reduce(
    (sum, i) => sum + i.price * i.qty,
    0
  );

  const discountPercent = 0;
  const discount = (subtotal * discountPercent) / 100;
  const deliveryFee = 50;
  const total = subtotal - discount + deliveryFee;
if (!items.length) {
  return (
    <>
      <HeaderLayout />

      <main className="min-h-screen flex items-center justify-center bg-white p-8">
        <div className="text-center max-w-md">

          <h2 className="text-2xl font-semibold mb-3">
            Your cart is empty
          </h2>

          <p className="text-gray-500 mb-6">
            Looks like you haven't added anything yet.
          </p>

          <Button
            className="bg-primary text-black rounded-full px-8 py-3"
            onClick={() => navigate("/shop")}
          >
            Continue Shopping
          </Button>

        </div>
      </main>
    </>
  );
}

  return (
    <>
    <HeaderLayout/>
<main
  className="
    min-h-screen
    p-4 sm:p-6 lg:p-8   /* smaller padding on mobile */
    bg-gradient-to-br
    from-white
    via-primary/5
    to-secondary/10
  "
>
  <div className="max-w-7xl mx-auto">

    {/* Title responsive */}
    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-5 sm:mb-8">
      Shopping Cart
    </h1>

    {/* Grid */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">

      {/* ================= LEFT (Items) ================= */}
      <div className="lg:col-span-2 space-y-3 sm:space-y-4">

        {items.map((item) => (
          <CartItem
            key={item._id}
            item={{ ...item, quantity: item.qty }}
            onIncrease={() => increaseQty(item)}
            onDecrease={() => decreaseQty(item)}
            onRemove={() => removeItem(item._id)}
          />
        ))}

        {/* Continue shopping */}
        <div className="pt-2 sm:pt-4">
          <Button
            className="
              rounded-full
              px-5 sm:px-8
              py-2
              text-sm sm:text-base
              bg-secondary
              text-black
              cursor-pointer
            "
            onClick={() => navigate("/shop")}
          >
            Continue Shopping
          </Button>
        </div>

        <CartRecommendations products={recommendations} />
      </div>

      {/* ================= RIGHT (Summary) ================= */}
      <div
        className="
          bg-card/60 backdrop-blur-xl border border-border
          rounded-2xl sm:rounded-3xl
          p-5 sm:p-6 lg:p-8
          shadow-xl

          /* ❌ sticky only on desktop */
          lg:sticky lg:top-8
          h-fit
        "
      >
        <h2 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6">
          Order Summary
        </h2>

        {/* Price list */}
        <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 text-xs sm:text-sm">

          <div className="flex justify-between">
            <span>Sub Total</span>
            <span>₹{subtotal}</span>
          </div>

          <div className="flex justify-between">
            <span>Discount ({discountPercent}%)</span>
            <span>-₹{discount}</span>
          </div>

          <div className="flex justify-between">
            <span>Delivery fee</span>
            <span>₹{deliveryFee}</span>
          </div>

        </div>

        {/* Total */}
        <div className="border-t pt-3 sm:pt-4 mb-4 sm:mb-6">
          <div className="flex justify-between text-sm sm:text-base">
            <span className="font-semibold">Total</span>
            <span className="font-bold text-base sm:text-lg">
              ₹{total}
            </span>
          </div>
        </div>

        {/* Checkout */}
        <Button
          className="
            w-full
            rounded-full
            py-2.5 sm:py-3
            text-sm sm:text-base
            bg-primary
            text-black
            cursor-pointer
          "
          onClick={() => navigate("/checkout")}
        >
          Checkout Now
        </Button>
      </div>
    </div>
  </div>
</main>

    </>
  );
}
