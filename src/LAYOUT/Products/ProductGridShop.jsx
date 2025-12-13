"use client";

import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "@/Components/Cards/ProductCard";

export default function ProductGrid({
  products = [],
  category,        // 🔥 use this instead of selectedCategory
  sortBy,
  displayCount,
}) {
  // 🟩 Filter by category
  const filtered = category === "all"
    ? products
    : products.filter((p) => {
        // p.category might be ObjectId string, or populated { _id, name }
        const catId = p.category?._id ?? p.category;
        return String(catId) === String(category);
      });

  // 🟩 Sorting logic
  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case "bestselling":
        return b.soldCount - a.soldCount;

      case "price-asc":
        return a.basePrice - b.basePrice;

      case "price-desc":
        return b.basePrice - a.basePrice;

      case "new":
      default:
        return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  // 🟩 Pagination
  const productsToDisplay = sorted.slice(0, displayCount);

  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12"
      >
        {productsToDisplay.map((product, index) => (
          <motion.div
            key={product._id}
            layout
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
              delay: index * 0.05,
            }}
          >
            <ProductCard
              product={{
                id: product._id,
                name: product.name,
                price: product.basePrice,
                image: product.mainImage,
                badge: product.badges?.[0] || null,
                category: product.category,
                slug: product.slug,
              }}
            />
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
