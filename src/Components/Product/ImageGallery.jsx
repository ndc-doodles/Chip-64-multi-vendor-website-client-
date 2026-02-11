"use client";

import { useState, useMemo } from "react";
import { Heart } from "lucide-react";

export default function ImageGallery({
  images = [],
  productName,
  loved = false,
  onToggleWishlist,
}) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  const mainImage = useMemo(
    () => images[selectedImageIndex],
    [images, selectedImageIndex]
  );

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div
        className="relative bg-muted rounded-lg overflow-hidden aspect-square cursor-zoom-in"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onMouseMove={handleMouseMove}
      >
        {/* ❤️ Luxury Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist?.();
          }}
          className="absolute top-4 right-4 z-10 w-11 h-11 rounded-full 
                     bg-white/80 backdrop-blur flex items-center justify-center
                     shadow-sm hover:scale-105 transition"
          aria-label="Add to wishlist"
        >
          <Heart
            className={`w-5 h-5 transition ${
              loved
                ? "fill-red-500 text-red-500"
                : "text-gray-700"
            }`}
          />
        </button>

        <img
          src={mainImage || "/placeholder.svg"}
          alt={productName}
          className={`absolute inset-0 w-full h-full object-cover transition-transform duration-300 ${
            isHovering ? "scale-150" : "scale-100"
          }`}
          style={
            isHovering
              ? { transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%` }
              : undefined
          }
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImageIndex(index)}
            className={`relative w-20 h-20 rounded-lg overflow-hidden transition-all ${
              selectedImageIndex === index
                ? "ring-2 ring-primary ring-offset-2"
                : "border border-border hover:border-foreground"
            }`}
          >
            <img
              src={image || "/placeholder.svg"}
              alt={`${productName} view ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
