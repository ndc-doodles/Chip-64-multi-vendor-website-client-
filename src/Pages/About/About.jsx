import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeaderLayout from "@/Layout/Header/HeaderLayout";
import SplitType from "split-type";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const container = useRef(null);
  const navigate= useNavigate()

  useEffect(() => {
    const ctx = gsap.context((self) => {
      gsap.defaults({
        ease: "power3.out",
        duration: 1,
      });
      const aboutTL = gsap.timeline({
  scrollTrigger: {
    trigger: ".about-section",
    start: "top 50%",
  }
});

aboutTL
  .from(".about-left", {
    x: -120,
    opacity: 0,
    duration: 1.2,
  })
  .from(".about-right", {
    x: 120,
    opacity: 0,
    duration: 1.2,
  }, "-=0.9");

      /* ================= HERO INTRO ================= */
      const heroTL = gsap.timeline();
       const split = new SplitType(".split-text", { types: "chars" });

    gsap.from(split.chars, {
      y: 120,
      opacity: 0,
      stagger: 0.03,
      duration: 1.2,
      ease: "expo.out",
    });


     gsap.from(".reveal-text", {
  y: 160,
  opacity: 0,
  stagger: 0.05,
  duration: 1.2,
  ease: "expo.out",
  force3D: true,
});

gsap.utils.toArray(".stat-number").forEach((el) => {
  const end = +el.dataset.value;

  const obj = { val: 0 };

  gsap.to(obj, {
    val: end,
    duration: 2.5,
    ease: "power3.out",
    scrollTrigger: {
      trigger: el,
      start: "top 85%",
    },
    onUpdate: () => {
      const val = Math.floor(obj.val);

      if (val >= 1000000) el.textContent = Math.floor(val / 1000000) + "M+";
      else if (val >= 1000) el.textContent = Math.floor(val / 1000) + "K+";
      else el.textContent = val + "+";
    },
  });
});




      /* ================= HERO BG SCROLL ANIMATION ================= */
      // This creates the "drifting" grid effect in the background
      gsap.to(".hero-grid", {
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        y: -100,
        opacity: 0.2,
      });

      gsap.to(".hero-img-wrapper", {
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
        scale: 1.25,
        y: 150,
        opacity: 0,
        force3D: true,
      });

      /* ================= CYBEXEL REVEAL ================= */
   

      /* ================= STATS ================= */
      const stats = gsap.utils.toArray(".stat-card");
      stats.forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 60%",
            toggleActions: "play none none none",
          },
          y: 40,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.1,
          force3D: true,
        });
      });

      /* ================= FEATURES ================= */
