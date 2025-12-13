// src/Pages/ProductsPage.jsx
import React, { useEffect, useState } from "react";
import AdminSidebar from "../Component/Common/AdminSidebar";
import { getProductsApi,toggleProductApi } from "@/API/adminApi";
import CreateProductModal from "../Component/Product/CreateProductModal";
import EditProductModal from "../Component/Product/EditProductModal";
import ProductList from "../Component/Product/ProductList";
import { toast } from "sonner";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [loadingIds, setLoadingIds] = useState(new Set());

  const loadProducts = async () => {
    try {
      const data = await getProductsApi();
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
      await toggleProductApi(id);
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
      <AdminSidebar
        activeItem="products"
        onNavigate={() => {}}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1">
        <header className="w-full px-6 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-serif tracking-tight">Products</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage products for Leather Haven</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCreateOpen(true)}
              className="rounded-md px-4 py-2 bg-primary text-primary-foreground font-medium shadow-sm hover:opacity-95"
            >
              + Create product
            </button>
            <button
              onClick={loadProducts}
              className="px-3 py-1 rounded-md border border-border text-sm text-muted-foreground hover:bg-card/60"
            >
              Refresh
            </button>
          </div>
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

      <CreateProductModal open={createOpen} onClose={() => setCreateOpen(false)} onCreated={handleCreated} />

      <EditProductModal open={!!editing} product={editing} onClose={() => setEditing(null)} onUpdated={handleUpdated} />
    </div>
  );
}
