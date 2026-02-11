import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "@/redux/actions/wishlistActions";
import { isProductWishlisted } from "@/Utils/WishlistUtils";
import { Heart, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { addToCart } from "@/API/userAPI";
import { fetchCart } from "@/redux/actions/cartActions";
import { toast } from "sonner";

export default function ProductCard({
  name,
  vendor,
  price,
  image,
  slug,
  id,
  raw,
  onRequireAuth
}) {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.items);
  const { user, accessToken } = useSelector((state) => state.user)
  const defaultVariant =
    raw?.variants?.find((v) => v.stock > 0) ||
    raw?.variants?.[0] ||
    null;
  
 

  const loved = defaultVariant
    ? isProductWishlisted(wishlist, id, defaultVariant._id)
    : false;
  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      if (!user || !accessToken) {
        onRequireAuth();
        return;
      }


      if (!defaultVariant) return;

    


      const payload = {
        productId: id,
        vendorId: raw?.vendorId,
        name,
        slug,
        image: defaultVariant.images?.[0] || image,
        variantId: defaultVariant._id,
        price: defaultVariant.price ?? price,
        qty: 1,
        attributes: defaultVariant.attributes,
      };

      await addToCart(payload);

      dispatch(fetchCart());

      toast.success("Added to cart");
    } catch (err) {
      toast.error("Failed to add to cart");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="group relative w-full max-w-[170px] md:max-w-none"
    >
      {/* Glow layer */}
      <div className="absolute inset-0 rounded-2xl md:rounded-3xl bg-primary/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative rounded-2xl md:rounded-3xl overflow-hidden bg-card border border-border backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all">


        {/* ❤️ Wishlist */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();

            if (!user || !accessToken) {
              onRequireAuth();
              return;
            }

            dispatch(
              toggleWishlist({
                productId: id,
                variantId: defaultVariant?._id,
              })
            );
          }}


          className="absolute top-2 right-2 md:top-4 md:right-4 z-20 rounded-full bg-white/80 dark:bg-black/40 backdrop-blur-md p-1.5 md:p-2.5 shadow-md"
        >

          <motion.div whileTap={{ scale: 0.85 }}>
            <Heart
              size={14}            /* mobile */
              className={loved ? "fill-red-500 text-red-500" : "text-foreground/70 md:size-[18px]"}
            />
          </motion.div>
        </button>

        <Link to={`/product/${slug}`} className="block">

          {/* Image */}
          <div className="relative aspect-square md:aspect-[4/4] overflow-hidden bg-gradient-to-br from-primary/5 via-transparent to-primary/10">
            <motion.img
              src={image || "/placeholder.svg"}
              alt={name}
              className="h-full w-full object-cover"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            />
          </div>

          {/* Content */}
          <div className="p-3 md:p-6 space-y-2 md:space-y-4">

            <div>
              <p className="text-[9px] md:text-[11px] uppercase tracking-[0.15em] md:tracking-[0.2em] text-muted-foreground font-semibold">
                {vendor}
              </p>

              <h3 className="text-sm md:text-lg font-semibold text-foreground line-clamp-1">
                {name}
              </h3>
            </div>

            {/* Price */}
            <div className="flex items-center justify-between">
              <span className="text-lg md:text-2xl font-bold text-foreground">
                ₹{price}
              </span>

              <span className="h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-primary animate-pulse" />
            </div>

            {/* CTA */}
            <motion.div whileTap={{ scale: 0.95 }}>
              <Button
                onClick={handleAddToCart}
                className="
                w-full
                rounded-xl md:rounded-2xl
                text-xs md:text-base
                py-2 md:py-3
                bg-primary text-black
                hover:bg-secondary-foreground hover:text-primary
                transition-all
                flex items-center justify-center gap-2
                shadow-[0_20px_40px_rgba(230,248,94,0.35)]
                hover:shadow-[0_25px_60px_rgba(230,248,94,0.45)]
              "
              >
                <ShoppingBag size={14} className="md:size-[18px]" />
                Add to Cart
              </Button>
            </motion.div>

          </div>
        </Link>
      </div>
    </motion.div>
  );

}
