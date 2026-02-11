"use client";

import { useState, useEffect } from "react";
import ShopCreativeBanner from "./ShopCreativeBanner";

export default function HomeBanner() {
  const slides = [
  // 💻 Laptops
 {
  images: [{ src: "/laptop6.png", role: "single" }],
blobColor: "#702963",

haloColor: "",

  heading: (
  <>
  Powerful <br />
<span
  className=" text-[#702] font-bold tracking-[-0.01em]"
  style={{ fontStretch: "120%" }}
>
  Laptops
</span>

</>
  ),
  sideText:
    "High-performance laptops for work, gaming, and creative professionals.",
  ctaPrimary: "Shop Laptops",
  ctaSecondary: "View Models",
  label: "Portable Computing",
},


  // 📱 Tech (UNCHANGED)
  {
    images: [
      { src: "/iphone2.png", role: "front" },
      { src: "/iphone3.png", role: "back" },
    ],
    blobColor: "#F04A00",
    haloColor: "#",
    heading: (
      <>
        Power <br />
        <span className="text-[#F04A00]  font-bold tracking-[-0.01em]">Redefined</span>
      </>
    ),
    sideText: "Precision-engineered smartphones built for performance.",
    ctaPrimary: "Explore Devices",
    ctaSecondary: "Learn More",
    label: "Precision Hardware",
  },

  // 🖥️ Desktop PCs
  {
    images: [{ src: "/mac2.png", role: "single" }],
   blobColor: "#dec09a",   // soft silver / light gray
haloColor: "",   // subtle cool gray

    heading: (
      <>
        Desktop <br />
        <span className="text-[#727472] font-bold tracking-[-0.01em]">PCs</span>
      </>
    ),
    sideText:
      "Prebuilt and custom desktop PCs designed for power and reliability.",
    ctaPrimary: "Shop Desktops",
    ctaSecondary: "Build Your PC",
    label: "Desktop Systems",
  },

  // 🪑 Chairs & Accessories
  {
    images: [{ src: "/chair22.png", role: "single" }],
    blobColor: "#feb800",
    haloColor: "#FFDB58",
    heading: (
      <>
        Ergonomic <br />
        <span className="text-yellow-500 font-bold tracking-[-0.01em]">Chairs</span>
      </>
    ),
    sideText:
      "Ergonomic chairs and accessories built for long work and gaming sessions.",
    ctaPrimary: "Shop Chairs",
    ctaSecondary: "View Accessories",
    label: "Office Comfort",
  },
];


  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setCurrent((p) => (p + 1) % slides.length),
      4000
    );
    return () => clearInterval(timer);
  }, [slides.length]);

  return <ShopCreativeBanner {...slides[current]} />;
}
