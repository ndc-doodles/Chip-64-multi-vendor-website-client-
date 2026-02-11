"use client";

import { useEffect, useState } from "react";
import { getRecentlyViewedApi } from "@/API/userAPI";
import ProductCard from "@/Components/Cards/ProductCard";

export default function RecentlyViewedSection() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchRecentlyViewed = async () => {
      try {
        const data = await getRecentlyViewedApi();
        setProducts(data?.products || []);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRecentlyViewed();
  }, []);

  if (!products.length) return null;

  return (
    <div className="px-4">
      <section className="bg-white py-10 md:py-12 rounded-3xl md:rounded-4xl">
        <div className="max-w-7xl mx-auto">

          {/* Title */}
          <h2 className="text-2xl md:text-4xl font-semibold text-black mb-5 md:mb-6">
            Recently Viewed{" "}
            <span className="text-[#8bf606]">Products</span>
          </h2>

          {/* Products */}
       <div
  className="
    flex gap-4 overflow-x-auto scrollbar-hide pb-2
    snap-x snap-mandatory

    md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
    md:gap-6 md:overflow-visible md:snap-none
  "
>
  {products.map((product) => (
    <div
      key={product._id}
      className="
        min-w-[60%] snap-start     /* 📱 mobile swipe */

        md:min-w-0                /* 💻 remove width */
      "
    >
      <ProductCard product={product} />
    </div>
  ))}
</div>



        </div>
      </section>
    </div>
  );
}
