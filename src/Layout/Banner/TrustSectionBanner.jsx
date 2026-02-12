import React from 'react';
import { Zap, ShieldCheck, Users, Headset, RotateCcw } from 'lucide-react';

const TrustCard = ({ icon: Icon, title, description }) => (
  <div className="
    group relative overflow-hidden
    rounded-xl md:rounded-2xl
    border border-white/5
    bg-[#111111]

    p-4 md:p-8               /* smaller mobile padding */
    transition-all duration-500
    hover:border-[#8bf606]/40
    hover:shadow-[0_0_40px_rgba(139,246,6,0.1)]
  ">
    {/* Glow */}
    <div className="absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br from-[#8bf606]/10 via-transparent to-transparent" />
    
    <div className="relative z-10">
      <div className="
        mb-3 md:mb-6
        inline-flex items-center justify-center
        text-[#8bf606]
        transition-transform duration-500 group-hover:scale-110
      ">
        <Icon size={22} className="md:hidden" />
        <Icon size={32} className="hidden md:block" />
      </div>

      <h3 className="mb-1 md:mb-2 text-sm md:text-lg font-semibold text-white">
        {title}
      </h3>

      <p className="text-xs md:text-sm leading-relaxed text-gray-500 group-hover:text-gray-400">
        {description}
      </p>
    </div>
  </div>
);

const ChipTrustSection = () => {
  const features = [
    { icon: Zap, title: "Fast Delivery", description: "Priority logistics for mission-critical hardware." },
    { icon: ShieldCheck, title: "Secure Payments", description: "Military-grade encryption for every transaction." },
    { icon: Users, title: "Tech Choice", description: "The world's leading tech brands in one place." },
    { icon: Headset, title: "24/7 Support", description: "Direct access to our expert engineering team." },
    { icon: RotateCcw, title: "Easy Returns", description: "Transparent, stress-free return processing." }
  ];

  return (
    <section className="bg-[#fafafa] py-12 md:py-24 px-4 md:px-6">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-10 md:mb-16 text-center">
          <h2 className="mb-2 text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] md:tracking-[0.3em] text-[#8bf606]">
            The CHIP Standard
          </h2>

          <p className="text-xl md:text-4xl font-medium tracking-tight text-black">
            Built for performance. <span className="text-gray-500">Trusted by experts.</span>
          </p>
        </div>

        {/* Grid */}
        <div className="
          grid
          grid-cols-2          /* 📱 2 per row */
          gap-3 md:gap-6

          sm:grid-cols-2
          lg:grid-cols-5      /* 💻 5 per row */
        ">
         {features.map((feature, index) => (
  <div
    key={index}
    className={index === 4 ? "col-span-2 lg:col-span-1" : ""}
  >
    <TrustCard {...feature} />
  </div>
))}

        </div>
      </div>
    </section>
  );
};

export default ChipTrustSection;
