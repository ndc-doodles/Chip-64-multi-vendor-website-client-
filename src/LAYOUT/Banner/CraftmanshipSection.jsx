"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function CraftsmanshipSection() {
  const ref = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // detect mobile (runs only on client)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // < md breakpoint
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Strong on desktop, softer on mobile
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? ["-60px", "60px"] : ["-200px", "200px"]
  );
  const imageScale = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? [1.1, 1] : [1.3, 1]
  );

  const textY = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? ["40px", "-20px"] : ["120px", "-60px"]
  );

  return (
    <section
      ref={ref}
      className="relative w-full py-20 md:py-32 px-4 md:px-6 bg-background overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Text */}
          <motion.div
            style={{ y: textY }}
            className="space-y-6 will-change-transform"
          >
            <div className="space-y-4">
              <h2 className="font-serif text-4xl md:text-6xl font-light tracking-tight text-foreground">
                Crafted by Hand.
                <br />
                Built for Time.
              </h2>
              <div className="h-0.5 w-12 bg-gradient-to-r from-accent to-transparent" />
            </div>

            <p className="text-lg text-muted-foreground font-light leading-relaxed">
              Each piece is made from ethically sourced full-grain leather by
              master artisans with decades of experience. We believe in slow
              production, meticulous attention to detail, and creating pieces
              that improve with age.
            </p>

            <p className="text-sm text-muted-foreground font-light tracking-wide">
              Our commitment to quality means every stitch, every cut, and every
              finish is considered with purpose.
            </p>
          </motion.div>

          {/* Image + Grain */}
          <motion.div
            style={{ y: imageY, scale: imageScale }}
            className="
              relative overflow-hidden will-change-transform shadow-xl
              rounded-sm
              aspect-[4/5] md:aspect-4/3
            "
          >
            {/* Grain overlay */}
            <div
              className="
                absolute inset-0 pointer-events-none
                opacity-10 md:opacity-[0.08]
                bg-[url('/grain.png')] bg-cover bg-center
                mix-blend-overlay
              "
            />

            <img
              src="/craftManShip.png"
              alt="Leather craftsmanship"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
