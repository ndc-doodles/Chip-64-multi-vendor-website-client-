// src/Component/Product/EditProductModal.jsx
import React, { useEffect, useState } from "react";
import { updateProductApi } from "@/API/adminApi";
import { toast } from "sonner";

const EMPTY_VARIANT = {
  color: "",
  size: "",
  stock: 0,
  price: "",
  image: "", // explicit URL (optional)
  imageFiles: [], // new files chosen for this variant
  imagePreviews: [], // { file|null, url }
  imageIndices: [], // indexes into galleryPreviews / combined uploads
};

export default function EditProductModal({ open, onClose, product, onUpdated }) {
  // form state
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

  const [mainFile, setMainFile] = useState(null);
  const [mainPreview, setMainPreview] = useState("");
  const [galleryFiles, setGalleryFiles] = useState([]); // newly picked files
  const [galleryPreviews, setGalleryPreviews] = useState([]); // { file|null, url, remote:bool, removed:bool }
  const [variants, setVariants] = useState([{ ...EMPTY_VARIANT }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // utility to revoke only when preview was from a File (local object URL)
  const revokeObjectUrlIfLocal = (p) => {
    try {
      if (p?.file && p?.url) URL.revokeObjectURL(p.url);
    } catch (e) {}
  };

  function reset() {
    // revoke all local preview URLs
    (galleryPreviews || []).forEach((p) => revokeObjectUrlIfLocal(p));
    (variants || []).forEach((v) => (v.imagePreviews || []).forEach((p) => revokeObjectUrlIfLocal(p)));
    if (mainFile && mainPreview) {
      try { URL.revokeObjectURL(mainPreview); } catch (e) {}
    }

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
    setMainFile(null);
    setMainPreview("");
    setGalleryFiles([]);
    setGalleryPreviews([]);
    setVariants([{ ...EMPTY_VARIANT }]);
    setLoading(false);
    setError("");
  }

  // when modal opens, populate with product
  useEffect(() => {
    if (!open) {
      reset();
      return;
    }
    if (product) {
      setForm({
        name: product.name || "",
        description: product.description || "",
        basePrice: product.basePrice ?? "",
        category: product.category || "Wallets",
        gender: product.gender || "Unisex",
        badges: (product.badges || []).join(", "),
        tags: (product.tags || []).join(", "),
        isActive: typeof product.isActive === "boolean" ? product.isActive : true,
      });

      setMainPreview(product.mainImage || "");
      setMainFile(null);

      // existing gallery urls -> previews, mark as remote
      const existing = (product.images || []).map((u) => ({ file: null, url: u, remote: true, removed: false }));
      setGalleryPreviews(existing);
      setGalleryFiles([]);

      const mapped = (product.variants || []).map((v) => ({
        color: v.color || "",
        size: v.size || "",
        stock: v.stock || 0,
        price: v.price != null ? v.price : "",
        image: Array.isArray(v.images) && v.images.length ? v.images[0] : (v.image || ""),
        imageFiles: [],
        imagePreviews: [],
        imageIndices: [], // indices into galleryPreviews (these will reflect order of galleryPreviews)
      }));
      setVariants(mapped.length ? mapped : [{ ...EMPTY_VARIANT }]);
      setError("");
    }
  }, [open, product]);

  // mainFile -> preview
  useEffect(() => {
    if (!mainFile) return;
    const url = URL.createObjectURL(mainFile);
    setMainPreview(url);
    return () => {
      try { URL.revokeObjectURL(url); } catch (e) {}
    };
  }, [mainFile]);

  // galleryFiles -> create local previews and prepend to galleryPreviews (so new uploads come first)
  useEffect(() => {
    const newPreviews = galleryFiles.map((f) => ({ file: f, url: URL.createObjectURL(f), remote: false, removed: false }));
    setGalleryPreviews((existing = []) => {
      // keep remote ones (existing.filter(e => e.remote)) after the newly uploaded
      const existingRemote = (existing || []).filter((e) => e.remote) || [];
      return [...newPreviews, ...existingRemote];
    });

    return () => {
      // cleanup created object URLs for only this batch (not remote)
      newPreviews.forEach((p) => {
        try { URL.revokeObjectURL(p.url); } catch (e) {}
      });
    };
  }, [galleryFiles]);

  const onFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
  };

  const onMainFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!f.type.startsWith("image/")) { setError("Main image must be an image"); return; }
    setMainFile(f);
    setError("");
  };

  const onGalleryFiles = (e) => {
    const files = Array.from(e.target.files || []).filter((f) => f.type?.startsWith?.("image/"));
    if (!files.length) { toast.error("No valid gallery images selected"); return; }
    setGalleryFiles(files);
  };

  // variant helpers
  const updateVariant = (index, fnOrPatch) => {
    setVariants((prev) =>
      prev.map((it, i) => {
        if (i !== index) return it;
        const patch = typeof fnOrPatch === "function" ? fnOrPatch(it) : fnOrPatch;
        return { ...it, ...patch };
      })
    );
  };

  const addVariant = () => setVariants((v) => [...v, { ...EMPTY_VARIANT }]);

  const removeVariant = (index) => {
    setVariants((prev) => {
      const v = prev[index];
      // revoke any object URLs for this variant previews
      (v?.imagePreviews || []).forEach((p) => {
        if (p?.file && p?.url) try { URL.revokeObjectURL(p.url); } catch (e) {}
      });
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleVariantFiles = (variantIdx, e) => {
    const files = Array.from(e.target.files || []).filter((f) => f.type?.startsWith?.("image/"));
    if (!files.length) { toast.error("No valid images selected"); return; }
    updateVariant(variantIdx, (prev) => {
      const existingFiles = Array.isArray(prev.imageFiles) ? prev.imageFiles : [];
      const allowed = Math.max(0, 4 - existingFiles.length);
      const toAdd = files.slice(0, allowed);
      if (toAdd.length < files.length) toast.error("Max 4 images per variant — extra ignored");
      const newFiles = [...existingFiles, ...toAdd];
      const newPreviews = [...(prev.imagePreviews || []), ...toAdd.map((f) => ({ file: f, url: URL.createObjectURL(f) }))];
      return { ...prev, imageFiles: newFiles, imagePreviews: newPreviews };
    });
  };

  const removeVariantFile = (variantIdx, fileIdx) => {
    updateVariant(variantIdx, (prev) => {
      const removed = prev.imagePreviews?.[fileIdx];
      if (removed && removed.file && removed.url) try { URL.revokeObjectURL(removed.url); } catch (e) {}
      return {
        ...prev,
        imageFiles: (prev.imageFiles || []).filter((_, i) => i !== fileIdx),
        imagePreviews: (prev.imagePreviews || []).filter((_, i) => i !== fileIdx),
      };
    });
  };

  const clearVariantUploads = (variantIdx) =>
    updateVariant(variantIdx, (prev) => {
      (prev.imagePreviews || []).forEach((p) => { if (p?.file && p?.url) try { URL.revokeObjectURL(p.url); } catch (e) {} });
      return { ...prev, imageFiles: [], imagePreviews: [] };
    });

  const clearGalleryUploads = () => {
    // revoke local created URLs and keep only remote previews
    setGalleryPreviews((prev = []) => {
      prev.forEach((p) => { if (p?.file && p?.url) try { URL.revokeObjectURL(p.url); } catch (e) {} });
      return prev.filter((p) => p.remote); // keep remote only
    });
    setGalleryFiles([]);
  };

  // Mark existing remote gallery image as removed (soft delete). Not removing local uploaded files here.
  const markGalleryRemoteRemoved = (idx) => {
    setGalleryPreviews((prev = []) => prev.map((p, i) => (i === idx ? { ...p, removed: !p.removed } : p)));
    // Also remove imageIndices references in variants that point to this gallery index
    setVariants((prev) =>
      prev.map((v) => {
        if (!Array.isArray(v.imageIndices) || v.imageIndices.length === 0) return v;
        // if the gallery index is toggled removed, we should keep indices but server will handle removals.
        // For UI cleanliness, remove the index from variant assignments when remote is removed:
        return { ...v, imageIndices: v.imageIndices.filter((gi) => gi !== idx) };
      })
    );
  };

  // Toggle assign gallery image to variant (works with galleryPreviews indices)
  const toggleGalleryAssign = (variantIdx, galleryIdx) => {
    // if gallery preview is removed, prevent assigning
    const gp = galleryPreviews[galleryIdx];
    if (!gp) return;
    if (gp.remote && gp.removed) {
      toast.error("This gallery image is marked for deletion");
      return;
    }
    setVariants((prev) =>
      prev.map((v, vi) => {
        if (vi !== variantIdx) return v;
        const current = Array.isArray(v.imageIndices) ? [...v.imageIndices] : [];
        const exists = current.includes(galleryIdx);
        if (exists) return { ...v, imageIndices: current.filter((x) => x !== galleryIdx) };
        if (current.length >= 4) {
          toast.error("Max 4 images per variant");
          return v;
        }
        return { ...v, imageIndices: [...current, galleryIdx] };
      })
    );
  };

  // Build and send FormData
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.name.trim()) { setError("Name is required"); return; }
    if (!form.description.trim()) { setError("Description is required"); return; }
    if (!form.basePrice || Number.isNaN(Number(form.basePrice))) { setError("Base price is required"); return; }

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

    if (mainFile) fd.append("mainImage", mainFile);

    // collect removeImages (remote URLs marked removed)
    const imagesToRemove = (galleryPreviews || [])
      .filter((p) => p.remote && p.removed)
      .map((p) => p.url);

    if (imagesToRemove.length) {
      fd.append("removeImages", JSON.stringify(imagesToRemove));
    }

    // Build combinedFiles: galleryFiles first (these correspond to galleryPreviews where file != null)
    const combinedFiles = [];
    // galleryFiles corresponds to the first N galleryPreviews entries that are local (we keep galleryFiles as source for these)
    for (let f of galleryFiles) combinedFiles.push(f);

    // variantStartOffsets -> used for per-variant uploads
    const variantStartOffsets = [];
    for (let vi = 0; vi < variants.length; vi++) {
      variantStartOffsets[vi] = combinedFiles.length;
      const vfiles = Array.isArray(variants[vi].imageFiles) ? variants[vi].imageFiles : [];
      for (let f of vfiles) combinedFiles.push(f);
    }

    combinedFiles.forEach((f) => fd.append("images", f));

    // Build variants payload where imageIndices reference the combined images[] positions
    // Note: galleryPreviews may include both local (galleryFiles) and remote (urls).
    // For local gallery images their indices are 0..galleryFiles.length-1 in combined files
    const variantsForSend = [];

    // We need map from galleryPreview index -> combined index if the preview is local
    // local gallery previews are the ones created from galleryFiles and appear at start of galleryPreviews
    // We'll compute galleryLocalCount = galleryFiles.length
    const galleryLocalCount = Array.isArray(galleryFiles) ? galleryFiles.length : 0;

    for (let vi = 0; vi < variants.length; vi++) {
      const v = variants[vi];
      const sanitized = {
        color: v.color,
        size: v.size,
        stock: Number(v.stock || 0),
        price: v.price === "" ? null : (v.price != null ? Number(v.price) : null),
      };

      // explicit URLs collected from v.image input or gallery remote URLs that are selected
      const explicitUrls = [];

      // indices array (numbers referencing combined images[] array)
      const indices = [];

      // If v.imageIndices exist (these are galleryPreviews indices)
      if (Array.isArray(v.imageIndices)) {
        for (const gIdx of v.imageIndices) {
          const gp = galleryPreviews[gIdx];
          if (!gp) continue;
          if (gp.remote) {
            // remote URL selected => treat as explicit URL
            explicitUrls.push(gp.url);
          } else if (gp.file) {
            // local gallery file - it's one of the initial galleryFiles
            // find its position in galleryFiles to compute combined index: 0..galleryLocalCount-1
            const pos = galleryFiles.findIndex((f) => f.name === gp.file.name && f.size === gp.file.size && f.type === gp.file.type);
            if (pos >= 0) indices.push(pos);
          }
        }
      }

      // add per-variant uploaded files indices (they are after galleryLocalCount and previous variant files)
      const vFiles = Array.isArray(v.imageFiles) ? v.imageFiles : [];
      for (let k = 0; k < vFiles.length; k++) {
        indices.push(variantStartOffsets[vi] + k);
      }

      // explicit URL from text input has highest priority
      if (v.image && typeof v.image === "string" && v.image.trim()) {
        explicitUrls.unshift(v.image.trim());
      }

      if (explicitUrls.length === 1) sanitized.image = explicitUrls[0];
      else if (explicitUrls.length > 1) sanitized.image = explicitUrls.slice(0, 4);

      sanitized.imageIndices = indices.length ? indices.slice(0, 4) : undefined;

      if (sanitized.color && sanitized.size) variantsForSend.push(sanitized);
    }

    fd.append("variants", JSON.stringify(variantsForSend));

    setLoading(true);
    try {
      const res = await updateProductApi(product._id, fd);
      const updated = res?.product ?? res;
      onUpdated && onUpdated(updated);
      toast.success("Product updated");
      onClose && onClose();
      reset();
    } catch (err) {
      console.error("update product failed", err);
      const msg = err?.response?.data?.message || "Failed to update product";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-6 overflow-y-auto">
      <div className="absolute inset-0 bg-black/40" onClick={() => !loading && onClose && onClose()} />

      <form onSubmit={handleSubmit} className="relative z-10 w-full max-w-4xl rounded-2xl bg-card p-4 sm:p-6 shadow-lg border border-border max-h-[calc(100vh-4rem)] sm:max-h-[calc(100vh-6rem)] overflow-auto">
        <header className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-serif">Edit Product</h3>
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => { reset(); onClose && onClose(); }} className="px-3 py-1 rounded-md border">Cancel</button>
            <button type="submit" disabled={loading} className="px-4 py-2 rounded-md bg-primary text-primary-foreground">{loading ? "Saving..." : "Save"}</button>
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
              <textarea name="description" rows={4} value={form.description} onChange={onFormChange} className="w-full rounded-lg border border-border/60 px-3 py-2 bg-background" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs uppercase text-muted-foreground block mb-2">Base Price (₹)</label>
                <input name="basePrice" value={form.basePrice} onChange={onFormChange} type="number" step="0.01" className="w-full rounded-lg border border-border/60 px-3 py-2 bg-background" />
              </div>

              <div>
                <label className="text-xs uppercase text-muted-foreground block mb-2">Category</label>
                <select name="category" value={form.category} onChange={onFormChange} className="w-full rounded-lg border border-border/60 px-3 py-2 bg-background">
                  <option>Wallets</option><option>Bags</option><option>Belts</option><option>Travel</option><option>Accessories</option><option>Limited Edition</option>
                </select>
              </div>

              <div>
                <label className="text-xs uppercase text-muted-foreground block mb-2">Gender</label>
                <select name="gender" value={form.gender} onChange={onFormChange} className="w-full rounded-lg border border-border/60 px-3 py-2 bg-background">
                  <option>Unisex</option><option>Men</option><option>Women</option>
                </select>
              </div>
            </div>

            {/* Variants (truncated - same as earlier) */}
            <div className="pt-2 border-t border-border/40">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Variants</h4>
                <button type="button" onClick={addVariant} className="px-3 py-1 rounded-md border text-sm">+ Add variant</button>
              </div>

              <div className="space-y-3 mt-3">
                {variants.map((v, i) => (
                  <div key={i} className="rounded-lg border border-border/30 p-3 bg-background">
                    <div className="flex items-start gap-3">
                      <div className="flex-1">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <input value={v.color} onChange={(e) => updateVariant(i, { color: e.target.value })} placeholder="Color" className="rounded-md border border-border/60 px-2 py-1" />
                          <input value={v.size} onChange={(e) => updateVariant(i, { size: e.target.value })} placeholder="Size (M, L, One Size)" className="rounded-md border border-border/60 px-2 py-1" />
                          <input value={v.stock} onChange={(e) => updateVariant(i, { stock: e.target.value })} type="number" min="0" placeholder="Stock" className="rounded-md border border-border/60 px-2 py-1" />
                        </div>

                        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <input value={v.price} onChange={(e) => updateVariant(i, { price: e.target.value })} type="number" step="0.01" placeholder="Price override (optional)" className="rounded-md border border-border/60 px-2 py-1" />
                          <div className="flex gap-2">
                            <input value={v.image} onChange={(e) => updateVariant(i, { image: e.target.value })} placeholder="Explicit variant image URL (optional)" className="rounded-md border border-border/60 px-2 py-1 flex-1" />
                            <button type="button" onClick={() => updateVariant(i, { image: "" })} className="px-2 py-1 rounded-md border text-xs">Clear</button>
                          </div>
                        </div>

                        {/* Per-variant file picker + preview */}
                        <div className="mt-3">
                          <label className="block text-xs uppercase text-muted-foreground mb-2">Variant Images (max 4)</label>
                          <input type="file" accept="image/*" multiple onChange={(e) => handleVariantFiles(i, e)} />
                          <div className="mt-2 flex items-center gap-2 overflow-auto">
                            {(v.imagePreviews || []).map((p, idx) => (
                              <div key={idx} className="relative w-20 h-14 rounded-md overflow-hidden border bg-background">
                                <img src={p.url} alt={`variant-${i}-img-${idx}`} className="w-full h-full object-cover" />
                                <button type="button" onClick={() => removeVariantFile(i, idx)} className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full w-5 h-5 text-[10px] flex items-center justify-center" title="Remove">×</button>
                              </div>
                            ))}
                          </div>
                          <div className="flex items-center gap-3 mt-1">
                            <div className="text-[11px] text-muted-foreground">Selected: {(v.imageFiles || []).length} / 4</div>
                            <button type="button" onClick={() => clearVariantUploads(i)} className="text-xs underline">Clear uploads</button>
                          </div>
                        </div>

                        {/* assign gallery images */}
                        {galleryPreviews.length > 0 && (
                          <div className="mt-3 text-xs text-muted-foreground">
                            <label className="block mb-1">Assign gallery images to this variant (up to 4)</label>
                            <div className="flex items-center gap-2 overflow-auto">
                              {galleryPreviews.map((g, gidx) => {
                                const selected = Array.isArray(v.imageIndices) && v.imageIndices.includes(gidx);
                                const currentlySelectedCount = Array.isArray(v.imageIndices) ? v.imageIndices.length : 0;
                                const disableAdd = !selected && currentlySelectedCount >= 4;
                                return (
                                  <button key={gidx} type="button" onClick={() => toggleGalleryAssign(i, gidx)} className={`relative rounded-md p-1 border ${selected ? "ring-2 ring-accent" : ""} ${disableAdd ? "opacity-50 cursor-not-allowed" : ""}`} disabled={disableAdd}>
                                    <img src={g.url} alt={`g-${gidx}`} className="w-12 h-8 object-cover rounded-sm" />
                                    {g.remote && g.removed && <span className="absolute inset-0 bg-black/40 flex items-center justify-center text-xs text-destructive">DELETED</span>}
                                    {selected && <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-[10px] px-1 rounded-full">✓</span>}
                                  </button>
                                );
                              })}
                              <button type="button" onClick={() => updateVariant(i, { imageIndices: [] })} className="text-xs text-muted-foreground underline">Clear</button>
                            </div>
                            <div className="text-[11px] text-muted-foreground mt-1">Selected: {(v.imageIndices || []).length} / 4</div>
                          </div>
                        )}

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

          {/* right column gallery/main image */}
          <aside className="space-y-4">
            <div>
              <label className="text-xs uppercase text-muted-foreground block mb-2">Main Image</label>
              <input type="file" accept="image/*" onChange={onMainFile} />
              <div className="mt-2 w-full rounded-md border overflow-hidden bg-background">
                <div className="w-full h-0 pb-[75%] relative">
                  {mainPreview ? <img src={mainPreview} alt="main preview" className="absolute inset-0 w-full h-full object-cover" /> : <div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">No main image</div>}
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="text-xs uppercase text-muted-foreground block mb-2">Gallery Images (optional)</label>
                <div className="flex gap-2 items-center">
                  <button type="button" onClick={clearGalleryUploads} className="text-xs underline">Clear uploads</button>
                </div>
              </div>
              <input type="file" accept="image/*" multiple onChange={onGalleryFiles} />
              <div className="mt-2 grid grid-cols-3 gap-2">
                {galleryPreviews.map((g, idx) => (
                  <div key={idx} className={`relative w-full h-20 rounded-md overflow-hidden border bg-background ${g.removed ? "opacity-50" : ""}`}>
                    <img src={g.url} alt={`gallery-${idx}`} className="w-full h-full object-cover" />
                    {g.remote ? (
                      <button type="button" onClick={() => markGalleryRemoteRemoved(idx)} className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded px-1 text-xs">{g.removed ? "Undo" : "Delete"}</button>
                    ) : (
                      <button type="button" onClick={() => {
                        // remove local uploaded file & revoke
                        revokeObjectUrlIfLocal(g);
                        setGalleryPreviews((prev) => prev.filter((_, i) => i !== idx));
                        setGalleryFiles((prevFiles) => prevFiles.filter((_, j) => j !== idx)); // this assumes ordering; if mismatch, you might compute by name/size
                      }} className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded px-1 text-xs">Remove</button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </form>
    </div>
  );
}
