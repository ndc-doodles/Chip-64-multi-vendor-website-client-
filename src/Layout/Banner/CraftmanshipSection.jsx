import React, { useRef } from "react";
import PromoCard from "@/Components/Cards/PromoCard";

const promos = [
  {
    id: 1,
    title: "Summer Sale",
    subtitle: "Up to 40% off selected items",
    cta: "Shop Now",
    image: "/banner1.png",
  },
  {
    id: 2,
    title: "New Arrivals",
    subtitle: "Fresh styles from top vendors",
    cta: "Discover",
    image: "/banner2.png",
  },
  {
    id: 3,
    title: "Exclusive Collection",
    subtitle: "Limited edition pieces",
    cta: "View Collection",
    image: "/banner3.png",
  },
  {
    id: 4,
    title: "Home Essentials",
    subtitle: "Curated for modern living",
    cta: "Explore",
    image: "/banner4.png",
  },
];

export default function PromoSliders() {
  const scrollRef = useRef(null);

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16">
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
      >
        {promos.map((promo) => (
          <PromoCard
            key={promo.id}
            title={promo.title}
            subtitle={promo.subtitle}
            cta={promo.cta}
            image={promo.image}
          />
        ))}
      </div>
    </section>
  );
}
