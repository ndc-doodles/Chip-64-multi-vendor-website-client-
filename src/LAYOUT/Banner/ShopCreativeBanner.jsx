"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function ShopCreativeBanner({
  images,
  blobColor,
  haloColor,
  heading,
  subText,
  ctaPrimary = "Explore",
  ctaSecondary = "Learn More",
  sideText,
  label,
}) {
  return (
<section className="
bg-background

  relative w-full
  min-h-[60vh]
  md:min-h-[70vh]
  lg:min-h-[75vh]
  overflow-hidden
">
      {/* Texture */}
      <div className="absolute inset-0 opacity-[0.04]
        bg-[radial-gradient(circle_at_1px_1px,#000_1px,transparent_1px)]
        bg-[size:28px_28px]" />

<div className="
  relative max-w-7xl mx-auto px-6 md:px-12
  min-h-[60vh]
  md:min-h-[70vh]
  lg:min-h-[75vh]
  flex items-center justify-center
">

        {/* BLOBS */}
        {/* SUN DISC + HALO */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">

          {/* Solid sun disc */}
          <div
            className="absolute
      w-[360px] h-[360px]
      sm:w-[420px] sm:h-[420px]
      md:w-[480px] md:h-[480px]
      rounded-full
      opacity-90
      z-0
    "
            style={{ background: blobColor }}
          />

          {/* Soft halo glow */}
          <div
            className="absolute
      w-[460px] h-[460px]
      sm:w-[560px] sm:h-[560px]
      md:w-[640px] md:h-[640px]
      rounded-full
      blur-[90px]
      opacity-60
    "
            style={{ background: haloColor }}
          />

        </div>


        {/* IMAGES */}
        <div className="relative z-20 flex items-center justify-center">
  {images.map((img, i) => {
    switch (img.role) {

      case "single":
        return (
          <motion.img
            key={`single-${img.src}`}
            src={img.src}
            className="w-[500px] object-contain cursor-pointer drop-shadow-[0_55px_90px_rgba(0,0,0,0.45)]"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: [0, -10, 0], opacity: 1 }}
            transition={{
              opacity: { duration: 0.8 },
              y: { duration: 4, ease: "easeInOut", repeat: Infinity },
            }}
            whileHover={{
              y: -36,
              scale: 1.05,
              filter: "drop-shadow(0px 110px 160px rgba(0,0,0,0.6))",
            }}
          />
        );

      case "single-car":
        return (
          <motion.img
            key={`car-${img.src}`}
            src={img.src}
            className="w-[500px] object-contain drop-shadow-[0_65px_110px_rgba(0,0,0,0.45)]"
            initial={{ x: 320, opacity: 0, scale: 0.96 }}
            animate={{ x: -40, opacity: 1, scale: 1 }}
            transition={{
              duration: 1.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        );

      case "front":
        return (
          <motion.img
            key={`front-${img.src}`}
            src={img.src}
            className="
  h-[520px]
  md:h-[540px]
  w-auto
  rotate-[12deg]
  z-20
"
            animate={{
              x: [-20, 70, 70],
              y: [-6, 6, -15],
            }}
            transition={{
              duration: 6,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />
        );

      case "back":
        return (
          <motion.img
            key={`back-${img.src}`}
            src={img.src}
            className="absolute w-[600px] rotate-[14deg] opacity-80"
            animate={{
              x: [40, -26, -26],
              y: [6, -10, 10],
            }}
            transition={{
              duration: 6,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />
        );

      default:
        return null;
    }
  })}
</div>


        {/* TOP LEFT TEXT (same as ShopCreativeBanner1) */}
        <div className="absolute top-16 md:top-24 left-5 md:left-5 max-w-md">
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-light text-neutral-900 leading-[1.05]">
            {heading}
          </h2>
        </div>

        {/* RIGHT TEXT */}
        {sideText && (
          <div className="hidden md:block absolute right-12 top-1/2 -translate-y-1/2 max-w-sm text-right">
            <p className="text-lg text-neutral-600 leading-relaxed ml-10">
              {sideText}
            </p>
          </div>
        )}

        {/* CTA */}
        <div className="absolute bottom-16 md:bottom-24 left-6 md:left-12 flex gap-4 ">
          <Button size="lg" className="rounded-full px-10 bg-secondary text-white">
            {ctaPrimary}
          </Button>
          <Button size="lg" variant="outline" className="rounded-full px-10 ">
            {ctaSecondary}
          </Button>
        </div>

        {/* DECORATIVE LABEL */}
        {label && (
          <div className="hidden md:block absolute bottom-24 right-12
            text-xs tracking-[0.35em] uppercase text-neutral-400 rotate-90 origin-bottom-right">
            {label}
          </div>
        )}

      </div>
    </section>
  );
}