gsap.utils.toArray(".feature-item").forEach((item, i) => {
  gsap.from(item, {
    y: 60,
    opacity: 0,
    duration: 0.8,
    delay: i * 0.08,
    ease: "power3.out",
    scrollTrigger: {
      trigger: item,     // ⭐ important
      start: "top 85%",
    },
  });
});
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <>
    <HeaderLayout/>
  <div ref={container} className="bg-white text-black selection:bg-[#8bf606]">
 <section className=" hero-section relative min-h-screen flex items-center justify-center px-6 overflow-hidden border-b border-black/5">
  <div className="hero-grid absolute inset-0 pointer-events-none z-0">
    <div
      className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage:
          "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }}
    />
  </div>
  <div className="hero-img-wrapper absolute inset-0 -z-10 opacity-15 about-right">
    <img
      src="/lapAbout.png"
      alt="Ecommerce hardware store"
      className="w-full h-full object-cover scale-110"
    />
  </div>

  <div className="relative z-10 max-w-4xl text-center space-y-10 ">
    <p className="reveal-text text-xs uppercase tracking-[0.5em] text-gray-400 font-semibold">
      India’s Trusted Hardware Marketplace
    </p>

    <h1 className="leading-[0.85] font-black tracking-tight">
      <span className=" split-text block text-[14vw] md:text-[8vw] text-[#8bf606]">
        CHIP
      </span>
      <span className="split-text block text-[14vw] md:text-[8vw] text-[#8bf606]">
        64
      </span>
    </h1>

    <p className="reveal-text text-base md:text-xl text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed">
      Buy laptops, CPUs, components and surveillance systems from
      verified vendors. Secure checkout. Fast delivery. Zero risk.
    </p>
    <div className="reveal-text flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
     <button
  className="
  bg-[#8bf606]
  text-black
  px-8 py-4
  rounded-full
  font-bold
  shadow-xl
  transition-all duration-200

  hover:scale-105
  active:scale-95

  hover:brightness-95
  active:brightness-90
"
onClick={()=>navigate("/shop")}
>
  Shop Now
</button>

    <button
  className="
  border border-black/20
  px-8 py-4
  rounded-full
  font-semibold
  transition-all duration-200

  hover:bg-black hover:text-white
  active:bg-black active:text-white
"
onClick={()=>navigate("/")}
>
  Browse Categories
</button>
    </div>
    <div className="reveal-text flex flex-wrap justify-center gap-6 pt-6 text-sm text-gray-500 font-medium">
      <span>✔ 100% Genuine Products</span>
      <span>✔ Verified Sellers</span>
      <span>✔ Fast Delivery</span>
      <span>✔ Secure Payments</span>
   </div>
</div>
</section>
<section className="relative py-32 px-6 about-section bg-black text-white overflow-hidden">
  <div
    className="absolute inset-0 opacity-5 pointer-events-none"
    style={{
      backgroundImage: "radial-gradient(#8bf606 1px, transparent 1px)",
      backgroundSize: "40px 40px",
    }}
  />

  <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
    <div className="space-y-8 about-left">

      <p className="text-[#8bf606] uppercase tracking-[0.4em] text-xs font-bold">
        About CHIP-64
      </p>

      <h2 className="text-5xl md:text-7xl font-black leading-tight">
        India’s Trusted <br />
        <span className="text-gray-500">Hardware Marketplace</span>
      </h2>

      <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
        CHIP-64 is a modern ecommerce platform built for buying laptops,
        computer components, CCTV systems and professional hardware —
        all from verified vendors.
      </p>

      <p className="text-gray-500 leading-relaxed max-w-xl">
        We combine secure checkout, fast logistics and genuine products
        to create a smooth shopping experience for engineers, businesses
        and tech enthusiasts.
      </p>
      <div className="grid grid-cols-2 gap-4 pt-6 text-sm font-medium">
        <span className="text-[#8bf606]">✔ Verified Sellers</span>
        <span className="text-[#8bf606]">✔ Genuine Products</span>
        <span className="text-[#8bf606]">✔ Fast Delivery</span>
        <span className="text-[#8bf606]">✔ Secure Payments</span>
      </div>

    </div>
    <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 group about-right">
      <img
        src="/lapAbout.png"
        alt="CHIP-64 marketplace hardware"
        className="
          cybexel-img
          absolute inset-0
          w-full h-[120%]
          object-cover
          opacity-40
          group-hover:scale-105
          transition-transform duration-700
        "
        style={{ top: "-10%" }}
      />
    </div>
  </div>
</section>
   <section className="stats-container py-24 bg-white">
  <div className="flex flex-col md:flex-row border-y border-black">

    {[
      ["10K+", "Products Available"],
      ["500+", "Verified Vendors"],
      ["1M+", "Orders Delivered"],
    ].map(([num, label], i) => (
      <div
        key={i}
        className="
          stat-card
          group
          flex-1
          border-r last:border-r-0 border-black
          p-12 text-center
          cursor-pointer
          transition-all duration-500
          hover:bg-black
          hover:-translate-y-2
          hover:shadow-2xl
        "
      >
        <h3 className="
        stat-number
          text-5xl font-black text-[#8bf606]
          transition-all duration-300
          group-hover:scale-110
          group-hover:text-[#8bf606]
        "   data-value={num.replace("+","").replace("K","000").replace("M","000000")}
         
        >
          {num}
        </h3>

        <p className="
          text-gray-500 mt-2
          transition-colors duration-300
          group-hover:text-gray-300
        ">
          {label}
        </p>
      </div>
    ))}

  </div>
</section>
<section className="features py-32 px-6 max-w-7xl mx-auto">
  <h2 className="text-4xl font-black mb-16">
    Why Choose <span className="text-[#8bf606]">CHIP-64</span>
  </h2>

  <div className="border-t border-black">

    {[
      {
        title: "Wide Product Range",
        desc: "From laptops to CCTV systems, find everything in one place.",
      },
      {
        title: "Verified Sellers Only",
        desc: "Every vendor is screened to ensure genuine products.",
      },
      {
        title: "Fast & Reliable Delivery",
        desc: "Quick shipping with real-time order tracking.",
      },
      {
        title: "Secure Checkout",
        desc: "Protected payments with complete buyer safety.",
      },
    ].map((feat, i) => (
      <div
        key={i}
        className="
          feature-item
          group
          relative
          border-b border-black
          py-12 px-4
          flex flex-col md:flex-row
          justify-between gap-6
          cursor-pointer

          transition-all duration-300

          hover:bg-black
          active:bg-black

          active:scale-[0.98]
        "
      >
        <span
          className="
            absolute left-0 top-1/2 -translate-y-1/2
            text-6xl font-black text-black/5
            transition-all duration-300

            group-hover:text-[#8bf606]/20
            group-active:text-[#8bf606]/20
          "
        >
          0{i + 1}
        </span>
        <h3
          className="
            text-2xl md:text-3xl font-bold
            transition-colors duration-300

            group-hover:text-[#8bf606]
            group-active:text-[#8bf606]
          "
        >
          {feat.title}
        </h3>
        <p
          className="
            text-gray-600 max-w-md
            transition-colors duration-300

            group-hover:text-gray-300
            group-active:text-gray-300
          "
        >
          {feat.desc}
        </p>

      </div>
    ))}
  </div>
</section>
   <section className="pb-32 px-6">
  <div className="
    bg-black text-white
    rounded-[3rem]
    py-24 px-12 md:px-32
    text-center
    relative overflow-hidden
    group
    cursor-pointer
  ">
    <div
      className="
      absolute inset-0 bg-[#8bf606]

      translate-y-full
      group-hover:translate-y-0
      group-active:translate-y-0

      transition-transform duration-600
      ease-[cubic-bezier(0.85,0,0.15,1)]
    "
    />
    <div className="relative z-10">
      <h2 className="
        text-5xl md:text-8xl font-black uppercase mb-12
        leading-none tracking-tighter
        transition-colors duration-500

        group-hover:text-black
        group-active:text-black
      ">
        Shop Smart. <br /> Shop Fast.
      </h2>
      <p className="
        mb-10 text-gray-400 max-w-xl mx-auto
        transition-colors duration-500

        group-hover:text-black/80
        group-active:text-black/80
      ">
        Discover laptops, components and surveillance systems from trusted sellers — delivered quickly and securely.
      </p>
      <button
        className="
        bg-[#8bf606] text-black
        px-10 py-5 rounded-full
        font-black uppercase text-sm
        transition-all shadow-xl

        hover:shadow-[#8bf606]/50
        active:scale-95
      "
      >
        Explore Marketplace
      </button>

    </div>
  </div>
</section>
  </div>
      </>
);
};
export default About;