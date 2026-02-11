"use client"

import HeaderLayout from "@/Layout/Header/HeaderLayout"
import { WishlistCard } from "@/Components/Cards/WishlistCard"
import { useEffect, useState } from "react"
import { getWishlistApi } from "@/API/userAPI"
import { toast } from "sonner"
import { useDispatch } from "react-redux"
import { fetchWishlist } from "@/redux/actions/wishlistActions"
import { ShoppingCart, Heart } from "lucide-react"

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState([])
  const dispatch = useDispatch()

  const refreshWishlist = async () => {
    try {
      const res = await getWishlistApi()
      setWishlistItems(res.wishlist.items)
      dispatch(fetchWishlist())
    } catch {
      toast.error("Failed to load wishlist")
    }
  }

  useEffect(() => {
    refreshWishlist()
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <HeaderLayout />

      <section className="mx-auto max-w-7xl px-6 py-14">

        {/* ================= TOP HEADER ================= */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">

          {/* LEFT */}
          <div className="space-y-3">
            <h1 className="text-4xl font-semibold tracking-tight">
              My <span className="text-primary">Wishlist</span>
            </h1>

            {/* 🔥 Compact summary badge (NEW) */}
            <div className="flex items-center gap-4">

              <div className="
                flex items-center gap-2
                px-4 py-2
                bg-primary/10
                text-primary
                rounded-xl
                text-sm
                font-medium
              ">
                <Heart size={16} />
                {wishlistItems.length} items saved
              </div>

              <p className="text-gray-500 text-sm">
                Saved products you love
              </p>
            </div>
          </div>

          {/* RIGHT */}
          {wishlistItems.length > 0 && (
            <button
              className="
                flex items-center gap-2
                bg-primary text-black
                px-7 py-3
                rounded-2xl
                font-semibold
                shadow-md shadow-primary/20
                hover:scale-105
                transition
              "
            >
              <ShoppingCart size={18} />
              Add All To Cart
            </button>
          )}
        </div>

        {/* ================= GRID ================= */}
        {wishlistItems.length === 0 ? (
          <div className="text-center py-28 text-gray-400 text-sm">
            Your wishlist is empty
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {wishlistItems.map((item) => (
              <WishlistCard
                key={item._id}
                item={item}
                onToggled={refreshWishlist}
              />
            ))}
          </div>
        )}

      </section>
    </main>
  )
}
