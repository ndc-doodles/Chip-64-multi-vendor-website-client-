import React from "react";
import { Link } from "react-router-dom";

export default function CategoryCard({ name, image }) {
  const categoryQuery = encodeURIComponent(name);

  return (
    <Link
      to={`/shop?category=${categoryQuery}`}
      className="group relative overflow-hidden rounded-sm aspect-square cursor-pointer animate-fade-in block"
    >
      <img
        src={image || "/placeholder.svg"}
        alt={name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        onError={(e) => {
          e.currentTarget.src = "/placeholder.svg";
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>

      {/* Text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h3 className="font-serif text-3xl font-light text-white text-center drop-shadow-lg">
          {name}
        </h3>
      </div>
    </Link>
  );
}
