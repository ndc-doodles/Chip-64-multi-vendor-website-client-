import React from "react";
import { Button } from "@/Components/ui/button";

export default function PromoCard({ title, subtitle, cta, image }) {
  return (
    <div className="relative flex-none w-[90%] md:w-[600px] lg:w-[800px] h-[300px] md:h-[400px] rounded-[45px] overflow-hidden snap-start">
      <img
        src={image || "/placeholder.svg"}
        alt={title}
        className="w-full h-full object-cover"
      />

      {/* Overlay */}

      {/* Content */}
      
    </div>
  );
}
