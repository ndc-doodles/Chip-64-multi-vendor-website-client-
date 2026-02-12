"use client";

import { Button } from "@/Components/ui/button";

export default function ShopCreativeBanner1() {
  return (
    <section className="relative w-full min-h-[90vh] bg-[#f5f3ef] overflow-hidden">

      {/* Subtle paper texture */}
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle_at_1px_1px,#000_1px,transparent_1px)] bg-[size:28px_28px]" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 min-h-[90vh] flex items-center justify-center">

        {/* CENTER PRODUCT */}
        <div className="relative z-20 flex items-center justify-center">

          {/* Cream sun */}
          <div
            className="
              absolute
              top-[-110px]
              w-[280px] h-[280px]
              sm:w-[340px] sm:h-[340px]
              md:w-[420px] md:h-[420px]
              rounded-full
              bg-[#e2d1b3]
              opacity-100
              shadow-[0_0_110px_rgba(226,209,179,0.65)]
            "
          />

          {/* Soft halo */}
          <div
            className="
              absolute
              top-[-110px]
              w-[330px] h-[330px]
              sm:w-[400px] sm:h-[400px]
              md:w-[520px] md:h-[520px]
              rounded-full
              bg-[#efe2cc]
              opacity-35
              blur-[80px]
            "
          />

          {/* Bag image */}
          <img
            src="/leather-bag.png"
            alt="Premium Leather Bag"
            className="
              relative z-10
              w-[300px]
              sm:w-[360px]
              md:w-[500px]
              object-contain
              drop-shadow-[0_55px_90px_rgba(0,0,0,0.45)]
            "
          />
        </div>

        {/* TOP LEFT TEXT */}
        <div className="absolute top-16 md:top-24 left-6 md:left-12 max-w-md">
          <h2 className="text-3xl sm:text-5xl md:text-5xl font-semibold text-neutral-900 leading-[1.05]">
            Crafted Leather <br />    <span className="ml-25 text-amber-900"> Goods  </span>
          </h2>
        </div>

        {/* RIGHT TEXT */}
        <div className="hidden md:block absolute right-12 top-1/2 -translate-y-1/2 max-w-sm text-right">
          <p className="text-lg text-neutral-600 leading-relaxed">
            Handcrafted leather bags designed for everyday elegance.
            Premium materials. Timeless design.
          </p>
        </div>

        {/* CTA */}
        <div className="absolute bottom-16 md:bottom-24 left-6 md:left-12 flex flex-wrap gap-4">
          <Button
            size="lg"
            className="bg-neutral-900 text-white hover:bg-neutral-800 rounded-full px-10"
          >
            Shop Now
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="border-neutral-400 text-neutral-800 rounded-full px-10"
          >
            View Collection
          </Button>
        </div>

        {/* Decorative label */}
        <div className="hidden md:block absolute bottom-24 right-12 text-xs tracking-[0.35em] uppercase text-neutral-400 rotate-90 origin-bottom-right">
          Handcrafted Leather
        </div>

      </div>
    </section>
  );
}
