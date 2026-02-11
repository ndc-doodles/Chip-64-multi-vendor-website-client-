"use client";

import { Accordion } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import FilterSection from "@/Components/Shop/FilterBar";

const PRICE_PRESETS = [
  { label: "Below ₹500", min: 0, max: 500 },
  { label: "₹500 – ₹2,000", min: 500, max: 2000 },
  { label: "₹2,000 – ₹10,000", min: 2000, max: 10000 },
  { label: "Above ₹10,000", min: 10000, max: 100000 },
];

export default function FilterSidebar({
  filters,
  setFilters,
  categories,
}) {
  /* ---------------- HELPERS ---------------- */

  const selectedCategory = categories.find(
    (c) => c.id === filters.category
  );

  const isFashion = selectedCategory?.name === "Fashion";

  const activeFilterCount =
    (filters.category ? 1 : 0) +
    (filters.subcategory ? 1 : 0) +
    filters.gender.length +
    (filters.inStock ? 1 : 0);

  /* ---------------- ACCORDION CONTROL ---------------- */

  const openSections = ["category", "price"];

  if (filters.category && selectedCategory?.subcategories?.length > 0) {
    openSections.push("subcategory");
  }

  if (isFashion) {
    openSections.push("gender");
  }

  /* ---------------- HANDLERS ---------------- */

  const handleCategorySelect = (categoryId) => {
    setFilters({
      category: filters.category === categoryId ? null : categoryId,
      subcategory: null,
    });
  };

  const handleSubcategorySelect = (sub) => {
    setFilters({
      subcategory: filters.subcategory === sub ? null : sub,
    });
  };

  const handleGenderToggle = (gender) => {
    const next = filters.gender.includes(gender)
      ? filters.gender.filter((g) => g !== gender)
      : [...filters.gender, gender];

    setFilters({ gender: next });
  };

  const handlePresetSelect = (range) => {
    setFilters({
      priceRange: [range.min, range.max],
      showCustomPrice: false,
    });
  };

  const handleCustomToggle = () => {
    setFilters({ showCustomPrice: true });
  };

  const handlePriceChange = (value) => {
    setFilters({ priceRange: value });
  };

  const handleStockToggle = (checked) => {
    setFilters({ inStock: !!checked });
  };

  const clearAllFilters = () => {
    setFilters({
      category: null,
      subcategory: null,
      gender: [],
      priceRange: [0, 100000],
      showCustomPrice: false,
      inStock: false,
    });
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="space-y-6 shadow-xl rounded-2xl p-4">
      {/* HEADER */}
      <div className="flex items-center justify-between pb-2 border-b border-border/40">
        <h2 className="text-lg font-medium">Filters</h2>

        {activeFilterCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-xs"
          >
            Clear all ({activeFilterCount})
          </Button>
        )}
      </div>

      <Accordion
        type="multiple"
        value={openSections}
        className="space-y-1"
      >
        {/* CATEGORY */}
        <FilterSection value="category" title="Category">
  <div className="space-y-2">

    {/* SHOW PARENT CATEGORIES */}
    {!filters.category &&
      categories.map((cat) => (
        <label
          key={cat.id}
          className="flex items-center gap-3 cursor-pointer"
        >
        <Checkbox
  checked={filters.category === cat.id}
  onCheckedChange={() => handleCategorySelect(cat.id)}
/>

          <span className="text-sm">{cat.name}</span>
        </label>
      ))}

    {/* SHOW SUBCATEGORIES */}
    {filters.category && selectedCategory && (
      <>
        {/* BACK BUTTON */}
        <button
          className="text-xs text-accent mb-2"
          onClick={() =>
            setFilters({
              category: null,
              subcategory: null,
            })
          }
        >
          ← Back to categories
        </button>
{selectedCategory.subcategories.map((sub) => (
  <label
    key={sub.id}
    className="flex items-center gap-3 cursor-pointer"
  >
    <Checkbox
      checked={filters.subcategory === sub.id}
      onCheckedChange={() =>
        setFilters({
          subcategory:
            filters.subcategory === sub.id ? null : sub.id,
        })
      }
    />
    <span className="text-sm">{sub.name}</span>
  </label>
))}

      </>
    )}
  </div>
</FilterSection>




        {/* GENDER */}
        {isFashion && (
          <FilterSection value="gender" title="Gender">
            <div className="space-y-2">
              {["men", "women", "unisex"].map((g) => (
                <label
                  key={g}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <Checkbox
                    checked={filters.gender.includes(g)}
                    onCheckedChange={() =>
                      handleGenderToggle(g)
                    }
                  />
                  <span className="capitalize text-sm">{g}</span>
                </label>
              ))}
            </div>
          </FilterSection>
        )}

        {/* PRICE */}
        <FilterSection value="price" title="Price Range">
          <div className="space-y-3">
            {PRICE_PRESETS.map((range) => {
              const isActive =
                filters.priceRange[0] === range.min &&
                filters.priceRange[1] === range.max;

              return (
                <label
                  key={range.label}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <Checkbox
                    checked={isActive}
                    onCheckedChange={() =>
                      handlePresetSelect(range)
                    }
                  />
                  <span className="text-sm">{range.label}</span>
                </label>
              );
            })}

            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="justify-start  text-black hover:bg-primary px-5"
              onClick={handleCustomToggle}
            >
              Custom range
            </Button>

            {filters.showCustomPrice && (
              <div className="pt-2">
                <Slider
                  min={0}
                  max={100000}
                  step={100}
                  value={filters.priceRange}
                  onValueChange={handlePriceChange}
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>₹{filters.priceRange[0]}</span>
                  <span>₹{filters.priceRange[1]}</span>
                </div>
              </div>
            )}
          </div>
        </FilterSection>

        {/* STOCK */}
        <FilterSection value="stock" title="Availability">
          <label className="flex items-center gap-3 cursor-pointer">
            <Checkbox
              checked={filters.inStock}
              onCheckedChange={handleStockToggle}
            />
            <span className="text-sm">In stock only</span>
          </label>
        </FilterSection>
      </Accordion>
    </div>
  );
}
