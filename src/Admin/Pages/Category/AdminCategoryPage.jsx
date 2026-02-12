"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/Components/ui/button";
import { Plus } from "lucide-react";

import AdminSidebar from "@/Admin/Layout/Sidebar/AdminSidebarLayout";
import AdminHeader from "@/Admin/Components/Header/AdminHeader";

import CategoryList from "@/Admin/Components/Categories/CategoryList";
import CreateCategoryModal from "@/Admin/Components/Categories/CreateCategoryModal";
import EditCategoryModal from "@/Admin/Components/Categories/EditCategoryModal";

import {
  getCategoriesApi,
  toggleCategoryStatusApi,
} from "@/API/adminApi";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [selectedParent, setSelectedParent] = useState("all");
const [selectedSub, setSelectedSub] = useState("all");

  const [loadingIds, setLoadingIds] = useState(new Set());

  const loadCategories = async () => {
    try {
      const data = await getCategoriesApi();
      setCategories(data?.categories ?? []);
    } catch (err) {
      toast.error("Failed to load categories");
    }
  };
 const parentCategories = categories.filter(
  (c) => !c.parentCategory
);

const subCategories = categories.filter(
  (c) => c.parentCategory?._id === selectedParent
);

const filteredCategories = categories.filter((cat) => {
  // Parent selected
  if (selectedParent !== "all") {
    const isParent = cat._id === selectedParent;
    const isChild = cat.parentCategory?._id === selectedParent;

    if (!isParent && !isChild) return false;
  }

  // Sub-category selected
  if (selectedSub !== "all") {
    return cat._id === selectedSub;
  }

  return true;
});



  useEffect(() => {
    loadCategories();
  }, []);

  const handleToggleStatus = async (cat) => {
    const id = cat._id;
    const newStatus = !cat.isActive;

    setCategories((prev) =>
      prev.map((c) =>
        c._id === id ? { ...c, isActive: newStatus } : c
      )
    );

    setLoadingIds((s) => new Set(s).add(id));

    try {
      await toggleCategoryStatusApi(id);
      toast.success(
        newStatus ? `${cat.name} listed` : `${cat.name} blocked`
      );
    } catch {
      toast.error("Failed to update category");
    } finally {
      setLoadingIds((s) => {
        const next = new Set(s);
        next.delete(id);
        return next;
      });
    }
  };

  const handleEdit = (cat) => {
    setModalOpen(false);
    setEditing(cat);
  };

  const handleUpdatedCategory = (updated) => {
    setCategories((prev) =>
      prev.map((c) => (c._id === updated._id ? updated : c))
    );
    setEditing(null);
    toast.success("Category updated");
  };

  return (
    <>
      <AdminSidebar />

      <div className="lg:ml-[260px] min-h-screen">
        <AdminHeader title="Categories" />

        {/* Header actions */}
        <div className="px-6 pt-6 flex justify-end">
          <Button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Create Category
          </Button>
        </div>

        <main className="px-6 py-6">
          {/* Filters */}
<div className="mb-6 space-y-4 rounded-xl border p-4">

  {/* Parent categories */}
  <div className="flex flex-wrap gap-3">
    <button
      onClick={() => {
        setSelectedParent("all");
        setSelectedSub("all");
      }}
      className={`px-4 py-1.5 rounded-full text-sm
        ${selectedParent === "all" ? "bg-primary text-white" : "bg-muted"}
      `}
    >
      All
    </button>

    {parentCategories.map(cat => (
      <button
        key={cat._id}
        onClick={() => {
          setSelectedParent(cat._id);
          setSelectedSub("all");
        }}
        className={`px-4 py-1.5 rounded-full text-sm
          ${selectedParent === cat._id ? "bg-primary text-white" : "bg-muted"}
        `}
      >
        {cat.name}
      </button>
    ))}
  </div>

  {/* Sub categories */}
  {selectedParent !== "all" && subCategories.length > 0 && (
    <div className="flex flex-wrap gap-2 pt-3 border-t">
      {subCategories.map(sub => (
        <button
          key={sub._id}
          onClick={() => setSelectedSub(sub._id)}
          className={`px-3 py-1 rounded-full text-xs
            ${selectedSub === sub._id ? "bg-foreground text-background" : "bg-muted"}
          `}
        >
          {sub.name}
        </button>
      ))}
    </div>
  )}
</div>


         <CategoryList
  categories={filteredCategories}   // ✅ USE FILTERED DATA
  onEdit={handleEdit}
  onToggleStatus={handleToggleStatus}
  loadingIds={loadingIds}
/>

        </main>
      </div>

      
      <CreateCategoryModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreated={(c) => {
          setCategories((prev) => [c, ...prev]);
          toast.success("Category created");
        }}
      />

      <EditCategoryModal
        open={!!editing}
        category={editing}
        onClose={() => setEditing(null)}
        onUpdated={handleUpdatedCategory}
      />
    </>
  );
}
