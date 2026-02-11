import React from "react";
import { Link } from "react-router-dom";

export default function CategoryCard({ name, image,slug }) {
  return (

            <Link to={`/collection/${slug}`} className="block">

    <div className="flex flex-col items-center gap-2 cursor-pointer group min-w-[90px]">
      {/* Circle Image */}
      <div
        className="
          w-16 h-16 md:w-20 md:h-20
          rounded-xl overflow-hidden
          bg-background
          transition-all duration-300
          group-hover:scale-110
          group-hover:border-foreground/40
        "
      >
        <img
          src={image || "/placeholder.svg"}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Label */}
      <span
        className="
          text-xs md:text-sm
          text-center
          text-foreground
          font-medium
          leading-tight
        "
      >
        {name}
      </span>
    </div>
    </Link>
  );
}
