"use client";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import CollectionHeroBar from "@/Components/Collection/CollectionHeroBar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import ProductCard from "@/Components/Cards/ProductCard";
import FiltersPanel from "@/Components/Collection/FilterBarCollection";
import { useMediaQuery } from "@/hooks/use-mobile";
import PromoBanner from "@/Layout/Banner/PromoBanner";
import { Menu } from "lucide-react";
import { promoConfig } from "@/Utils/PromoConfig";
import { buildFilterOptions } from "@/Utils/buildFilterOption";
import { getCategoryFilters } from "@/Utils/getCategoryFilters";

import { getCollectionProductsApi } from "@/API/userAPI";

export default function CollectionPage() {
  const { slug } = useParams();
  const isMobile = useMediaQuery("(max-width: 768px)");
const promoData = promoConfig[slug] || promoConfig.default;


  /* ---------------- STATE ---------------- */
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);

  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [sortBy, setSortBy] = useState("newest");
  const [selectedFilters, setSelectedFilters] = useState({});
const [inStockOnly, setInStockOnly] = useState(false);

const normalize = (v) =>
  v?.toString().trim().toUpperCase().replace(/\s+/g, "");

  /* ---------------- FETCH PRODUCTS ---------------- */
  useEffect(() => {
    fetchProducts();
  }, [slug, selectedBrands, priceRange, sortBy]);

 const filteredProducts = products.filter((product) => {

  for (const key in selectedFilters) {
    const selectedValues = selectedFilters[key];

    if (!selectedValues?.length) continue;

    const match = product.variants?.some((variant) =>
      selectedValues.includes(
        normalize(variant.attributes?.[key])
      )
    );

    if (!match) return false;
  }

  if (inStockOnly && !product.variants?.some(v => v.stock > 0)) {
    return false;
  }

  return true;
});


  const fetchProducts = async () => {
    const res = await getCollectionProductsApi(slug, {
      brand: selectedBrands.join(","),
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      sort: sortBy,
    });
    

    const fetchedProducts = res?.products || [];
    setProducts(fetchedProducts);

    // Extract unique brands (backend should ideally populate brand)
    const uniqueBrands = Array.from(
      new Set(fetchedProducts.map((p) => p.brand?._id))
    )
      .map((id) => fetchedProducts.find((p) => p.brand?._id === id)?.brand)
      .filter(Boolean);

    setBrands(uniqueBrands);
  };

  /* ---------------- FILTER HANDLERS ---------------- */
  const toggleBrand = (brandId) => {
    setSelectedBrands((prev) =>
      prev.includes(brandId)
        ? prev.filter((b) => b !== brandId)
        : [...prev, brandId]
    );
  };
const toggleDynamicFilter = (key, value) => {
  setSelectedFilters((prev) => {
    const current = prev[key] || [];

    const exists = current.includes(value);

    return {
      ...prev,
      [key]: exists
        ? current.filter((v) => v !== value)
        : [...current, value],
    };
  });
};

  const clearFilters = () => {
    setSelectedBrands([]);
    setPriceRange([0, 200000]);
    setSortBy("newest");
  };
const categoryName = slug?.replace(/-/g, " ");

const keys = getCategoryFilters(categoryName);

const dynamicFilters = buildFilterOptions(products, keys);


  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen bg-background">
      {/* HEADER */}
      <header className="sticky top-0 z-20 border-b bg-background/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-4 space-y-4">
          <Breadcrumb />

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight capitalize">
                {slug?.replace(/-/g, " ")}
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                
              </p>
            </div>

            {/* SORT */}
            {!isMobile && (
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">
                    Price: Low → High
                  </SelectItem>
                  <SelectItem value="price-high">
                    Price: High → Low
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>
        </div>
      </header>
 <section className="w-full flex justify-center ">
      <PromoBanner data={promoData} />
    </section>
      {/* BODY */}
      <main className="max-w-7xl mx-auto px-4 py-8 flex gap-8">
        {/* DESKTOP FILTER */}
        {!isMobile && (
          <aside className="w-64 shrink-0">
            <Card className="p-6 sticky top-24 bg-card/80 backdrop-blur border-border/60">
             <FiltersPanel
  priceRange={priceRange}
  setPriceRange={setPriceRange}
  brands={brands}
  selectedBrands={selectedBrands}
  toggleBrand={toggleBrand}

  dynamicFilters={dynamicFilters}
  selectedFilters={selectedFilters}
  toggleDynamicFilter={toggleDynamicFilter}

  inStockOnly={inStockOnly}
  setInStockOnly={setInStockOnly}
/>

            </Card>
          </aside>
        )}

{/* PRODUCTS */}
<section className="flex-1 space-y-6">

  {/* HERO BAR */}
  <CollectionHeroBar
    total={products.length}
    selectedBrands={selectedBrands}
    onClear={clearFilters}
  />

  {/* MOBILE FILTER */}
  {isMobile && (
    <div className="flex justify-between items-center">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="flex gap-2">
            <Menu size={16} />
            Filters
          </Button>
        </SheetTrigger>

        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>

          <div className="mt-6">
          <FiltersPanel
  priceRange={priceRange}
  setPriceRange={setPriceRange}
  brands={brands}
  selectedBrands={selectedBrands}
  toggleBrand={toggleBrand}

  dynamicFilters={dynamicFilters}
  selectedFilters={selectedFilters}
  toggleDynamicFilter={toggleDynamicFilter}

  inStockOnly={inStockOnly}
  setInStockOnly={setInStockOnly}
/>

          </div>
        </SheetContent>
      </Sheet>

      <Select value={sortBy} onValueChange={setSortBy}>
        <SelectTrigger className="w-40">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">Newest</SelectItem>
          <SelectItem value="price-low">Price: Low → High</SelectItem>
          <SelectItem value="price-high">Price: High → Low</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )}

  {/* PRODUCT GRID */}
  {products.length > 0 ? (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filteredProducts.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <p className="text-sm text-muted-foreground max-w-sm">
        We couldn’t find products matching your filters.
        Try adjusting your selection.
      </p>
      <Button
        variant="outline"
        className="mt-6"
        onClick={clearFilters}
      >
        Clear Filters
      </Button>
    </div>
  )}
</section>

      </main>
    </div>
  );
}
