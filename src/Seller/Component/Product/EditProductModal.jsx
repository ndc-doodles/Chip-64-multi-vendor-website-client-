"use client";

import React, { useEffect, useState } from "react";
import {
  Plus,
  X,
  Upload,
  ImagePlus,
  Package,
  Tag,
  DollarSign,
  Layers,
} from "lucide-react";
import { toast } from "sonner";
import {
  updateVendorProductApi,
} from "@/API/vendorApi";
import { getCategoriesApi } from "@/API/adminApi";
import { getVendorBrandsApi } from "@/API/vendorApi";
import BrandRequestModal from "../Brand/BrandRequestModal";
const COLOR_OPTIONS = ["Black", "White", "Grey", "Silver", "Blue", "Red", "Green"];



const CATEGORY_DEFAULT_ATTRIBUTES = {
  mobile: [
    { key: "Color", value: "" },
    { key: "Storage", value: "" },
    { key: "RAM", value: "" },
  ],

  laptop: [
    { key: "Color", value: "" },
    { key: "Processor", value: "" },
    { key: "RAM", value: "" },
    { key: "Storage", value: "" },
    { key: "Storage Type", value: "" },
    { key: "Graphics", value: "" },
    { key: "Display Size", value: "" },
    { key: "Operating System", value: "" },
  ],
  cctv: [
    { key: "Camera Type", value: "" },
    { key: "Resolution", value: "" },
    { key: "Lens", value: "" },
    { key: "Night Vision", value: "" },
    { key: "Connectivity", value: "" },
    { key: "Usage", value: "" },
  ],

  cpu: [
    { key: "Brand", value: "" },            // Intel / AMD
    { key: "Series", value: "" },           // Core i5 / Ryzen 5
    { key: "Model", value: "" },            // i5-12400 / Ryzen 5600X
    { key: "Generation", value: "" },       // 12th Gen / Zen 3
    { key: "Cores", value: "" },             // 6 / 8 / 12
    { key: "Threads", value: "" },           // 12 / 16
    { key: "Base Clock", value: "" },        // 2.5 GHz
    { key: "Max Boost Clock", value: "" },   // 4.4 GHz
  ],
  printer: [
    { key: "Printer Type", value: "" },     // Inkjet / Laser / Dot Matrix
    { key: "Function", value: "" },         // Single / All-in-One
    { key: "Color Support", value: "" },    // Color / Monochrome
    { key: "Print Technology", value: "" }, // Inkjet / Laser
    { key: "Max Print Resolution", value: "" }, // 1200×1200 dpi
  ],
  pc: [
    { key: "Processor", value: "" },
    { key: "RAM Size", value: "" },
    { key: "Storage", value: "" },
    { key: "Graphics", value: "" },
    { key: "Operating System", value: "" },
  ],



  chair: [
    { key: "Color", value: "" },
  ],
};

const createVariantByCategory = (categorySlug) => {
  const attrs =
    CATEGORY_DEFAULT_ATTRIBUTES[categorySlug] ??
    [{ key: "Color", value: "" }];

  return {
    sku: "",
    price: "",
    stock: 0,
    attributes: attrs.map((a) => ({
      key: a.key,
      value: "",
    })),
    imageFiles: [],
    imagePreviews: [],
    removedImages: [],
  };
};

