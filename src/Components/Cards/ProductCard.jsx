"use client";

import { useState } from "react";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";
import { ShoppingCart, Eye, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "@/redux/actions/wishlistActions";
import { isProductWishlisted } from "@/Utils/WishlistUtils";
import { toast } from "sonner";
import { addToCart } from "@/API/userAPI";
import { fetchCart } from "@/redux/actions/cartActions";
const COLOR_MAP = {
  black: "#000000",
  brown: "#5C4033",
  beige: "#F5F5DC",
  navy: "#001F3F",
  olive: "#556B2F",
};

export default function ProductCard({ product ,shadow="shadow-2xl",bg="bg-white"}) {
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.items);
  const defaultVariant =
  product.variants?.find((v) => v.stock > 0) ||
  product.variants?.[0] ||
  null;

 const loved = defaultVariant
  ? isProductWishlisted(wishlist, product._id, defaultVariant._id)
  : false;
  const slug = product.slug;
  const variants = product.variants || [];
  const tags = product.tags || [];

  const stock = variants.reduce((s, v) => s + (v.stock || 0), 0);
  const isOutOfStock = stock === 0;

  const { user, accessToken } = useSelector((s) => s.user);

const handleAddToCart = async (e) => {
  e.preventDefault();
  e.stopPropagation();

  try {
    if (!user || !accessToken) {
      toast.error("Please login first");
      return;
    }

    if (!defaultVariant) return;

    const payload = {
      productId: product._id,
      vendorId: product.vendorId,
      name: product.name,
      slug: product.slug,
      image: defaultVariant.images?.[0] || product.mainImage,
      variantId: defaultVariant._id,
      price: defaultVariant.price ?? product.basePrice,
      qty: 1,
      attributes: defaultVariant.attributes,
    };

    await addToCart(payload);

    dispatch(fetchCart());

    toast.success("Added to cart");
  } catch (err) {
    toast.error("Failed to add");
  }
};




  const prices = variants
    .map((v) => v.price ?? product.basePrice)
    .filter(Boolean);

  const priceDisplay =
    prices.length === 0
      ? "—"
      : Math.min(...prices) === Math.max(...prices)
      ? `₹${prices[0]}`
      : `₹${Math.min(...prices)} – ₹${Math.max(...prices)}`;

  const colors = Array.from(
    new Set(
      variants
        .map((v) => v.attributes?.Color)
        .filter(Boolean)
        .map((c) => c.toLowerCase())
        .filter((c) => COLOR_MAP[c])
    )
  ).slice(0, 3);

  return (
    <div
      className={`group relative ${bg} rounded-3xl overflow-hidden ${shadow} transition-all duration-300 hover:shadow-md hover:-translate-y-0.5`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ❤️ Wishlist */}
     <button
  onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleWishlist({ productId: product._id ,variantId:defaultVariant._id}));
  }}
  className="absolute top-2 right-2 z-10"
>
  <Heart
    className={`w-5 h-5 transition-all duration-200 ${
      loved
        ? "fill-red-500 stroke-red-500 scale-110"
        : "fill-transparent stroke-white"
    }`}
  />
</button>


      {/* IMAGE (CLICKABLE) */}
      <Link to={`/product/${slug}`}>
        <div className="relative aspect-square overflow-hidden bg-[#F6F6F6] ">
          <img
            src={product.mainImage}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 z-0"
          />

          {/* BADGES */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {tags.includes("new") && (
              <Badge className="bg-accent text-white text-[10px]">
                New
              </Badge>
            )}
          </div>

          {/* HOVER ACTIONS */}
          {isHovered && !isOutOfStock && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-2">
              <Button size="icon" variant="secondary" className="h-8 w-8 bg-primary">
                <Eye className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </Link>

      {/* INFO */}
      <div className="p-2.5 z-1">
        <Link to={`/product/${slug}`}>
          <h3 className="text-sm font-medium text-foreground line-clamp-2 mb-1 hover:underline">
            {product.name}
          </h3>
        </Link>

        {/* COLORS */}
        <div className="flex gap-1 mb-2 min-h-4">
          {colors.map((c) => (
            <span
              key={c}
              className="w-3 h-3 rounded-full border"
              style={{ backgroundColor: COLOR_MAP[c] }}
            />
          ))}
        </div>

        <p className="text-sm font-semibold text-black mb-2">
          {priceDisplay}
        </p>

        {/* ADD TO CART */}
     <Button
  size="sm"
  className="w-full bg-primary rounded-2xl text-black text-xs h-8  hover:bg-secondary-foreground hover:text-primary"
  disabled={isOutOfStock}
  onClick={handleAddToCart}
>
  {isOutOfStock ? "Out of Stock" : "Add to Cart"}
</Button>

      </div>
    </div>
  );
}
