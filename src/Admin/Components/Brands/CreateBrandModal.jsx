import { useState } from "react";
import { X, Upload } from "lucide-react";
import { toast } from "sonner";
import { createBrandApi } from "@/API/adminApi";

export default function CreateBrandModal({ open, onClose, onCreated }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState(null);
  const [preview, setPreview] = useState("");

  if (!open) return null;

  const handleLogo = (file) => {
    setLogo(file);
    setPreview(URL.createObjectURL(file));
  };

  const submit = async (e) => {
  e.preventDefault();

  if (!name.trim()) {
    toast.error("Brand name required");
    return;
  }

  const fd = new FormData();
  fd.append("name", name);
  fd.append("description", description);
  if (logo) fd.append("logo", logo);

  await createBrandApi(fd);
  toast.success("Brand created");

  setName("");
  setDescription("");
  setLogo(null);
  setPreview("");

  onCreated();
  onClose();
};


  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center">
      <form
        onSubmit={submit}
        className="bg-background rounded-2xl w-full max-w-md p-6"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-semibold">Create Brand</h2>
          <button type="button" onClick={onClose}>
            <X />
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
            required
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

          {/* Submit */}
          <button type="submit" className="btn-primary w-full">
            Create Brand
          </button>
        </div>
      </form>
    </div>
  );
}
