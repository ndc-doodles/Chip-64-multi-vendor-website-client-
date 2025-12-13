"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { toast } from "sonner";
import ImageGallery from "@/Components/Product/ImageGallery";
import ProductInfo from "@/Components/Product/ProductInfo";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { addToCart } from "@/API/userAPI";
export default function ProductDetail({ product }) {
   
  const navigate=useNavigate()
  const p = product ?? {
    name: "Product",
    basePrice: 0,
    description: "",
    mainImage: "/placeholder.svg",
    images: ["/placeholder.svg"],
    variants: [],
    reviews: 0,
  };

  // selectedVariant should be the full variant object when possible
  const [selectedVariant, setSelectedVariant] = useState(
    p.variants?.[0] ?? { color: "Default", images: p.images ?? [p.mainImage] }
  );

  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  // mainIndex so thumbnails can set the active shown image if you want in future
  const [mainIndex, setMainIndex] = useState(0);

  // Reset controlled state when product changes (navigating to another product)
  useEffect(() => {
    setSelectedVariant(p.variants?.[0] ?? { color: "Default", images: p.images ?? [p.mainImage] });
    setMainIndex(0);
    setSelectedSize(null);
    setQuantity(1);
  }, [p]);

  // Helper to read stock value from a variant object (supports common shapes)
  const extractStockFromVariant = (v, size) => {
    if (!v) return 0;

    // case: variant.stock is number
    if (typeof v.stock === "number") return Number(v.stock);

    // case: variant.stock is object keyed by size => { S: 5, M: 2 }
    if (v.stock && typeof v.stock === "object" && size) {
      return Number(v.stock[size] ?? 0);
    }

    // case: variant has property `quantity` or `qty`
    if (typeof v.quantity === "number") return Number(v.quantity);
    if (typeof v.qty === "number") return Number(v.qty);

    // case: variant itself represents a single size via v.size and uses v.stock as number
    if (v.size && typeof v.stock === "number" && (!size || v.size === size)) return Number(v.stock);

    // some variants use `available` or `count`
    if (typeof v.available === "number") return Number(v.available);
    if (typeof v.count === "number") return Number(v.count);

    return 0;
  };

  // Robust availableStock calculation:
  // - prefer selectedVariant stock (for the selected size if applicable)
  // - fallback to searching p.variants by _id or color
  // - fallback to summing across variants for a selected size
  // - final fallback: product-level stock or 0
  const availableStock = useMemo(() => {
    // 1) If selectedVariant is a full object, try it first
    if (selectedVariant) {
      const s = extractStockFromVariant(selectedVariant, selectedSize);
      if (s > 0) return s;
    }

    // 2) If product variants exist, try to find matching entries
    if (Array.isArray(p.variants) && p.variants.length) {
      // 2a) match by _id (most reliable)
      if (selectedVariant && selectedVariant._id) {
        const found = p.variants.find((v) => String(v._id) === String(selectedVariant._id));
        const s = extractStockFromVariant(found, selectedSize);
        if (s > 0) return s;
      }

      // 2b) match by color (case-insensitive) and optional size match
      if (selectedVariant && selectedVariant.color) {
        const found = p.variants.find((v) =>
          v.color &&
          String(v.color).toLowerCase() === String(selectedVariant.color).toLowerCase() &&
          (!selectedSize || v.size === selectedSize || (Array.isArray(v.sizes) && v.sizes.includes(selectedSize)))
        );
        const s = extractStockFromVariant(found, selectedSize);
        if (s > 0) return s;
      }

      // 2c) if user selected only a size (no variant), sum stock across variants for that size
      if (selectedSize) {
        const sum = p.variants.reduce((acc, v) => {
          const val = extractStockFromVariant(v, selectedSize);
          return acc + (Number.isFinite(val) ? val : 0);
        }, 0);
        if (sum > 0) return sum;
      }

      // 2d) last try: sum any numeric stock available across variants (useful for single-stock-per-variant)
      const total = p.variants.reduce((acc, v) => {
        const val = extractStockFromVariant(v, null);
        return acc + (Number.isFinite(val) ? val : 0);
      }, 0);
      if (total > 0) return total;
    }

    // 3) fallback to product-level stock if present
    if (typeof p.stock === "number") return Number(p.stock);

    return 0;
  }, [p.variants, selectedVariant, selectedSize, p]);
const handleShare = () => {
  if (navigator.share) {
    navigator.share({
      title: product?.name,
      text: `Check out this ${product?.name}`,
      url: window.location.href,
    }).catch(() => {});
  } else {
    navigator.clipboard?.writeText(window.location.href);
    toast.success("Link copied to clipboard");
  }
};

const handleAddToCart = async () => {
  // require size if product has sizes (you already check earlier)
  if (!selectedSize && (() => {
    // if product has multiple sizes available or variant has size field, require it
    const sizes = (product?.variants || []).map(v => v.size).filter(Boolean);
    return sizes.length > 0;
  })()) {
    toast.error("Please select a size");
    return;
  }

  if (availableStock <= 0) {
    toast.error("This item is out of stock");
    return;
  }
  const selectedColor = selectedVariant?.color ?? null;
  const selectedImage =
    (selectedVariant?.images && selectedVariant.images[0]) ||
    (selectedVariant?.image && selectedVariant.image[0]) ||
    product.mainImage;

  const payload = {
    productId: product._id || product.id,
    variantId: selectedVariant?._id || null,
    qty: Number(quantity || 1),
    price: selectedVariant?.price != null ? Number(selectedVariant.price) : Number(product.basePrice || 0),
    name: product.name,
    slug: product.slug,
    image: selectedImage,
    size: selectedSize || selectedVariant?.size || null,   // snapshot
    color: selectedColor || null,                         // snapshot
    options: [
      ...(selectedColor ? [{ name: "Color", value: selectedColor }] : []),
      ...(selectedSize ? [{ name: "Size", value: selectedSize }] : []),
    ],
  };



  try {
    setQuantity(1); // optimistic reset
    const res = await addToCart(payload);
    // res.cart contains cart (based on our backend)
    toast.success("Added to cart");
    // optional: redirect to cart page
    navigate("/cart")
  } catch (err) {
    console.error("add to cart failed", err);
    const message = err?.response?.data?.message || err.message || "Failed to add to cart";
    toast.error(message);
  }
};

  const handleOpenLightbox = (idx) => {
    setLightboxIndex(idx);
    setIsLightboxOpen(true);
  };

  const handlePrev = () => setLightboxIndex((s) => (s === 0 ? currentImages.length - 1 : s - 1));
  const handleNext = () => setLightboxIndex((s) => (s === currentImages.length - 1 ? 0 : s + 1));

  /**
   * Robust variant change handler:
   * Accepts:
   * - full variant object (preferred)
   * - an object with {_id} or {color}
   * - a color string
   *
   * Finds the matching variant in p.variants and sets it as selectedVariant.
   */
  const handleVariantChange = (v) => {
    if (!p.variants || p.variants.length === 0) {
      setSelectedVariant(v || { color: "Default", images: p.images ?? [p.mainImage] });
      setSelectedSize(null);
      setMainIndex(0);
      return;
    }

    // if v looks like a full variant (has _id or color) and matches a variant in p.variants
    if (v && (v._id || v.color)) {
      const found = p.variants.find((x) => String(x._id) === String(v._id) || (x.color && String(x.color).toLowerCase() === String(v.color).toLowerCase()));
      if (found) {
        setSelectedVariant(found);
        setSelectedSize(null);
        setMainIndex(0);
        return;
      }
    }

    // if v is a string, try match by color
    if (typeof v === "string") {
      const found = p.variants.find((x) => x.color && x.color.toLowerCase() === v.toLowerCase());
      if (found) {
        setSelectedVariant(found);
        setSelectedSize(null);
        setMainIndex(0);
        return;
      }
    }

    // fallback: set whatever passed or default
    setSelectedVariant(v || p.variants[0]);
    setSelectedSize(null);
    setMainIndex(0);
  };

  // Compute images robustly: supports both variant.images and variant.image (singular)
  const currentImages = useMemo(() => {
    const variantImgs =
      selectedVariant?.images && selectedVariant.images.length
        ? selectedVariant.images
        : selectedVariant?.image && selectedVariant.image.length
        ? selectedVariant.image
        : null;

    if (variantImgs && variantImgs.length) return variantImgs;
    if (p.images && p.images.length) return p.images;
    return [p.mainImage].filter(Boolean);
  }, [selectedVariant, p]);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 text-sm text-muted-foreground">
          <span>Home</span> / <span>Products</span> / <span className="text-foreground">{p.name}</span>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <ImageGallery images={currentImages} onThumbnailClick={handleOpenLightbox} variant={selectedVariant} className="" />

          <ProductInfo
            product={p}
            selectedVariant={selectedVariant}
            selectedSize={selectedSize}
            quantity={quantity}
            availableStock={availableStock} // <- pass computed stock here
            isFavorite={isFavorite}
            onVariantChange={(v) => handleVariantChange(v)}
            onSizeChange={setSelectedSize}
            onQuantityChange={setQuantity}
            onAddToCart={handleAddToCart}
            onToggleFavorite={() => setIsFavorite((s) => !s)}
            onShare={handleShare}
          />
        </div>
      </div>

      <AnimatePresence>
        {isLightboxOpen && (
          <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
            <DialogContent className="max-w-4xl border-0 bg-black/95 p-0">
              <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} className="relative aspect-[4/3] overflow-hidden rounded">
                <img src={currentImages[lightboxIndex]} alt={`${p.name} ${lightboxIndex + 1}`} className="h-full w-full object-contain" />
                <button onClick={() => setIsLightboxOpen(false)} className="absolute right-4 top-4 rounded-full bg-white/10 p-2 hover:bg-white/20"><X className="h-5 w-5 text-white" /></button>
                <button onClick={handlePrev} className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 hover:bg-white/20"><ChevronLeft className="h-5 w-5 text-white" /></button>
                <button onClick={handleNext} className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 hover:bg-white/20"><ChevronRight className="h-5 w-5 text-white" /></button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-white/70">{lightboxIndex + 1} / {currentImages.length}</div>
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>

      <div className="lg:hidden fixed left-0 right-0 bottom-0 z-50 border-t border-border bg-card/95 backdrop-blur-sm p-3">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-3">
          <div className="flex-1">
            <div className="text-sm font-medium">{p.name}</div>
            <div className="text-xs text-muted-foreground">From ₹{p.basePrice}</div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center border border-border rounded-md overflow-hidden">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="px-3 py-2">−</button>
              <div className="px-4 py-2">{quantity}</div>
              <button onClick={() => setQuantity((q) => q + 1)} className="px-3 py-2">+</button>
            </div>

            <button onClick={handleAddToCart} className="px-4 py-2 rounded-md bg-accent text-accent-foreground font-semibold">Add</button>
          </div>
        </div>
      </div>
    </div>
  );
}
