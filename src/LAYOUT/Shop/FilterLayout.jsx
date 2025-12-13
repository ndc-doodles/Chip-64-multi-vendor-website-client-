// FilterLayout.jsx
"use client";

import { useState, useEffect } from "react";
import FilterBar from "@/Components/Shop/FilterBar";

export default function FilterLayout({ categories = [], onFilterChange }) {
  const sortOptions = [
    { label: "New Arrivals", value: "new" },
    { label: "Best Selling", value: "bestselling" },
    { label: "Price: Low to High", value: "price-asc" },
    { label: "Price: High to Low", value: "price-desc" },
  ];

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("new");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // If categories prop changes and selectedCategory isn't valid, keep "all"
    if (selectedCategory !== "all" && !categories.some(c => c.id === selectedCategory)) {
      setSelectedCategory("all");
      onFilterChange?.({ category: "all", sortBy, search: searchTerm });
    }
  }, [categories]);

  const updateFilter = (category, sortValue, searchValue) => {
    const payload = {
      category: category ?? selectedCategory,
      sortBy: sortValue ?? sortBy,
      search: searchValue ?? searchTerm,
    };
    onFilterChange?.(payload);
  };

  return (
    <FilterBar
      categories={[ { id: "all", name: "All" }, ...categories ]}
      sortOptions={sortOptions}
      selectedCategory={selectedCategory}
      onCategoryChange={(catId) => {
        setSelectedCategory(catId);
        updateFilter(catId, null, null);
      }}
      sortBy={sortBy}
      onSortChange={(value) => {
        setSortBy(value);
        updateFilter(null, value, null);
      }}
      searchValue={searchTerm}
      onSearchChange={(value) => {
        setSearchTerm(value);
        updateFilter(null, null, value);
      }}
    />
  );
}
