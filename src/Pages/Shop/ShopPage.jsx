// src/Pages/ShopPage.jsx
"use client";

import { useState, useEffect } from "react";
import HeaderLayout from "@/Layout/Header/HeaderLayout";
import ShopBanner from "@/Layout/Shop/ShopBanner";
import FilterLayout from "@/Layout/Shop/FilterLayout";
import ProductGrid from "@/Layout/Products/ProductGridShop";
import Footer from "@/Layout/Footer/FooterLayout";
import { getUserProductsApi } from "@/API/userAPI";
import { getCategoriesApi } from "@/API/adminApi";

export default function ShopPage() {
  const [filters, setFilters] = useState({ category: "all", sortBy: "new", search: "" });
  const [displayCount, setDisplayCount] = useState(8);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [prodRes, catRes] = await Promise.all([ getUserProductsApi(), getCategoriesApi() ]);
        // shape products
        const prods = prodRes.products ?? prodRes ?? [];
        setProducts(prods);
        // categories might be { categories: [...] } or [...]
        const catsRaw = Array.isArray(catRes) ? catRes : (catRes.categories ?? []);
        // normalize to { id, name }
        const cats = catsRaw.map(c => ({ id: String(c._id ?? c.id ?? c), name: c.name ?? c }));
        setCategories(cats);
        console.log("SHOPPAGE: products sample", prods[0]);
        console.log("SHOPPAGE: categories", cats);
      } catch (e) {
        console.error("ShopPage load error:", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <>
      <HeaderLayout />
      <ShopBanner />
      <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16 space-y-16">
        <FilterLayout
          categories={categories}
          onFilterChange={(updatedFilters) => { setFilters(updatedFilters); setDisplayCount(8); }}
        />

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <ProductGrid
            products={products}
            category={filters.category}
            sortBy={filters.sortBy}
            search={filters.search}
            displayCount={displayCount}
            onLoadMore={() => setDisplayCount(displayCount + 8)}
          />
        )}
      </section>
      <Footer />
    </>
  );
}
