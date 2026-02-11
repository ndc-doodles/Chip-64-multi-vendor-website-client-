"use client";
 
import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

export function VendorCards() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <section className="w-full py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-sans text-3xl md:text-5xl tracking-tight text-foreground mb-12">
          Browse by Vendors
        </h2>
      </div>

      <Carousel items={cards} />
    </section>
  );
}

const DummyContent = () => {
  return (
    <>
      {[...Array(2)].map((_, index) => (
        <div
          key={index}
          className="bg-card text-card-foreground p-8 md:p-14 rounded-3xl mb-6 border border-border"
        >
          <p className="text-muted-foreground text-base md:text-xl leading-relaxed font-sans max-w-3xl mx-auto">
            <span className="block font-serif text-foreground text-2xl md:text-3xl mb-4">
              Crafted for Moder      n Luxury
            </span>
      
          </p>

          <img
            src="https://assets.aceternity.com/macbook.png"
            alt="Vendor showcase"
            className="w-full md:w-1/2 mx-auto mt-10 object-contain"
          />
        </div>
      ))}
    </>
  );
};
const data = [
  {
    category: "Leather Accessories",
    title: "Rivora Leather Co.",
    src: "lee1.jpg",
    content: <DummyContent />,
  },
  {
    category: "Hospitality Accessories",
    title: "CasaLuxe Living",
    src: "bb1.jpg",
    content: <DummyContent />,
  },
  {
    category: "Toys & Kids",
    title: "PlayNest Studio",
    src: "tt1.jpg",
    content: <DummyContent />,
  },
  {
    category: "Tech Accessories",
    title: "Voltix Gear",
    src: "t1.jpg",
    content: <DummyContent />,
  },
  {
    category: "Bridal Wear",
    title: "Aurelia Bridal Atelier",
    src: "/b1.jpg",
    content: <DummyContent />,
  },
];

