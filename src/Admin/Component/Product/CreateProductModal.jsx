import React, { useEffect, useState } from "react";
import { createProductApi } from "@/API/adminApi"; // your API call
import { toast } from "sonner";
import { getCategoriesApi } from "@/API/adminApi";


const EMPTY_VARIANT = {
  color: "",
  size: "",
  stock: 0,
  price: "",
  image: "",
  imageFiles: [],
  imagePreviews: [],
  imageIndices: [],
};

export default function CreateProductModal({ open, onClose, onCreated }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    basePrice: "",
    category: "Wallets",
    gender: "Unisex",
    badges: "",
    tags: "",
    isActive: true,
  });
  const [categories, setCategories] = useState([]);

  const [mainImageFile, setMainImageFile] = useState(null);
  const [mainPreview, setMainPreview] = useState("");
  const [variants, setVariants] = useState([{ ...EMPTY_VARIANT }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) reset();
  }, [open]);

  function reset() {
    setForm({
      name: "",
      description: "",
      basePrice: "",
      category: "Wallets",
      gender: "Unisex",
      badges: "",
      tags: "",
      isActive: true,
    });
    setMainImageFile(null);
    setMainPreview("");
    setVariants([{ ...EMPTY_VARIANT }]);
    setLoading(false);
    setError("");
  }
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await getCategoriesApi();
        // support both { categories: [...] } and [...] responses
        const list = Array.isArray(data)
          ? data
          : Array.isArray(data?.categories)
            ? data.categories
            : [];
        if (!mounted) return;
        setCategories(list.map((c) => ({ id: c._id ?? c.id ?? c.name, name: c.name })));
      } catch (err) {
        console.error("Failed to load categories:", err);
        if (!mounted) return;
        setCategories([]);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);


  useEffect(() => {
    if (!mainImageFile) {
      setMainPreview("");
      return;
    }
    const url = URL.createObjectURL(mainImageFile);
    setMainPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [mainImageFile]);

  const onFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
  };

  const onMainFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!f.type.startsWith("image/")) {
      setError("Main image must be an image file");
      return;
    }
    setMainImageFile(f);
    setError("");
  };

  const addVariant = () => setVariants((v) => [...v, { ...EMPTY_VARIANT }]);
  const removeVariant = (i) => setVariants((v) => v.filter((_, idx) => idx !== i));
  const updateVariant = (i, patch) => setVariants((v) => v.map((vi, idx) => (idx === i ? { ...vi, ...patch } : vi)));

  const handleVariantFiles = (variantIdx, e) => {
    const files = Array.from(e.target.files || []).filter((f) => f.type?.startsWith?.("image/"));
    if (files.length === 0) {
      toast.error("No valid images selected");
      return;
    }
    const existing = variants[variantIdx].imageFiles || [];
    const allowedCount = Math.max(0, 4 - existing.length);
    const toAdd = files.slice(0, allowedCount);
    if (toAdd.length < files.length) toast.error("Max 4 images per variant — extra ignored");

    const newFiles = [...existing, ...toAdd];
    const newPreviews = (variants[variantIdx].imagePreviews || []).slice();
    toAdd.forEach((f) => newPreviews.push({ url: URL.createObjectURL(f) }));

    updateVariant(variantIdx, { imageFiles: newFiles, imagePreviews: newPreviews });
  };

  // remove single file from a variant
  const removeVariantFile = (variantIdx, fileIdx) => {
    const v = variants[variantIdx];
    if (!v) return;
    const files = (v.imageFiles || []).filter((_, i) => i !== fileIdx);
    const previews = (v.imagePreviews || []).filter((_, i) => i !== fileIdx);
    // revoke the removed preview url
    // (we can't revoke easily here because we don't have the File object URL reference after creation,
    // but we stored preview urls in imagePreviews so revoke the removed one)
    const removed = (v.imagePreviews || [])[fileIdx];
    if (removed && removed.url) URL.revokeObjectURL(removed.url);
    updateVariant(variantIdx, { imageFiles: files, imagePreviews: previews });
  };

  // Submit: append mainImage, then flatten all variant imageFiles into images[] and compute indices
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim()) { setError("Name is required"); return; }
    if (!form.description.trim()) { setError("Description is required"); return; }
    if (!form.basePrice || Number.isNaN(Number(form.basePrice))) { setError("Base price is required"); return; }
    if (!mainImageFile) { setError("Main image required"); return; }

    const fd = new FormData();
    fd.append("name", form.name.trim());
    fd.append("description", form.description.trim());
    fd.append("basePrice", String(form.basePrice));
    fd.append("category", form.category);
    fd.append("gender", form.gender);
    fd.append("badges", form.badges || "");
    fd.append("tags", form.tags || "");
    fd.append("isActive", form.isActive ? "true" : "false");
    fd.append("slug", (form.name || "").toString().trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""));

    // mainImage
    fd.append("mainImage", mainImageFile);

    // Build combined images[] by concatenating all variants' imageFiles in order.
    // Keep track of the starting index for each variant's chunk.
    // -----------------------------
    // Build sanitized variants array
    // -----------------------------
    let combinedFiles = [];
    const variantsForSend = [];

    for (let vi = 0; vi < variants.length; vi++) {
      const v = variants[vi] || {};
      const files = Array.isArray(v.imageFiles) ? v.imageFiles : [];

      const startIndex = combinedFiles.length;
      for (const f of files) combinedFiles.push(f);

      // Build a sanitized object with only primitive values
      const sanitized = {};
      if (v.color && typeof v.color === "string") sanitized.color = v.color.trim();
      if (v.size && typeof v.size === "string") sanitized.size = v.size.trim();
      sanitized.stock = Number.isFinite(Number(v.stock)) ? Number(v.stock) : 0;
      sanitized.price = v.price === "" || v.price == null ? null : Number(v.price);

      // Only include imageIndices if there are files for this variant
      const indices = files.map((_, idx) => startIndex + idx);
      if (indices.length) sanitized.imageIndices = indices;

      // If the user provided an explicit image URL string (optional), include it
      if (v.image && typeof v.image === "string" && v.image.trim()) sanitized.image = v.image.trim();

      // Only push well-formed variants (at least color + size)
      if (sanitized.color && sanitized.size) {
        variantsForSend.push(sanitized);
      }
    }

    // append combined files using the exact field name multer expects
    combinedFiles.forEach((f) => fd.append("variantImages", f)); // note exact casing

    // DEBUG: inspect before sending (open devtools console)
    console.log("variantsForSend (to backend):", variantsForSend);

    // append JSON string (backend expects a string sometimes)
    fd.append("variants", JSON.stringify(variantsForSend));

    setLoading(true);
    try {
      const res = await createProductApi(fd);
      const created = res?.product ?? res;
      onCreated && onCreated(created);
      onClose && onClose();
      reset();
      toast.success("Product created");
    } catch (err) {
      console.error("create product failed", err);
      const msg = err?.response?.data?.message || "Failed to create product";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-6 overflow-y-auto">
      <div className="absolute inset-0 bg-black/40" onClick={() => !loading && onClose()} />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-4xl rounded-2xl bg-card p-4 sm:p-6 shadow-lg border border-border max-h-[calc(100vh-4rem)] sm:max-h-[calc(100vh-6rem)] overflow-auto"
      >
        <header className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-serif">Create Product</h3>
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => { reset(); onClose && onClose(); }} className="px-3 py-1 rounded-md border">Cancel</button>
            <button type="submit" disabled={loading} className="px-4 py-2 rounded-md bg-primary text-primary-foreground">
              {loading ? "Creating..." : "Create product"}
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-4">
          <div className="space-y-4">
            {/* Basic fields */}
            <div>
              <label className="text-xs uppercase text-muted-foreground block mb-2">Name</label>
              <input name="name" value={form.name} onChange={onFormChange} className="w-full rounded-lg border border-border/60 px-3 py-2 bg-background" />
            </div>

            <div>
              <label className="text-xs uppercase text-muted-foreground block mb-2">Description</label>
              <textarea name="description" rows={5} value={form.description} onChange={onFormChange} className="w-full rounded-lg border border-border/60 px-3 py-2 bg-background" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs uppercase text-muted-foreground block mb-2">Base Price (₹)</label>
                <input name="basePrice" value={form.basePrice} onChange={onFormChange} type="number" step="0.01" className="w-full rounded-lg border border-border/60 px-3 py-2 bg-background" />
              </div>

              <div>
                <label className="text-xs uppercase text-muted-foreground block mb-2">Category</label>

                <select
                  name="category"
                  value={form.category}
                  onChange={onFormChange}
                  className="w-full rounded-lg border border-border/60 px-3 py-2 bg-background"
                >
                  {loading ? (
                    <option>Loading...</option>
                  ) : (
                    <>
                      <option value="">Select category</option>
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}

                    </>
                  )}
                </select>
              </div>


              <div>
                <label className="text-xs uppercase text-muted-foreground block mb-2">Gender</label>
                <select name="gender" value={form.gender} onChange={onFormChange} className="w-full rounded-lg border border-border/60 px-3 py-2 bg-background">
                  <option>Unisex</option>
                  <option>Men</option>
                  <option>Women</option>
                </select>
              </div>
            </div>

            {/* Badges / tags */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
             <div>
  <label className="text-xs uppercase text-muted-foreground block mb-2">
    Badge
  </label>

  <div className="flex flex-wrap gap-4">
    {["New", "Bestseller", "Limited"].map((badge) => (
      <label
        key={badge}
        className="flex items-center gap-2 text-sm cursor-pointer"
      >
        <input
          type="radio"
          name="badge"
          checked={form.badges === badge}
          onChange={() =>
            setForm((prev) => ({ ...prev, badges: badge }))
          }
        />
        {badge}
      </label>
    ))}
  </div>
</div>

              <div>
                <label className="text-xs uppercase text-muted-foreground block mb-2">Tags (comma)</label>
                <input name="tags" value={form.tags} onChange={onFormChange} className="w-full rounded-lg border border-border/60 px-3 py-2 bg-background" placeholder="leather, premium" />
              </div>
            </div>

            {/* Variants section (per-variant image picker included) */}
            <div className="pt-2 border-t border-border/40">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Variants</h4>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={addVariant} className="px-3 py-1 rounded-md border text-sm">+ Add variant</button>
                </div>
              </div>

              <div className="space-y-3 mt-3">
                {variants.map((v, i) => (
                  <div key={i} className="rounded-lg border border-border/30 p-3 bg-background">
                    <div className="flex items-start gap-3">
                      <div className="flex-1">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <select
                            value={v.color}
                            onChange={(e) => updateVariant(i, { color: e.target.value })}
                            className="rounded-md border border-border/60 px-2 py-1 bg-background"
                          >
                            <option value="">Select Color</option>
                            <option value="Black">Black</option>
                            <option value="Brown">Brown</option>
                            <option value="Red">Red</option>
                          </select>

                          <select
                            value={v.size}
                            onChange={(e) => updateVariant(i, { size: e.target.value })}
                            className="rounded-md border border-border/60 px-2 py-1 bg-background"
                          >
                            <option value="">Select Size</option>
                            <option value="One Size">One Size</option>
                            <option value="XS">XS</option>
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                          </select>
                          <input value={v.stock} onChange={(e) => updateVariant(i, { stock: e.target.value })} type="number" min="0" placeholder="Stock" className="rounded-md border border-border/60 px-2 py-1" />
                        </div>

                        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <input value={v.price} onChange={(e) => updateVariant(i, { price: e.target.value })} type="number" step="0.01" placeholder="Price override (optional)" className="rounded-md border border-border/60 px-2 py-1" />
                          <input value={v.image} onChange={(e) => updateVariant(i, { image: e.target.value })} placeholder="Variant image url (optional)" className="rounded-md border border-border/60 px-2 py-1" />
                        </div>

                        {/* PER-VARIANT image picker */}
                        <div className="mt-3">
                          <label className="block text-xs uppercase text-muted-foreground mb-2">Variant Images (max 4)</label>
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(e) => handleVariantFiles(i, e)}
                          />
                          <div className="mt-2 flex items-center gap-2 overflow-auto">
                            {(v.imagePreviews || []).map((p, idx) => (
                              <div key={idx} className="relative w-20 h-14 rounded-md overflow-hidden border bg-background">
                                <img src={p.url} alt={`variant-${i}-img-${idx}`} className="w-full h-full object-cover" />
                                <button
                                  type="button"
                                  onClick={() => removeVariantFile(i, idx)}
                                  className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full w-5 h-5 text-[10px] flex items-center justify-center"
                                  title="Remove"
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                          <div className="text-[11px] text-muted-foreground mt-1">Selected: {(v.imageFiles || []).length} / 4</div>
                        </div>
                      </div>

                      <div className="flex-shrink-0 text-right">
                        <button type="button" onClick={() => removeVariant(i)} className="text-xs text-destructive underline">Remove</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {error && <div className="text-sm text-destructive mt-2">{error}</div>}
          </div>

          {/* Right column: main image + preview */}
          <aside className="space-y-4">
            <div>
              <label className="text-xs uppercase text-muted-foreground block mb-2">Main Image</label>
              <input type="file" accept="image/*" onChange={onMainFile} />
              <div className="mt-2 w-full rounded-md border overflow-hidden bg-background">
                <div className="w-full h-0 pb-[75%] relative">
                  {mainPreview ? (
                    <img src={mainPreview} alt="main preview" className="absolute inset-0 w-full h-full object-cover" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">No main image</div>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-border/40">
              <div className="text-xs text-muted-foreground">Preview</div>
              <div className="mt-2 rounded-lg border border-border/30 p-3 bg-card/90">
                <div className="w-full h-36 bg-background rounded-md overflow-hidden mb-3">
                  {mainPreview ? <img src={mainPreview} alt="preview" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-sm text-muted-foreground">No main image</div>}
                </div>
                <h4 className="text-sm font-medium truncate">{form.name || "Product name"}</h4>
                <div className="text-xs text-muted-foreground mt-1">From ₹{form.basePrice || "0.00"}</div>
              </div>
            </div>
          </aside>
        </div>
      </form>
    </div>
  );
}
