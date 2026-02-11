import React, { useEffect, useState } from "react";
import { createCategoryApi,getCategoriesApi } from "@/API/adminApi";

export default function CreateCategoryModal({ open, onClose, onCreated }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    isActive: true,
    parentCategory: "",
  });

  const [categoryType, setCategoryType] = useState("parent"); // parent | child
  const [parentCategories, setParentCategories] = useState([]);

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load parent categories
  useEffect(() => {
    if (!open) return;

    getCategoriesApi().then((res) => {
      const parents = (res.categories || []).filter(
        (c) => !c.parentCategory
      );
      setParentCategories(parents);
    });
  }, [open]);

  // Reset on close
  useEffect(() => {
    if (!open) {
      setForm({
        name: "",
        description: "",
        isActive: true,
        parentCategory: "",
      });
      setCategoryType("parent");
      setImageFile(null);
      setPreview("");
      setError("");
    }
  }, [open]);

  // Image preview
  useEffect(() => {
    if (!imageFile) {
      setPreview("");
      return;
    }
    const url = URL.createObjectURL(imageFile);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      setError("Name is required");
      return;
    }

    if (categoryType === "child" && !form.parentCategory) {
      setError("Please select a parent category");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const fd = new FormData();
      fd.append("name", form.name.trim());
      fd.append("description", form.description || "");
      fd.append("isActive", form.isActive ? "true" : "false");

      if (categoryType === "child") {
        fd.append("parentCategory", form.parentCategory);
      }

      // ✅ image only for parent category
      if (categoryType === "parent" && imageFile) {
        fd.append("image", imageFile);
      }

      const res = await createCategoryApi(fd);
      onCreated?.(res.category || res);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create category");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 overflow-y-auto">
  <div className="flex justify-center pt-8 px-4">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl rounded-2xl bg-card border border-border shadow-xl p-6"
      >
        {/* Header */}
        <header className="mb-6">
          <h3 className="text-xl font-serif">Create Category</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Parent categories can have images. Sub categories are text-only.
          </p>
        </header>

        {/* Category Type */}
        <div className="flex gap-6 mb-6">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              checked={categoryType === "parent"}
              onChange={() => setCategoryType("parent")}
            />
            Parent Category
          </label>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              checked={categoryType === "child"}
              onChange={() => setCategoryType("child")}
            />
            Sub Category
          </label>
        </div>

        {/* Parent Selector */}
        {categoryType === "child" && (
          <div className="mb-5">
            <label className="text-xs uppercase text-muted-foreground">
              Parent Category
            </label>
            <select
              name="parentCategory"
              value={form.parentCategory}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-border/60 px-3 py-2 bg-background"
            >
              <option value="">Select parent</option>
              {parentCategories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Name */}
        <div className="mb-5">
          <label className="text-xs uppercase text-muted-foreground">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-border/60 px-3 py-2 bg-background"
          />
        </div>

        {/* ✅ Image ONLY for Parent */}
        {/* ✅ Image ONLY for Parent Category */}
{categoryType === "parent" && (
  <div className="mb-6">
    <label className="block text-xs uppercase tracking-wide text-muted-foreground mb-2">
      Category Image
    </label>

    <div className="flex gap-4 items-start">
      {/* Upload */}
      <div className="flex-1">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            setImageFile(file);
            setPreview(URL.createObjectURL(file));
          }}
          className="block w-full text-sm file:mr-4 file:py-2 file:px-4
                     file:rounded-md file:border-0
                     file:bg-muted/40 file:text-foreground
                     hover:file:bg-muted/60"
        />

        <p className="mt-1 text-xs text-muted-foreground">
          Recommended: square image, minimum 600×600
        </p>
      </div>

      {/* Preview */}
      <div className="w-40 shrink-0">
        <div className="relative w-full aspect-square rounded-lg border border-border overflow-hidden bg-background">
          {preview ? (
            <img
              src={preview}
              alt="Category preview"
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-xs text-muted-foreground">
              No image
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
)}


        {/* Description */}
        <div className="mb-5">
          <label className="text-xs uppercase text-muted-foreground">
            Description
          </label>
          <textarea
            rows={4}
            name="description"
            value={form.description}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-border/60 px-3 py-2 bg-background"
          />
        </div>

        {/* Error */}
        {error && (
          <p className="mb-4 text-sm text-destructive">{error}</p>
        )}

        {/* Footer */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2 rounded-md bg-primary text-primary-foreground"
          >
            {loading ? "Creating..." : "Create Category"}
          </button>
        </div>
      </form>
    </div>
    </div>
  );
}
