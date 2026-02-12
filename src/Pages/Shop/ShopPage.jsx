"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

/* UI */
import ShopTopBar from "@/Components/Shop/TopBar";
import FilterSidebar from "@/Layout/Shop/FilterLayout";
import ProductGrid from "@/Layout/Products/ProductGridShop";
import ShopPagination from "@/Components/Shop/ShopPagination";

import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet";
import { Button } from "@/Components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import HeaderLayout from "@/Layout/Header/HeaderLayout";
/* API */
import {
  getShopProducts,
  getShopCategories
} from "@/API/userAPI";

/* ---------------- PAGE ---------------- */

export default function ShopPage() {
  /* ---------------- URL PARAMS ---------------- */
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";


  /* ---------------- DATA STATES ---------------- */
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* ---------------- FILTER STATES ---------------- */
  const [filters, setFilters] = useState({
    category: null,
    subcategory: null,
    gender: [],
    priceRange: [0, 1000000],
    showCustomPrice:false,
    vendors: [],
    inStock: false,
  });

  const [sortBy, setSortBy] = useState("new");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const itemsPerPage = 12;

  /* ---------------- READ FILTERS FROM URL (ON LOAD) ---------------- */
  useEffect(() => {
    const category = searchParams.get("category");
    const subcategory = searchParams.get("subcategory");
    const sort = searchParams.get("sort");
    const page = Number(searchParams.get("page")) || 1;

    setFilters((prev) => ({
      ...prev,
      ...(category ? { category } : {}),
      ...(subcategory ? { subcategory } : {}),
    }));

    if (sort) setSortBy(sort);
    setCurrentPage(page);
  }, []);

  /* ---------------- FETCH PRODUCTS (BACKEND DRIVEN) ---------------- */
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);

        const res = await getShopProducts({
          search:searchQuery,
          category: filters.category,
          subcategory: filters.subcategory,
          gender: filters.gender,
          minPrice: filters.priceRange[0],
          maxPrice: filters.priceRange[1],
          inStock: filters.inStock,
          sort: sortBy,
          page: currentPage,
          limit: itemsPerPage,
        });

        if (res?.success) {
          setProducts(res.products || []);
          setTotalPages(res.meta?.pages || 1);
        } else {
          setError("Failed to load products");
        }
      } catch (err) {
        console.error("Shop products error:", err);
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [filters, sortBy, currentPage,searchQuery]);

  /* ---------------- SYNC FILTERS TO URL ---------------- */
  useEffect(() => {
    const params = {};

    if (searchQuery) params.search = searchQuery;
    if (filters.category) params.category = filters.category;
    if (filters.subcategory) params.subcategory = filters.subcategory;
    if (sortBy) params.sort = sortBy;
    if (currentPage > 1) params.page = currentPage;

    setSearchParams(params);
  }, [filters, sortBy, currentPage,searchQuery]);

  /* ---------------- FETCH CATEGORIES ---------------- */
 /* ---------------- FETCH CATEGORIES (SHOP READY) ---------------- */
useEffect(() => {
  async function fetchCategories() {
    try {
      const res = await getShopCategories();
      if (!res?.success) return;

      // 🚀 DIRECTLY USE BACKEND-FORMATTED DATA
      setCategories(res.categories);
    } catch (err) {
      console.error("Category fetch error:", err);
    }
  }

  fetchCategories();
}, []);

  /* ---------------- SAFE FILTER UPDATE ---------------- */
  const updateFilters = (partial) => {
    setCurrentPage(1);
    setFilters((prev) => ({
      ...prev,
      ...partial,
    }));
  };

  /* ---------------- FILTER SIDEBAR ---------------- */
  const filterSidebar = (
    <FilterSidebar
      filters={filters}
      setFilters={updateFilters}
      categories={categories}
      vendors={[]}
    />
  );

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      <HeaderLayout/>
      <ShopTopBar
        resultCount={products.length}
        sortBy={sortBy}
        setSortBy={(val) => {
          setCurrentPage(1);
          setSortBy(val);
        }}
      />

      <div className="flex gap-6 px-4 md:px-8 lg:px-16 py-8">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 shrink-0 sticky top-8 self-start">
          {filterSidebar}
        </aside>

        {/* Mobile Filters */}
        <div className="lg:hidden fixed bottom-6 right-6 z-50">
          <Sheet>
            <SheetTrigger asChild>
              <Button className="rounded-full bg-[#1A1A1A] hover:bg-[#121212]">
                <SlidersHorizontal className="mr-2" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 overflow-y-auto">
              {filterSidebar}
            </SheetContent>
          </Sheet>
        </div>

        {/* Products */}
        <main className="flex-1 min-w-0">
          {loading && (
            <p className="text-center py-24 text-muted-foreground">
              Loading products...
            </p>
          )}

          {error && (
            <p className="text-center py-24 text-red-500">
              {error}
            </p>
          )}

          {!loading && !error && (
            <>
              <ProductGrid products={products} />

              {totalPages > 1 && (
                <ShopPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
