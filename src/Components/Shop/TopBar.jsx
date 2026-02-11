"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ShopTopBar({
  resultCount,
  sortBy,
  setSortBy,
}) {
  return (
    <div className="border-b border-[#E4E4E4] bg-[#FFFFFF] sticky top-0 z-40">
      <div className="px-4 md:px-8 lg:px-16 py-4">
        {/* Breadcrumbs */}
        <div className="mb-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/home"
                  className="text-[#121212]/60 hover:text-[#121212]"
                >
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-[#121212] font-medium">
                  Shop
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Result Count & Sort */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <p className="text-sm text-[#121212]/70">
              Showing{" "}
              <span className="font-medium text-[#121212]">
                {resultCount}
              </span>{" "}
              results
            </p>
          </div>

          <div className="flex items-center gap-">
            <span className="text-sm text-[#121212]/70">Sort by:</span>
            <Select
              value={sortBy}
              onValueChange={(val) => setSortBy(val)}
            >
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="price-low-high">
                  Price: Low to High
                </SelectItem>
                <SelectItem value="price-high-low">
                  Price: High to Low
                </SelectItem>
                <SelectItem value="new">New Arrivals</SelectItem>
                <SelectItem value="best-seller">Best Sellers</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
