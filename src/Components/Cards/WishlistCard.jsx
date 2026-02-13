"use client";

import { Heart, ShoppingCart, Share2 } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Card } from "@/Components/ui/card";
import { addToCart, toggleWishlistApi } from "@/API/userAPI";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { getDisplayAttributes } from "@/Utils/getDisplayAttributes";

export function WishlistCard({ item, onToggled }) {
  const navigate=useNavigate()
  const handleToggle = async () => {
    await toggleWishlistApi({
      productId: item.productId,
      variantId: item.variantId,
    });
    onToggled(); // refresh list
  };

  const handleShare = async () => {
    const url = `${window.location.origin}/product/${item.slug}`;
    if (navigator.share) {
      await navigator.share({ title: item.name, url });
    } else {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied");
    }
  };

  const handleAddToCart = async () => {
    await addToCart({
      productId: item.productId,
      variantId: item.variantId,
      vendorId: item.vendorId,
      name: item.name,
      slug: item.slug,
      image: item.image,
      price: item.price,
      attributes: item.attributes,
      qty: 1,
    });
    toast.success("Added to cart");
  };
const specs = getDisplayAttributes(item.category, item.attributes);

  return (
    <Card className="p-0 overflow-hidden bg-card shadow-xl transition hover:shadow-2xl">
      {/* Image */}
      <div className="relative bg-secondary">
        <img
          src={item.image}
          alt={item.name}
          className="aspect-4/4 w-full object-cover"
          onClick={()=>navigate(`/product/${item.slug}`)}
        />

        {/* Top-right actions */}
        <div className="absolute top-3 right-3 flex gap-2">
          <Button size="icon" variant="secondary"  className="bg-white/80 text-gray-600 hover:bg-gray-100
"  onClick={handleShare}>
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-5 pt-0.5 space-y-1">
        <h3 className=" text-xl font-medium ">{item.name}</h3>
                <h2 className=" text-sm font-medium ">{item.price}</h2>

        {specs.length > 0 && (
  <p className="text-xs text-gray-500">
    {specs.join(" • ")}
  </p>
)}


        <div className="mt-3 flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={handleToggle}
          >
            <Heart className="w-4 h-4 fill-current text-destructive" />
          </Button>

          <Button size="sm"  className="flex-1 bg-secondary text-black cursor-pointer
          " onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </div>
      </div>
    </Card>
  );
}
