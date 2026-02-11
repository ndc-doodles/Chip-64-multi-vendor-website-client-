import React, { useEffect, useState } from "react";
import { Plus, X, Upload, ImagePlus, Package, Tag, DollarSign, Layers } from "lucide-react";
import { getCategoriesApi } from "@/API/adminApi";
import { getBrandsApi } from "@/API/adminApi";
import { getVendorBrandsApi } from "@/API/vendorApi";
import BrandRequestModal from "../Brand/BrandRequestModal";
/* Mock data for demonstration */

const COLOR_OPTIONS = [
  "Black",
  "White",
  "Grey",
  "Silver",
  "Blue",
  "Red",
  "Green",
];
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


const createVariantByCategory = (categorySlug) => ({
  sku: "",
  price: "",
  stock: 0,
  attributes: CATEGORY_DEFAULT_ATTRIBUTES[categorySlug] ?? [{ key: "Color", value: "" }],
  imageFiles: [],
  imagePreviews: [],
});

export default function CreateProductModal({ open = true, onClose = () => {}, onSubmit = () => {} }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    basePrice: "",
    parentCategory: "",
    category: "",
    brand: "",
    tags: "",
    isActive: true,
  });
const [categories, setCategories] = useState([]);
const [brands, setBrands] = useState([]);

  const [mainImage, setMainImage] = useState(null);
  const [mainPreview, setMainPreview] = useState("");
  const [variants, setVariants] = useState([createVariantByCategory("chair")]);
  const [openBrandRequest, setOpenBrandRequest] = useState(false);

  const parentCategories = categories.filter((c) => !c.parentCategory);
  const childCategories = categories.filter((c) => c.parentCategory?._id === form.parentCategory);

   useEffect(() => {
    if (!open) return;
    getCategoriesApi().then((res) => {
      setCategories(res.categories || []);
    });
  }, [open]);
  useEffect(() => {
  if (!open) return;

  getVendorBrandsApi().then((res) => {
    setBrands(res.brands || []);
  });
}, [open]);


  useEffect(() => {
    if (!open) {
      setForm({
        name: "",
        description: "",
        basePrice: "",
        category: "",
        tags: "",
        isActive: true,
        brand:""
      });
      setMainImage(null);
      setMainPreview("");
      setVariants([createVariantByCategory("chair")]);
    }
  }, [open]);

  useEffect(() => {
    if (!mainImage) return setMainPreview("");
    const url = URL.createObjectURL(mainImage);
    setMainPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [mainImage]);


  const addVariant = () => {
    const activeCategory = form.category || form.parentCategory;
    const category = categories.find((c) => c._id === activeCategory);
    if (!category) return;
    setVariants((v) => [...v, createVariantByCategory(category.slug)]);
  };

  const removeVariant = (idx) => setVariants((v) => v.filter((_, i) => i !== idx));

  const updateVariant = (idx, patch) =>
    setVariants((v) => v.map((item, i) => (i === idx ? { ...item, ...patch } : item)));

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
              attributes: item.attributes.map((a, j) => (j === aIdx ? { ...a, ...patch } : a)),
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
        URL.revokeObjectURL(v.imagePreviews[imgIdx]?.url);
        return {
          ...v,
          imageFiles: v.imageFiles.filter((_, j) => j !== imgIdx),
          imagePreviews: v.imagePreviews.filter((_, j) => j !== imgIdx),
        };
      })
    );

  const hasChildCategories = (parentId) => categories.some((c) => c.parentCategory?._id === parentId);

  const getAttributeSlug = (parent, child) => {
    if (parent?.slug === "pc") return "pc";
    return child?.slug || parent?.slug;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ form, mainImage, variants });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-black/60 via-black/50 to-black/60 backdrop-blur-md flex justify-center items-start overflow-y-auto px-4 py-8">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl border-2 border-gray-200">
        {/* HEADER */}
        <div className="px-8 py-6 bg-black rounded-t-3xl flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Package className="text-white" size={20} />
            </div>
            <h2 className="text-2xl font-bold text-white">Create New Product</h2>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="p-2 rounded-xl hover:bg-white/20 transition-all duration-200 text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* BODY */}
        <div className="p-8 space-y-10 max-h-[calc(100vh-200px)] overflow-y-auto">
          {/* BASIC INFO */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b-2 border-blue-100">
              <Package className="text-blue-600" size={20} />
              <h3 className="text-lg font-bold text-gray-800">Basic Information</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Tag size={16} className="text-blue-600" />
                  Product Name
                </label>
                <input
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none font-medium"
                  placeholder="Enter product name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <DollarSign size={16} className="text-green-600" />
                  Base Price
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all outline-none font-medium"
                  placeholder="₹ 0.00"
                  value={form.basePrice}
                  onChange={(e) => setForm({ ...form, basePrice: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Layers size={16} className="text-purple-600" />
                  Category
                </label>
                <select
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none font-medium bg-white"
                  value={form.parentCategory}
                  onChange={(e) => {
                    const parentId = e.target.value;
                    const parent = categories.find((c) => c._id === parentId);
                    const hasChildren = hasChildCategories(parentId);
                    setForm((prev) => ({
                      ...prev,
                      parentCategory: parentId,
                      category: hasChildren ? "" : parentId,
                    }));
                    if (parent && !hasChildren) {
                      const attributeSlug = getAttributeSlug(parent, null);
                      setVariants([createVariantByCategory(attributeSlug)]);
                    }
                    if (hasChildren) setVariants([]);
                  }}
                >
                  <option value="">Select Category</option>
                  {parentCategories.map((p) => (
                    <option key={p._id} value={p._id}>
                      {p.name}
                    </option>
                  ))}
                </select>

                {form.parentCategory && hasChildCategories(form.parentCategory) && (
                  <select
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none font-medium bg-white mt-3"
                    value={form.category}
                    onChange={(e) => {
                      const childId = e.target.value;
                      const child = categories.find((c) => c._id === childId);
                      setForm((prev) => ({ ...prev, category: childId }));
                      const parent = categories.find((c) => c._id === form.parentCategory);
                      const attributeSlug = getAttributeSlug(parent, child);
                      setVariants([createVariantByCategory(attributeSlug)]);
                    }}
                  >
                    <option value="">Select Sub Category</option>
                    {childCategories.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Tag size={16} className="text-orange-600" />
                  Brand
                </label>
                <select
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all outline-none font-medium bg-white"
                  value={form.brand}
                  onChange={(e) => setForm((prev) => ({ ...prev, brand: e.target.value }))}
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

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Tag size={16} className="text-pink-600" />
                  Tags
                </label>
                <input
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-pink-500 focus:ring-4 focus:ring-pink-100 transition-all outline-none font-medium"
                  placeholder="laptop, gaming, office"
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-semibold text-gray-700">Description</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none resize-none font-medium"
                  placeholder="Enter product description..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* MAIN IMAGE */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b-2 border-green-100">
              <ImagePlus className="text-green-600" size={20} />
              <h3 className="text-lg font-bold text-gray-800">Main Product Image</h3>
            </div>
            <label className="flex w-64 h-64 rounded-2xl border-4 border-dashed border-gray-300 items-center justify-center cursor-pointer overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 hover:from-blue-50 hover:to-blue-100 hover:border-blue-400 transition-all duration-300 group">
              {mainPreview ? (
                <img src={mainPreview} className="w-full h-full object-cover" alt="Main product" />
              ) : (
                <div className="text-gray-500 flex flex-col items-center gap-3 group-hover:text-blue-600 transition-colors">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-all">
                    <Upload size={24} />
                  </div>
                  <span className="font-semibold">Upload Image</span>
                  <span className="text-xs text-gray-400">Click to browse</span>
                </div>
              )}
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => setMainImage(e.target.files[0])}
              />
            </label>
          </div>

          {/* VARIANTS */}
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-2 border-b-2 border-purple-100">
              <div className="flex items-center gap-2">
                <Layers className="text-purple-600" size={20} />
                <h3 className="text-lg font-bold text-gray-800">Product Variants</h3>
              </div>
              <button
                type="button"
                onClick={addVariant}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold flex items-center gap-2 hover:shadow-lg hover:scale-105 transition-all duration-200"
              >
                <Plus size={18} /> Add Variant
              </button>
            </div>

<div className="space-y-6 max-h-[420px] overflow-y-auto pr-2">
  {variants.map((v, i) => (
                <div
                  key={i}
                  className="rounded-2xl border-2 border-gray-200 p-6 space-y-6 bg-gradient-to-br from-white to-gray-50 shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-md">
                        {i + 1}
                      </div>
                      <span className="font-bold text-gray-800 text-lg">Variant {i + 1}</span>
                    </div>
                    {variants.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeVariant(i)}
                        className="px-4 py-2 bg-red-100 text-red-600 rounded-lg font-semibold hover:bg-red-200 transition-all"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  {/* ATTRIBUTES */}
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-gray-700 block">Attributes</label>

                    <select
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none font-medium bg-white"
                      value={v.attributes[0].value}
                      onChange={(e) => updateAttribute(i, 0, { value: e.target.value })}
                    >
                      <option value="">Select Color</option>
                      {COLOR_OPTIONS.map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>

                    {v.attributes.slice(1).map((a, idx) => (
<div
  key={idx}
  className="grid gap-3 grid-cols-1 md:grid-cols-[1fr_1fr_auto]"
>
                        <input
                          className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none font-medium"
                          placeholder="Key"
                          value={a.key}
                          onChange={(e) => updateAttribute(i, idx + 1, { key: e.target.value })}
                        />
                        <input
                          className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none font-medium"
                          placeholder="Value"
                          value={a.value}
                          onChange={(e) => updateAttribute(i, idx + 1, { value: e.target.value })}
                        />
                        <button
                          type="button"
                          onClick={() => removeAttribute(i, idx + 1)}
                          className="w-12 h-12 bg-red-100 text-red-600 rounded-xl font-bold text-xl hover:bg-red-200 transition-all"
                        >
                          ×
                        </button>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() => addAttribute(i)}
                      className="text-sm font-semibold text-white hover:text-purple-700  bg-gray-400 p-3 rounded-2xl"
                    >
                      + Add Attribute
                    </button>
                  </div>

                  {/* STOCK */}
                  <div className="grid sm:grid-cols-3 gap-4">
                    <input
                      type="number"
                      className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none font-medium"
                      placeholder="Stock"
                      value={v.stock}
                      onChange={(e) => updateVariant(i, { stock: e.target.value })}
                    />
                    <input
                      type="number"
                      className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all outline-none font-medium"
                      placeholder="Price override"
                      value={v.price}
                      onChange={(e) => updateVariant(i, { price: e.target.value })}
                    />
                    <input
                      className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all outline-none font-medium"
                      placeholder="SKU"
                      value={v.sku}
                      onChange={(e) => updateVariant(i, { sku: e.target.value })}
                    />
                  </div>

                  {/* VARIANT IMAGES */}
                  <div className="space-y-4">
                    <label className="text-sm font-bold text-gray-700 block">Variant Images</label>
                    <label className="px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold inline-flex items-center gap-2 cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200">
                      <ImagePlus size={18} /> Upload Images
                      <input
                        type="file"
                        hidden
                        multiple
                        accept="image/*"
                        onChange={(e) => handleVariantImages(i, e.target.files)}
                      />
                    </label>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                      {v.imagePreviews.map((img, idx) => (
                        <div
                          key={idx}
                          className="relative rounded-xl overflow-hidden border-2 border-gray-200 group aspect-square"
                        >
                          <img src={img.url} className="w-full h-full object-cover" alt={`Variant ${idx}`} />
                          <button
                            type="button"
                            onClick={() => removeVariantImage(i, idx)}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold opacity-0 group-hover:opacity-100 transition-all hover:scale-110 shadow-lg"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-4 border-t-2 border-gray-200 px-8 py-6 bg-gray-50 rounded-b-3xl">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all duration-200"
          >
            Create Product
          </button>
        </div>
      </div>
      <BrandRequestModal
  open={openBrandRequest}
  onClose={() => setOpenBrandRequest(false)}
  onSuccess={(newBrand) => {
    // optional: auto add brand to dropdown
    setBrands((prev) => [...prev, newBrand]);
    setForm((prev) => ({ ...prev, brand: newBrand._id }));
    setOpenBrandRequest(false);
  }}
/>

    </div>
  );
}