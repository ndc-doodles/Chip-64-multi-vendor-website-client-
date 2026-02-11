"use client";

import React, { useEffect, useState } from "react";
import CategoryCard from "@/Components/Cards/CategoryCard";
import { getUserCategories } from "@/API/userAPI";

export default function FeaturedCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getUserCategories();

        if (data?.success) {
          const parentCategories = data.categories.filter(
            (cat) => cat.parentCategory === null
          );
          setCategories(parentCategories);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  if (loading) return null;

  return (


  <section className="py-10 px-4 md:px-8 lg:px-16  bg-white">
  <div className="mb-6 flex items-center justify-center px-5 py-5">
    <h2 className=" text-3xl leading-[28px] text-[#000000] font-semibold">Shop by <span className="text-primary">Category</span> </h2>
  </div>

  {/* Horizontal scroll container */}
  <div className="overflow-x-auto md:overflow-visible scrollbar-hide">
   <div
  className="
  gap-6 px-2
    flex md:justify-center md:gap-16        /* 💻 desktop */
  "
>
      {categories.map((category) => (
        <CategoryCard
          key={category._id}
          name={category.name}
          image={category.image}
          slug={category.slug}
        />
      ))}
    </div>
  </div>
</section>


  );
}
