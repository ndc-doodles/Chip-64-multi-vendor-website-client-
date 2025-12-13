// src/Layout/Categories/FeaturedCategoriesLayout.jsx
"use client";

import React, { useEffect, useState } from "react";
import CategoryCard from "@/Components/Cards/CategoryCard";
import { getUserCategories } from "@/API/userAPI";

export default function FeaturedCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await getUserCategories();
        // support both shapes: { categories: [...] } or an array directly
        const list = Array.isArray(data)
          ? data
          : Array.isArray(data?.categories)
          ? data.categories
          : (data?.data && Array.isArray(data.data.categories) ? data.data.categories : []);

        if (!mounted) return;
        // normalize minimal shape for UI
        const normalized = list.map((c) => ({
          id: c._id ?? c.id ?? c.name,
          name: c.name,
          image: c.image || c.icon || "/placeholder-category.png",
        }));
        setCategories(normalized);
      } catch (err) {
        console.error("Failed to load categories:", err);
        if (!mounted) return;
        setCategories([]);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="w-full py-20 md:py-32 px-4 md:px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-light tracking-tight text-foreground mb-2">
            Featured Categories
          </h2>
          <div className="h-0.5 w-12 bg-linear-to-r from-transparent via-accent to-transparent mx-auto" />
        </div>

        {loading ? (
          <div className="text-center py-12">Loading categories...</div>
        ) : categories.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">No categories yet.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                id={category.id}
                name={category.name}
                image={category.image}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
