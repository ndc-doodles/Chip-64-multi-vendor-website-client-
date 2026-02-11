"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function AddressSection({
  savedAddresses = [],
  selectedAddress,
  setSelectedAddress,
  formData,
  setFormData,
  onSaveAddress,
}) {
  const [showForm, setShowForm] = useState(false);
  const [locating, setLocating] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  /* ---------------- USE CURRENT LOCATION ---------------- */
  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    setLocating(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await res.json();
          const address = data.address || {};

          setFormData((prev) => ({
            ...prev,
            line1: address.road || "",
            line2: address.suburb || "",
            city: address.city || address.town || address.village || "",
            state: address.state || "",
            postalCode: address.postcode || "",
            country: address.country || "India",
          }));
        } catch {
          alert("Failed to fetch location");
        } finally {
          setLocating(false);
        }
      },
      () => {
        alert("Location permission denied");
        setLocating(false);
      }
    );
  };
  const handleSave = async () => {
  if (!formData.fullName || !formData.phone || !formData.line1) {
    alert("Please fill required fields");
    return;
  }

  await onSaveAddress();   // 🔥 call parent API logic
  setShowForm(false);      // close form after save

  // optional: clear form
  setFormData({
    fullName: "",
    phone: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
  });
};

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-light">Delivery Address</h2>
          <p className="text-sm text-muted-foreground">
            Choose or add a delivery address
          </p>
        </div>

        {!showForm && (
          <Button variant="outline" onClick={() => setShowForm(true)}>
            Add New Address
          </Button>
        )}
      </div>

      {/* SAVED ADDRESSES */}
      {!showForm && (
        <div className="space-y-4">
          {savedAddresses.map((address) => {
            const isSelected = selectedAddress?._id === address._id;

            return (
              <div
                key={address._id}
                onClick={() => setSelectedAddress(address)}
                className={`cursor-pointer rounded-lg border p-4 transition
                  ${
                    isSelected
                      ? "border-primary bg-secondary"
                      : "border-border hover:bg-secondary"
                  }`}
              >
                <div className="flex justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">{address.fullName}</p>
                    <p className="text-sm text-muted-foreground">
                      {address.line1}, {address.line2 && `${address.line2}, `}
                      {address.city}, {address.state} - {address.postalCode}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Phone: {address.phone}
                    </p>
                  </div>

                  {isSelected && (
                    <CheckCircle className="text-primary h-5 w-5" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ADD NEW ADDRESS FORM */}
      {showForm && (
        <div className="space-y-4 border rounded-lg p-6">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Add New Address</h3>
            <Button variant="ghost" onClick={() => setShowForm(false)}>
              Cancel
            </Button>
          </div>

          <Button
            variant="outline"
            onClick={handleUseCurrentLocation}
            disabled={locating}
            className="w-fit"
          >
            {locating ? "Detecting location..." : "Use Current Location"}
          </Button>

          <div className="space-y-3">
            <Input
              placeholder="Full Name"
              value={formData.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
            />
            <Input
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
            <Input
              placeholder="Address Line 1"
              value={formData.line1}
              onChange={(e) => handleChange("line1", e.target.value)}
            />
            <Input
              placeholder="Address Line 2"
              value={formData.line2}
              onChange={(e) => handleChange("line2", e.target.value)}
            />

            <div className="grid grid-cols-3 gap-3">
              <Input
                placeholder="City"
                value={formData.city}
                onChange={(e) => handleChange("city", e.target.value)}
              />
              <Input
                placeholder="State"
                value={formData.state}
                onChange={(e) => handleChange("state", e.target.value)}
              />
              <Input
                placeholder="Postal Code"
                value={formData.postalCode}
                onChange={(e) => handleChange("postalCode", e.target.value)}
              />
            </div>

            <Input
              placeholder="Country"
              value={formData.country}
              onChange={(e) => handleChange("country", e.target.value)}
            />

          <Button className="w-fit mt-2" onClick={handleSave}>
  Save Address
</Button>
          </div>
        </div>
      )}
    </section>
  );
}
