import React from "react";

const CategoryGrid = () => {
  return (
    <div className="p-3 md:p-6">

      <div
        className="
          grid
          grid-cols-3
          grid-rows-2
          gap-3 md:gap-4
          h-[300px] md:h-[500px]
        "
      >

        {/* ================= HERO ================= */}
        <div
          className="
            col-span-2 row-span-2
            relative overflow-hidden rounded-3xl
            bg-gradient-to-br from-white via-gray-50 to-gray-100
            border border-gray-200
            shadow-lg
          "
        >
          <div className="absolute inset-0 bg-[#131313]" />

          {/* IMAGE (same for all sizes) */}
          <img
            src="/ipad.png"
            className="
              absolute
              w-[650px] h-[600px]
              md:w-[850px] md:h-[850px]
              object-cover
              md:object-contain
              top-1/2 left-1/2
              -translate-x-1/2 -translate-y-1/2
            "
          />

          {/* TEXT */}
          <div className="absolute top-4 md:top-12 left-4 md:left-12 max-w-xs md:max-w-md">
            <p className="text-[10px] md:text-xs tracking-[0.25em] uppercase text-white font-medium">
              New Arrival
            </p>

            <h2 className="text-xl md:text-6xl font-semibold tracking-tight text-white mt-1 md:mt-3">
              Shop <span className="text-primary"> Mobiles</span>
            </h2>

            <p className="text-white text-[7px] md:text-xs tracking-[0.35em] mt-2 md:mt-4 uppercase">
              Various kinds of smartphones & gadgets
            </p>

            <button className="mr-2 md:mr-0  md:left-0 absolute mt-3 md:mt-6 bg-primary text-black px-2 md:px-6 py-0.5 md:py-3 rounded-lg md:rounded-xl text-[10px] md:text-base font-medium shadow-md">
              Shop Now
            </button>
          </div>
        </div>

        {/* ================= CCTV ================= */}
        <div
          className="
            relative overflow-hidden rounded-2xl
            bg-[#131313]
            shadow-lg
          "
        >
         <img
  src="/cctv.png"
  className="
    absolute
    
    left-10 md:left-30 bottom-18
    md:bottom-0
    w-[280px] md:w-[980px]
    object-contain
  "
/>

          <div className="absolute top-4 md:top-15 left-2 md:left-6 text-white">
            <p className="text-[8px] left-6 md:text-xs tracking-[0.25em] mt-6 md:mt-0 uppercase text-white/60">
              Security
            </p>

            <h3 className="text-sm md:text-4xl font-semibold mt-1">
              CCTV <span className="text-primary">Camera</span>
            </h3>
               <p className="md:text-[12px] text-[7px] md:text-xs tracking-[0.25em] uppercase text-white mt-2 md:mt-0">
                All types of CCTV cameras
            </p>

            <button className="mt-2 md:mt-4 bg-primary text-black md:px-3 px-2 py md:py-1 rounded-md md:rounded-lg text-xs md:text-base font-medium">
              Shop Now
            </button>
          </div>
        </div>

        {/* ================= CPU ================= */}
        <div
          className="
            relative overflow-hidden rounded-2xl
            
            shadow-lg bg-[#131313]
          "
        >
          <img
            src="/cpu1.png"
            className="absolute w-[300px] md:w-[300px] object-contain right-13 md:right-70 bottom-0 z-1"
          />

          <img
            src="/cpu2.png"
            className="absolute w-[350px] md:w-[300px] object-contain left-13 md:left-70 bottom-0 z-2" 
          />

          <div className="absolute md:bottom-42 top-2 md:left-34">
            <p className=" text-[#A8c3bc]  absolute left-1
 text-2xl md:text-7xl font-semibold tracking-tight mb-20 md:mb-0">
              <span className="absolute left-7.5 z-1">Buy</span> <br/>
              <span className="text-primary md:text-7xl  text-3xl left-[16px]   md:left-0 absolute z-0">CPUs</span>
            </p>
                 <button className=" whitespace-nowrap  mt-10 md:mt-4 bg-primary text-black px-2 md:px-4 py-1 rounded-md md:rounded-lg text-[6px] md:text-base  font-medium absolute  top-11 md: md:top-35 left-9.5 md:left-12">
              Shop Now
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CategoryGrid;
