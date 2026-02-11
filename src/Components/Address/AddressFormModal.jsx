"use client";

import { X, Check, Loader2 } from "lucide-react";
import { useState } from "react";

const AddressFormModal = ({
  open,
  onClose,
  onSubmit,
  formData,
  setFormData,
  isEdit,
}) => {
  const [locating, setLocating] = useState(false);
  const [coords, setCoords] = useState(null);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((p) => ({
      ...p,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  /* 🗺️ USE CURRENT LOCATION */
  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    setLocating(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setCoords({ lat: latitude, lng: longitude });

        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
        );
        const data = await res.json();
        const address = data.address || {};

        setFormData((prev) => ({
          ...prev,
          line1: address.road || "",
          city: address.city || address.town || address.village || "",
          state: address.state || "",
          postalCode: address.postcode || "",
          country: address.country || "India",
        }));

        setLocating(false);
      },
      () => {
        alert("Location permission denied");
        setLocating(false);
      },
      { enableHighAccuracy: true }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      + <div className="bg-card w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl shadow-xl">


        {/* HEADER */}
        <header className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">
            {isEdit ? "Edit Address" : "Add New Address"}
          </h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-muted">
            <X size={18} />
          </button>
        </header>

        {/* 🗺️ LOCATION BUTTON */}
        <div className="px-6 pt-4">
          <button
            type="button"
            onClick={handleUseCurrentLocation}
            disabled={locating}
            className="
              mx-auto flex items-center justify-center gap-3
              w-full max-w-sm
              rounded-xl
              bg-blue-950 hover:bg-blue-900
              px-8 py-3
              text-white font-medium
              transition-all duration-300
              hover:-translate-y-0.5 hover:shadow-xl
              disabled:opacity-70
            "
          >
            {locating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Detecting location…
              </>
            ) : (
              <>🗺️ Use Current Location</>
            )}
          </button>
        </div>

        {/* 🗺️ MINI MAP PREVIEW */}
        {coords && (
          <div className="px-6 mt-4">
            <div className="overflow-hidden rounded-xl border shadow-sm">
              <iframe
                title="map"
                width="100%"
                height="220"
                loading="lazy"
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${coords.lng - 0.01}%2C${coords.lat - 0.01}%2C${coords.lng + 0.01}%2C${coords.lat + 0.01}&layer=mapnik&marker=${coords.lat}%2C${coords.lng}`}
              />
            </div>
          </div>
        )}

        {/* BODY */}
        <div className="px-6 py-5 space-y-4 max-h-[65vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input className="input" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} />
            <input className="input" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
            <input className="input md:col-span-2" name="line1" placeholder="Address Line 1" value={formData.line1} onChange={handleChange} />
            <input className="input md:col-span-2" name="line2" placeholder="Address Line 2 (Optional)" value={formData.line2} onChange={handleChange} />
            <input className="input" name="city" placeholder="City" value={formData.city} onChange={handleChange} />
            <input className="input" name="state" placeholder="State" value={formData.state} onChange={handleChange} />
            <input className="input md:col-span-2" name="postalCode" placeholder="Postal Code" value={formData.postalCode} onChange={handleChange} />
          </div>

          <label className="flex items-center gap-3 mt-2 text-sm cursor-pointer">
            <input type="checkbox" name="isDefault" checked={formData.isDefault} onChange={handleChange} className="w-4 h-4 accent-primary" />
            Set as default address
          </label>
        </div>

        {/* FOOTER */}
        <footer className="flex gap-3 px-6 py-4 border-t bg-card">
          <button onClick={onClose} className="btn-outline flex-1">
            Cancel
          </button>
          <button onClick={onSubmit} className="btn-primary flex-1 flex items-center justify-center gap-2">
            <Check size={16} />
            Save Address
          </button>
        </footer>
      </div>
    </div>
  );
};

export default AddressFormModal;
