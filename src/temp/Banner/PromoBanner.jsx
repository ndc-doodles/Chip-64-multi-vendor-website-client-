import React from "react";

const PromoBanner = ({ data }) => {
  if (!data) return null; // safety

  return (
    <div className="flex items-center justify-center w-full p-4 py-10">
      <div className="relative w-full max-w-6xl h-60 md:h-64 bg-accent rounded-2xl flex items-center px-6 md:px-16 shadow-2xl transition-all">

        {/* Pop-Out Image */}
        <div
          className="absolute 
          -top-25 left-1/2 -translate-x-1/2
          md:-top-25 md:left-65 md:translate-x-0
          w-110 md:w-150
          drop-shadow-[0_20px_20px_rgba(0,0,0,0.4)] md:drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)]
          z-20 transition-all"
        >
          <img
            src={data.image}
            alt={data.heading}
            style={{ transform: `rotate(${data.rotate}deg)` }}
            className="w-full h-auto transform -rotate-6 md:${data.rotate}"
          />
        </div>

        {/* Background Decorative Text */}
        <div
          className="absolute
          bottom-6 left-6
          md:left-8 md:bottom-8
          z-10 select-none top-28 md:top-auto"
        >
          <h2
            className="text-4xl md:text-7xl font-bold text-black opacity-90 leading-none uppercase tracking-[-0.01em]"
            style={{ fontStretch: "120%" }}
          >
            {data.titleBg.split("\n").map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
          </h2>

          {data.date && (
            <p className="text-black text-[10px] md:text-sm mt-1 md:mt-2 font-semibold">
              {data.date}
            </p>
          )}
        </div>

        {/* Right Side Content */}
        <div className="ml-auto mt-auto mb-6 md:my-0 text-right md:text-left max-w-[140px] md:max-w-xs z-30">
          <p
            className="text-black text-[10px] md:text-xs uppercase tracking-widest mb-1 opacity-80"
            style={{ fontStretch: "120%" }}
          >
            {data.tag}
          </p>

          <h3
            className="text-black text-xl md:text-4xl font-bold mb-3 md:mb-4"
            style={{ fontStretch: "120%" }}
          >
            {data.heading}
          </h3>

          <p className="hidden md:block text-black text-[10px] leading-tight opacity-70 mb-6">
            {data.description}
          </p>

          <button className="bg-white text-primary px-4 py-1.5 md:px-6 md:py-2 rounded-full font-bold text-[10px] md:text-sm hover:bg-gray-100 transition-colors shadow-lg">
            Explore
          </button>
        </div>

      </div>
    </div>
  );
};

export default PromoBanner;
