"use client";

export default function ShopBanner() {
  return (
    <section className="relative w-full h-[280px] md:h-[380px] lg:h-[440px] overflow-hidden bg-neutral-200">
      
      {/* Background image */}
      <img
        src="/shop23.png" 
        alt="Shop banner"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/10" />

      {/* Huge SHOP text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h1
          className="
            text-white 
            font-extrabold 
            tracking-tight
            text-[110px]
            sm:text-[160px]
            md:text-[220px]
            lg:text-[280px]
            leading-none
            select-none
            opacity-90
          "
        >
        </h1>
      </div>
    </section>
  );
}
