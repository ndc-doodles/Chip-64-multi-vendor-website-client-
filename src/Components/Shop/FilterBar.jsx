// FilterBar.jsx
"use client";
import { ChevronDown, Search } from "lucide-react";

export default function FilterBar({
  categories = [],
  sortOptions = [],
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  searchValue,
  onSearchChange,
}) {
  return (
    <div className="border-b border-border pb-8 mb-12">
      <div className="flex flex-wrap gap-3 md:gap-6 mb-8 items-center">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              console.log("FilterBar click:", cat);
              onCategoryChange(cat.id);
            }}
            className={`text-sm md:text-base font-medium transition-colors duration-200 ${
              selectedCategory === cat.id
                ? "text-foreground border-b-2 border-accent"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-muted-foreground">Sort by:</label>
          <div className="relative">
            <select value={sortBy} onChange={(e) => onSortChange(e.target.value)}
              className="appearance-none bg-background text-foreground text-sm font-medium pr-8 py-2 pl-3 border border-border rounded-sm focus:outline-none focus:ring-1 focus:ring-accent cursor-pointer">
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          </div>
        </div>

        <div className="w-full md:w-64">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search products"
              className="w-full pl-9 pr-3 py-2 border border-border rounded-sm bg-background text-sm text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
