"use client";

import { useState, useEffect } from "react";
import { Upload, X } from "lucide-react";
import { toast } from "sonner";
import { requestBrandApi } from "@/API/vendorApi"; // or adminApi if shared

function BrandRequestModal({ open, onClose, onSubmitted }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState(null);
  const [preview, setPreview] = useState("");

  // cleanup when modal closes
  useEffect(() => {
    if (!open) {
      setName("");
      setDescription("");
      setLogo(null);
      setPreview("");
    }
  }, [open]);

  const handleLogo = (file) => {
    if (!file) return;
    setLogo(file);
    setPreview(URL.createObjectURL(file));
  };

  const submit = async () => {
    if (!name.trim()) {
      toast.error("Brand name is required");
      return;
    }

    try {
      const fd = new FormData();
      fd.append("brandName", name);
      fd.append("description", description);
      if (logo) fd.append("logo", logo);

      await requestBrandApi(fd);

      toast.success("Brand request sent to admin");
      onSubmitted?.();
      onClose();
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Failed to send brand request"
      );
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-background rounded-2xl p-6 w-full max-w-md shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold">Request Brand</h2>
          <button onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-4">
          {/* Brand name */}
          <input
            className="input"
            placeholder="Brand name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* Description */}
          <textarea
            className="input resize-none"
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {/* Logo upload */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              Brand Logo (optional)
            </label>

            <label className="flex items-center justify-center w-32 h-32 rounded-xl border border-dashed cursor-pointer overflow-hidden bg-muted">
              {preview ? (
                <img
                  src={preview}
                  alt="Brand logo"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <Upload size={18} />
                  <span className="text-xs">Upload Logo</span>
                </div>
              )}

              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => handleLogo(e.target.files[0])}
              />
            </label>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <button type="button"     onClick={onClose} className="btn-outline">
              Cancel
            </button>
            <button type="button" onClick={submit} className="btn-primary">
              Send Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BrandRequestModal;