export default function EditProductModal({
  open,
  onClose,
  product,
  onUpdated,
}) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    basePrice: "",
    category: "",
    tags: "",
    isActive: true,
    brand: "",        // ✅ ADD

  });


  const [categories, setCategories] = useState([]);
  const [mainImage, setMainImage] = useState(null);
  const [mainPreview, setMainPreview] = useState("");
  const [variants, setVariants] = useState([]);

  const [brands, setBrands] = useState([]);
  const [openBrandRequest, setOpenBrandRequest] = useState(false);
  const [prevCategory, setPrevCategory] = useState(null);


  const [loading, setLoading] = useState(false);

  /* ---------------- LOAD DATA ---------------- */

  useEffect(() => {
    if (!open) return;
    getCategoriesApi().then((res) =>
      setCategories(res.categories || [])
    );
  }, [open]);
  useEffect(() => {
    if (!open) return;

    getVendorBrandsApi().then((res) => {
      setBrands(res.brands || []);
    });
  }, [open]);
  useEffect(() => {
    if (!form.category) return;

    // find category object
    const categoryObj = categories.find(
      (c) => c._id === form.category
    );

    if (!categoryObj) return;

    // prevent reset on first load
    if (!prevCategory) {
      setPrevCategory(form.category);
      return;
    }

    // only reset if category actually changed
    if (prevCategory !== form.category) {
      const slug = categoryObj.slug;

      setVariants([createVariantByCategory(slug)]);
      setPrevCategory(form.category);
    }
  }, [form.category, categories]);

  useEffect(() => {
    if (!open || !product) return;

    setForm({
      name: product.name || "",
      description: product.description || "",
      basePrice: product.basePrice || "",
      category: product.category?._id || "",
      tags: (product.tags || []).join(", "),
      isActive: product.isActive ?? true,
      brand: typeof product.brand === "string"
        ? product.brand
        : product.brand?._id || "",      // ✅ ADD

    });
    console.log(product)

    setMainPreview(product.mainImage || "");
    setMainImage(null);

    setVariants(
      product.variants?.length
        ? product.variants.map((v) => ({
          sku: v.sku || "",
          price: v.price || "",
          stock: v.stock || 0,
          attributes: Object.entries(v.attributes || {}).map(
            ([k, val]) => ({ key: k, value: val })
          ),
          imageFiles: [],
          imagePreviews: (v.images || []).map((url) => ({ url })),
          removedImages: [],
        }))
        : product.category?.slug
          ? [createVariantByCategory(product.category.slug)]
          : []
    );
  }, [open, product]);

  useEffect(() => {
    if (!mainImage) return;
    const url = URL.createObjectURL(mainImage);
    setMainPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [mainImage]);

  /* ---------------- HELPERS ---------------- */

  const addVariant = () => {
    if (!form.category) {
      toast.error("Select category first");
      return;
    }

    const categoryObj = categories.find(
      (c) => c._id === form.category
    );

    if (!categoryObj?.slug) {
      toast.error("Category slug missing");
      return;
    }

    setVariants((prev) => [
      ...prev,
      createVariantByCategory(categoryObj.slug),
    ]);
  };

  const removeVariant = (idx) =>
    setVariants((v) => v.filter((_, i) => i !== idx));

  const updateVariant = (idx, patch) =>
    setVariants((v) =>
      v.map((item, i) => (i === idx ? { ...item, ...patch } : item))
    );
  const addAttribute = (vIdx) =>
    setVariants((v) =>
      v.map((item, i) =>
        i === vIdx ? { ...item, attributes: [...item.attributes, { key: "", value: "" }] } : item
      )
    );
  const updateAttribute = (vIdx, aIdx, patch) =>
    setVariants((v) =>
      v.map((item, i) =>
        i === vIdx
          ? {
            ...item,
            attributes: item.attributes.map((a, j) =>
              j === aIdx ? { ...a, ...patch } : a
            ),
          }
          : item
      )
    );
  const removeAttribute = (vIdx, aIdx) =>
    setVariants((v) =>
      v.map((item, i) =>
        i === vIdx
          ? {
            ...item,
            attributes: item.attributes.filter((_, j) => j !== aIdx),
          }
          : item
      )
    );
  const handleVariantImages = (vIdx, files) => {
    setVariants((prev) =>
      prev.map((v, i) => {
        if (i !== vIdx) return v;
        const remaining = 4 - v.imageFiles.length;
        const selected = Array.from(files).slice(0, remaining);
        return {
          ...v,
          imageFiles: [...v.imageFiles, ...selected],
          imagePreviews: [
            ...v.imagePreviews,
            ...selected.map((f) => ({ url: URL.createObjectURL(f) })),
          ],
        };
      })
    );
  };

  const removeVariantImage = (vIdx, imgIdx) =>
    setVariants((prev) =>
      prev.map((v, i) => {
        if (i !== vIdx) return v;

        const removed = v.imagePreviews[imgIdx];

        return {
          ...v,
          imageFiles: v.imageFiles.filter((_, j) => j !== imgIdx),
          imagePreviews: v.imagePreviews.filter((_, j) => j !== imgIdx),
          removedImages: removed?.url?.startsWith("http")
            ? [...v.removedImages, removed.url] // ✅ tell backend
            : v.removedImages,
        };
      })
    );


  /* ---------------- SUBMIT ---------------- */

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));

      if (mainImage) fd.append("mainImage", mainImage);

      fd.append(
        "variants",
        JSON.stringify(
          variants.map((v) => ({
            sku: v.sku,
            price: v.price || null,
            stock: Number(v.stock),
            removedImages: v.removedImages,
            imageCount: v.imageFiles.length, // ✅ THIS WAS MISSING
            attributes: Object.fromEntries(
              v.attributes.map((a) => [a.key, a.value])
            ),
          }))
        )
      );


      variants.forEach((v) =>
        v.imageFiles.forEach((f) => fd.append("variantImages", f))
      );

      const res = await updateVendorProductApi(product._id, fd);
      toast.success("Product updated");
      onUpdated?.(res.product);
      onClose();
    } catch (err) {
      const msg =
        err?.response?.data?.message || "Update failed";

      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  /* ============================ UI ============================ */

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex justify-center items-start px-4 py-8 overflow-y-auto">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl border-2 border-gray-200"
      >
        {/* HEADER */}
        <div className="px-8 py-6 bg-black rounded-t-3xl flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Package className="text-white" size={20} />
            </div>
            <h2 className="text-2xl font-bold text-white">
              Edit Product
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-white/20 text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* BODY */}
        <div className="p-8 space-y-12 max-h-[calc(100vh-200px)] overflow-y-auto">

          {/* BASIC INFO */}
          <section className="space-y-6">
            <div className="flex items-center gap-2 border-b pb-2">
              <Tag className="text-blue-600" size={20} />
              <h3 className="text-lg font-bold">Basic Information</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {["name", "basePrice", "tags"].map((key) => (
                <input
                  key={key}
                  className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-4 focus:ring-blue-100 outline-none"
                  placeholder={key.toUpperCase()}
                  value={form[key]}
                  onChange={(e) =>
                    setForm({ ...form, [key]: e.target.value })
                  }
                />
              ))}

              <textarea
                rows={4}
                className="md:col-span-2 px-4 py-3 rounded-xl border-2 border-gray-200 resize-none"
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold">Main Image</label>

              {mainPreview && (
                <img
                  src={mainPreview}
                  alt="Main"
                  className="w-40 h-40 object-cover rounded-xl border"
                />
              )}

              <input
                type="file"
                accept="image/*"
                onChange={(e) => setMainImage(e.target.files[0])}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Layers size={16} className="text-purple-600" />
                Category
              </label>

              <select
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none font-medium bg-white"
                value={form.category}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, category: e.target.value }))
                }
              >
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Tag size={16} className="text-orange-600" />
                Brand
              </label>

              <select
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all outline-none font-medium bg-white"
                value={form.brand}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, brand: e.target.value }))
                }
              >
                <option value="">Select Brand</option>
                {brands.map((b) => (
                  <option key={b._id} value={b._id}>
                    {b.name}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={() => setOpenBrandRequest(true)}
                className="text-sm text-blue-600 hover:text-blue-700 font-semibold underline"
              >
                Can't find your brand? Request brand
              </button>
            </div>

          </section>
          <BrandRequestModal
            open={openBrandRequest}
            onClose={() => setOpenBrandRequest(false)}
            onSuccess={(newBrand) => {
              setBrands((prev) => [...prev, newBrand]);
              setForm((prev) => ({ ...prev, brand: newBrand._id }));
              setOpenBrandRequest(false);
            }}
          />
          {/* VARIANTS */}
          <section className="space-y-6">
            <div className="flex justify-between items-center border-b pb-2">
              <div className="flex items-center gap-2">
                <Layers className="text-purple-600" size={20} />
                <h3 className="text-lg font-bold">Variants</h3>
              </div>
              <button
                type="button"
                onClick={addVariant}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl"
              >
                <Plus size={18} /> Add Variant
              </button>
            </div>
            <div className="space-y-6 max-h-[420px] overflow-y-auto pr-2">
              {variants.map((v, i) => (
                <div
                  key={i}
                  className="rounded-2xl border-2 border-gray-200 p-6 bg-gradient-to-br from-white to-gray-50"
                >
                  <div className="flex justify-between mb-4">
                    <span className="font-bold">Variant {i + 1}</span>
                    {variants.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeVariant(i)}
                        className="text-red-600 font-semibold"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <select
                    className="w-full px-4 py-3 rounded-xl border-2 mb-4"
                    value={v.attributes[0].value}
                    onChange={(e) =>
                      updateAttribute(i, 0, { value: e.target.value })
                    }
                  >
                    <option value="">Select Color</option>
                    {COLOR_OPTIONS.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                  <div className="space-y-4 mt-6">
                    <label className="text-sm font-bold text-gray-700">
                      Attributes
                    </label>





                    {/* OTHER ATTRIBUTES */}
                    {v.attributes.slice(1).map((a, idx) => (
                      <div
                        key={idx}
                        className="grid gap-3 grid-cols-1 md:grid-cols-[1fr_1fr_auto]"
                      >
                        <input
                          className="px-4 py-3 rounded-xl border-2"
                          placeholder="Attribute name (eg: RAM)"
                          value={a.key}
                          onChange={(e) =>
                            updateAttribute(i, idx + 1, {
                              key: e.target.value,
                            })
                          }
                        />

                        <input
                          className="px-4 py-3 rounded-xl border-2"
                          placeholder="Value (eg: 8 GB)"
                          value={a.value}
                          onChange={(e) =>
                            updateAttribute(i, idx + 1, {
                              value: e.target.value,
                            })
                          }
                        />

                        <button
                          type="button"
                          onClick={() =>
                            removeAttribute(i, idx + 1)
                          }
                          className="w-12 h-12 bg-red-100 text-red-600 rounded-xl font-bold"
                        >
                          ×
                        </button>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() => addAttribute(i)}
                      className="px-4 py-2 bg-gray-200 rounded-xl text-sm font-semibold"
                    >
                      + Add Attribute
                    </button>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {["stock", "price", "sku"].map((key) => (
                      <input
                        key={key}
                        className="px-4 py-3 rounded-xl border-2"
                        placeholder={key.toUpperCase()}
                        value={v[key]}
                        onChange={(e) =>
                          updateVariant(i, { [key]: e.target.value })
                        }
                      />
                    ))}
                    <div className="mt-6 space-y-2">
                      <label className="text-sm font-bold">Variant Images</label>
<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4 mt-4
">
  {v.imagePreviews.map((img, idx) => (
    <div
      key={idx}
      className="relative rounded-xl overflow-hidden border-2 border-gray-200 group aspect-square"
    >
      <img
        src={img.url}
        className="w-full h-full object-cover"
        alt={`Variant ${idx}`}
      />

      <button
        type="button"
        onClick={() => removeVariantImage(i, idx)}
        className="absolute top-2 right-2 bg-red-500 text-white rounded-full 
                   w-8 h-8 flex items-center justify-center text-lg font-bold
                   opacity-0 group-hover:opacity-100 transition-all 
                   hover:scale-110 shadow-lg"
      >
        ×
      </button>
    </div>
  ))}
</div>

<label className="px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white 
                  rounded-xl font-semibold inline-flex items-center gap-2 
                  cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200">
  <ImagePlus size={18} /> Upload Images
  <input
    type="file"
    hidden
    multiple
    accept="image/*"
    onChange={(e) => handleVariantImages(i, e.target.files)}
  />
</label>

                    </div>

                  </div>
                  {/* ATTRIBUTES */}


                </div>
              ))}
              </div>
          </section>
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-4 px-8 py-6 border-t bg-gray-50 rounded-b-3xl">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 border-2 rounded-xl"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
