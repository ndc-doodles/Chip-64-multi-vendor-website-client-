// src/Pages/ProductsPage.jsx
import React, { useEffect, useState } from "react";
import VendorSidebar from "../Component/Common/VendorSidebar";
import { getVendorProductsApi,createVendorProductApi } from "@/API/vendorApi";
import CreateProductModal from "../Component/Product/CreateProductModal";
import EditProductModal from "../Component/Product/EditProductModal";
import ProductList from "../Component/Product/ProductList";
import { toast } from "sonner";
import { toggleVendorProductApi } from "@/API/vendorApi";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [loadingIds, setLoadingIds] = useState(new Set());

  const loadProducts = async () => {
    try {
      const data = await getVendorProductsApi();
      setProducts(data?.products ?? []);
    } catch (err) {
      console.error("Failed to load products", err);
      toast.error("Failed to load products");
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleCreated = (p) => {
    setProducts((prev) => [p, ...prev]);
    toast.success("Product created");
  };

  const handleEditOpen = (product) => {
    setEditing(product);
  };

  const handleUpdated = (updated) => {
    setProducts((prev) => prev.map((p) => (p._id === updated._id ? updated : p)));
    setEditing(null);
    toast.success("Product updated");
  };

  const handleToggle = async (product) => {
    const id = product._id;
    const newStatus = !product.isActive;
    // optimistic UI
    setProducts((prev) => prev.map((p) => (p._id === id ? { ...p, isActive: newStatus } : p)));
    setLoadingIds((s) => new Set(s).add(id));
    try {
      await toggleVendorProductApi(id);
      toast.success(newStatus ? "Product listed" : "Product unlisted");
    } catch (err) {
      console.error("toggle error:", err);
      toast.error(err?.response?.data?.message || "Failed to update status");
      // revert
      setProducts((prev) => prev.map((p) => (p._id === id ? { ...p, isActive: product.isActive } : p)));
    } finally {
      setLoadingIds((s) => {
        const next = new Set(s);
        next.delete(id);
        return next;
      });
    }
  };


  return (
    <div className="min-h-screen flex bg-background text-foreground">
      <VendorSidebar
        activeItem="products"
        onNavigate={() => {}}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      

      <div className="flex-1">
       <header className="w-full px-6 py-6 flex items-center justify-between">
  <div className="flex items-center gap-3">

    {/* MOBILE MENU BUTTON */}
    <button
      onClick={() => setSidebarOpen(true)}
      className="md:hidden p-2 rounded-lg hover:bg-muted"
    >
      ☰
    </button>

    <div>
      <h1 className="text-3xl tracking-tight text-green-600">Products</h1>
      <p className="text-sm text-muted-foreground mt-1">
        Manage products for CHIP
      </p>
    </div>
  </div>

  <button
    onClick={() => setCreateOpen(true)}
    className="rounded-md   px-2 py-1 md:px-4 md:py-2 bg-primary text-primary-foreground"
  >
    + Create product
  </button>
</header>


        <main className="w-full px-6 pb-12">
          <ProductList
            products={products}
            onEdit={handleEditOpen}
            onToggle={handleToggle}
            loadingIds={loadingIds}
            onRefresh={loadProducts}
          />
        </main>
      </div>

     <CreateProductModal
  open={createOpen}

  onClose={() => setCreateOpen(false)}
 onSubmit={async ({ form, mainImage, variants }) => {
  try {
    const fd = new FormData();

    // ---------- BASIC FIELDS ----------
    fd.append("name", form.name);
    fd.append("description", form.description);
    fd.append("basePrice", form.basePrice);
    fd.append("category", form.category);
    fd.append("tags", form.tags);
    fd.append("isActive", form.isActive);
    fd.append("brand",form.brand)

    // ---------- MAIN IMAGE ----------
    fd.append("mainImage", mainImage);

    // ---------- VARIANTS JSON (NO IMAGES HERE) ----------
    fd.append(
      "variants",
      JSON.stringify(
        variants.map((v) => ({
          sku: v.sku,
          price: v.price || null,
          stock: Number(v.stock),
          imageCount: v.imageFiles.length, // 🔑 IMPORTANT
          attributes: Object.fromEntries(
            v.attributes.map((a) => [a.key, a.value])
          ),
        }))
      )
    );

    // ---------- VARIANT IMAGES (ORDER MATTERS) ----------
    variants.forEach((variant) => {
      variant.imageFiles.forEach((file) => {
        fd.append("variantImages", file);
      });
    });

    const res = await createVendorProductApi(fd);

    handleCreated(res.product);
    setCreateOpen(false);
  } catch (err) {
    toast.error(err?.response?.data?.message || "Create failed");
  }
}}

/>

      <EditProductModal open={!!editing} product={editing} onClose={() => setEditing(null)} onUpdated={handleUpdated} />
    </div>
  );
}
