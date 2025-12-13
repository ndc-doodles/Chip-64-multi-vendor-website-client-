import { Link } from "react-router-dom";
import LuxButton from "@/Components/Button/LuxButton";

export default function BannerSection() {
  return (
    <section className="relative w-full min-h-[640px] md:min-h-[720px] flex items-center justify-center overflow-hidden bg-background">
      {/* ===== Background Layers ===== */}
      <div className="absolute inset-0 pointer-events-none">
        {/* 1. Dotted texture */}
        <div className="absolute inset-0 opacity-35">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(180,160,130,0.5)_1px,transparent_1px)] bg-size-[36px_36px] dark:bg-[radial-gradient(circle_at_1px_1px,rgba(80,65,55,0.8)_1px,transparent_1px)]" />
        </div>

        {/* 2. Soft center spotlight */}
        <div className="absolute inset-0 mix-blend-soft-light">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.16),transparent_68%)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_70%)]" />
        </div>

        {/* 3. Subtle vertical gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/10 to-background" />

        {/* 4. Premium accent glow blobs */}
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(196,166,111,0.45),transparent_70%)] blur-3xl opacity-70" />
        <div className="absolute -bottom-24 -left-10 w-64 h-64 rounded-full bg-[radial-gradient(circle_at_center,rgba(120,90,70,0.6),transparent_70%)] blur-3xl opacity-60" />

        {/* 5. Very soft film-like lines (barely visible) */}
        <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.08)_0,rgba(255,255,255,0.08)_1px,transparent_1px,transparent_4px)]" />
      </div>

      {/* ===== Content ===== */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 py-20 md:py-28 text-center space-y-10">
        {/* Eyebrow / small label */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border/40 bg-background/60 backdrop-blur-sm text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground">
          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          Leather Haven · Crafted for a lifetime
        </div>

        <div className="space-y-5">
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-foreground leading-tight">
            The Art of{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-primary via-primary/80 to-foreground bg-clip-text text-transparent">
                Leather
              </span>
              {/* underline accent */}
              <span className="absolute left-0 right-0 -bottom-1 h-[2px] md:h-[3px] bg-gradient-to-r from-primary/70 via-primary to-transparent rounded-full" />
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-light tracking-wide max-w-2xl mx-auto">
            Handcrafted leather essentials designed to age beautifully, carrying
            your stories for years to come.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link to="/shop">
            <LuxButton variant="primary" size="lg">
              Shop Collection
            </LuxButton>
          </Link>

          <Link to="/collections">
            <LuxButton variant="outline" size="lg">
              Explore Collection
            </LuxButton>
          </Link>
        </div>

        {/* Small trust line */}
        <p className="text-xs sm:text-sm text-muted-foreground/80 tracking-wide pt-2">
          Free shipping on premium orders · Ethically sourced leather · Lifetime
          craftsmanship promise
        </p>
      </div>
    </section>
  );
}
