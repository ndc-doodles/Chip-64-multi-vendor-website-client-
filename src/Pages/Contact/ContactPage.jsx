"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Phone, MapPin, Globe, Send } from "lucide-react";
import HeaderLayout from "@/Layout/Header/HeaderLayout";

gsap.registerPlugin(ScrollTrigger);

const ContactPage = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ================= HERO ================= */
      const heroTL = gsap.timeline();

      heroTL
        .from(".hero-content", {
          x: -120,
          opacity: 0,
          duration: 1.2,
          ease: "power4.out",
        })
        .from(
          ".hero-visual",
          {
            x: 120,
            opacity: 0,
            duration: 1.2,
            ease: "power4.out",
          },
          "-=0.9"
        );

      /* ================= CONTACT CARDS ================= */
    gsap.utils.toArray(".contact-card").forEach((card, i) => {
  gsap.from(card, {
    y: 50,
    opacity: 0,
    duration: 0.8,
    delay: i * 0.08,
    ease: "power3.out",
    scrollTrigger: {
      trigger: card,   // ⭐ trigger each card itself
      start: "top 90%",
    },
  });
});


      /* ================= FORM ================= */
      gsap.from(".form-container", {
        scrollTrigger: {
          trigger: ".form-section",
          start: "top 75%",
        },
        x: -80,
        opacity: 0,
        duration: 1,
      });

      gsap.from(".form-image", {
        scrollTrigger: {
          trigger: ".form-section",
          start: "top 75%",
        },
        x: 80,
        opacity: 0,
        duration: 1,
      });

      gsap.from(".input-item", {
        scrollTrigger: {
          trigger: ".form-container",
          start: "top 70%",
        },
        y: 20,
        opacity: 0,
        stagger: 0.1,
        delay: 0.3,
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
    <HeaderLayout/>
    <div
      ref={containerRef}
      className="bg-white text-black selection:bg-[#8bf606] overflow-x-hidden"
    >

      {/* ===================================================== */}
      {/* HERO SECTION */}
      {/* ===================================================== */}
      <section className="relative h-[80vh] flex items-center px-6 md:px-20 bg-black text-white overflow-hidden">

        {/* tech grid */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(#8bf606 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 w-full z-10">

          {/* LEFT */}
          <div className="hero-content flex flex-col justify-center">

            <p className="text-[#8bf606] font-mono text-xs uppercase tracking-[0.4em] mb-4 font-bold">
              Customer Support
            </p>

            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6">
              Contact <br />
              <span className="text-primary">CHIP-64</span>
            </h1>

            <p className="text-gray-400 text-lg max-w-md font-medium">
              Need help with orders, deliveries, returns or bulk purchases?
              Our support team is here to assist you 24/7.
            </p>
          </div>

          {/* RIGHT IMAGE */}
          <div className="hero-visual hidden lg:flex items-center justify-center">
            <img
              src="/lapAbout.png"
              alt="Customer support"
              className="rounded-3xl grayscale opacity-60 shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* CONTACT CARDS */}
      {/* ===================================================== */}
      <section className="info-grid py-24 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

        {[
          {
            icon: <Mail />,
            title: "Email Support",
            value: "support@chip64.com",
          },
          {
            icon: <Phone />,
            title: "Order Help",
            value: "+91 6282980763",
          },
          {
            icon: <MapPin />,
            title: "Warehouse Hub",
            value: "Tatabad, Coimbatore",
          },
          {
            icon: <Globe />,
            title: "Seller Portal",
            value: "cybexel.com",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="contact-card p-8 rounded-2xl border border-black/5 bg-[#fafafa] hover:bg-white hover:shadow-xl hover:-translate-y-2 transition-all duration-500"
          >
            <div className="text-[#8bf606] mb-5">{item.icon}</div>

            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
              {item.title}
            </p>

            <p className="text-xl font-black">{item.value}</p>
          </div>
        ))}
      </section>

      {/* ===================================================== */}
      {/* FORM SECTION */}
      {/* ===================================================== */}
   <section className="form-section py-28 px-6 bg-[#fafafa] border-y border-black/5">

  <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">

    {/* LEFT FORM */}
    <div className="form-container bg-white rounded-3xl p-10 md:p-14 shadow-xl">

      <h2 className="text-4xl font-black uppercase mb-10">
        Send a <span className="text-[#8bf606]">Message</span>
      </h2>

      <form className="space-y-6">

        <div className="grid md:grid-cols-2 gap-6">
          <input
            className="input-item w-full p-5 rounded-xl border border-black/10 focus:border-[#8bf606] outline-none"
            placeholder="Full Name"
          />
          <input
            className="input-item w-full p-5 rounded-xl border border-black/10 focus:border-[#8bf606] outline-none"
            placeholder="Email Address"
          />
        </div>

        <input
          className="input-item w-full p-5 rounded-xl border border-black/10 focus:border-[#8bf606] outline-none"
          placeholder="Order ID (optional)"
        />

        <textarea
          rows="5"
          className="input-item w-full p-5 rounded-xl border border-black/10 focus:border-[#8bf606] outline-none resize-none"
          placeholder="How can we help you today?"
        />

        <button className="w-fit bg-black text-white px-10 py-4 rounded-full font-bold hover:bg-[#8bf606] hover:text-black transition">
          Send Message
        </button>

      </form>
    </div>


    {/* RIGHT IMAGE */}
    <div className="form-image hidden lg:block rounded-3xl overflow-hidden shadow-2xl h-[520px]">
      <img
        src="/lapAbout.png"
        alt="Support desk"
        className="w-full h-full object-cover grayscale"
      />
    </div>

  </div>
</section>



      {/* ===================================================== */}
      {/* FINAL CTA */}
      {/* ===================================================== */}
      <section className="py-28 px-6 text-center">

        <div className="bg-black rounded-[3rem] py-20 text-white max-w-5xl mx-auto">

          <h2 className="text-5xl font-black mb-6 uppercase">
            Need Immediate Help?
          </h2>

          <p className="text-gray-400 mb-8">
            Our team is ready to resolve your queries quickly.
          </p>

          <button className="  bg-[#8bf606]
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
">
            Contact Us
          </button>
        </div>
      </section>
    </div>
    </>
  );
};

export default ContactPage;
