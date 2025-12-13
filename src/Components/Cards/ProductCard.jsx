"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  // 🟩 product object already prepared by ProductGrid
  const { slug, name, price, image, badge } = product;
  console.log(slug)

  // Badge styling logic
  const badgeColor =
    badge === "New"
      ? "bg-accent text-accent-foreground"
      : badge === "Limited"
      ? "bg-secondary text-secondary-foreground"
      : "bg-primary text-primary-foreground";

  return (
    <div
      className="group cursor-pointer transition-transform duration-300 hover:scale-[1.01]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate(`/product/${slug}`)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden bg-muted mb-5 aspect-square rounded-sm">
        <img
          src={image || "/placeholder.svg"}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Hover Overlay */}
        <div
          className={`absolute inset-0 transition-all duration-300 ${
            isHovered ? "bg-black/10" : "bg-transparent"
          }`}
        />

        {/* Badge */}
        {badge && (
          <span
            className={`absolute top-4 right-4 px-3 py-[5px] text-[11px] font-medium rounded-sm uppercase tracking-wide ${badgeColor}`}
          >
            {badge}
          </span>
        )}

        {/* Quick View Button */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <button
            className="px-7 py-2 bg-foreground text-background text-sm font-medium tracking-wide hover:bg-foreground/90 rounded-sm backdrop-blur-sm shadow-sm transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/product/${slug}`);
            }}
          >
            Quick View
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="text-center space-y-2">
        <h3 className="font-serif text-lg text-foreground font-light tracking-tight">
          {name}
        </h3>

        {/* 🟩 Updated to show correct price sent by ProductGrid */}
        <p className="text-[15px] font-medium tracking-wide text-muted-foreground">
          ₹{Number(price).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
