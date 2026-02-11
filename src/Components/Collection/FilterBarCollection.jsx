import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";

export default function FiltersPanel({
  priceRange,
  setPriceRange,

  brands,
  selectedBrands,
  toggleBrand,

  dynamicFilters = {},   // { RAM: ["8GB","12GB"], Storage: ["128GB"] }
  selectedFilters = {},  // { RAM:["8GB"], Storage:["256GB"] }
  toggleDynamicFilter,

  inStockOnly,
  setInStockOnly,
}) {
  return (
    <div className="space-y-8 text-sm">

      {/* PRICE */}
      <div>
        <h3 className="font-semibold mb-3">Price Range</h3>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          min={0}
          max={200000}
          step={500}
        />
      </div>


      {/* BRAND */}
      <div>
        <h3 className="font-semibold mb-3">Brand</h3>
        {brands.map((brand) => (
          <label key={brand._id} className="flex gap-2">
            <Checkbox
              checked={selectedBrands.includes(brand._id)}
              onCheckedChange={() => toggleBrand(brand._id)}
            />
            {brand.name}
          </label>
        ))}
      </div>


      {/* 🔥 DYNAMIC FILTERS */}
      {Object.entries(dynamicFilters).map(([key, values]) => (
        <div key={key}>
          <h3 className="font-semibold mb-3">{key}</h3>

          <div className="space-y-2">
            {values.map((value) => (
              <label key={value} className="flex gap-2">
                <Checkbox
                  checked={selectedFilters[key]?.includes(value)}
                  onCheckedChange={() =>
                    toggleDynamicFilter(key, value)
                  }
                />
                {value}
              </label>
            ))}
          </div>
        </div>
      ))}


      {/* STOCK */}
      <div>
        <label className="flex gap-2">
          <Checkbox
            checked={inStockOnly}
            onCheckedChange={setInStockOnly}
          />
          In Stock Only
        </label>
      </div>

    </div>
  );
}
