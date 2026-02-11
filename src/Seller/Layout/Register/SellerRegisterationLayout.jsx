"use client";

import { useEffect, useState } from "react";
import SellerInput from "@/Seller/Component/Register/SellerInput";
import SellerAgreements from "@/Seller/Component/Register/SellerAgreements";
import { toast } from "sonner";
import { registerVendorApi } from "@/API/vendorApi";
import { useNavigate } from "react-router-dom";

/* -------------------------------- FORM -------------------------------- */

export default function SellerRegisterForm() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    storeName: "",
    storeDescription: "",
    businessType: "individual",
    panNumber: "",
    gstNumber: "",
    addressLine1: "",
    city: "",
    state: "",
    pincode: "",
    accountHolderName: "",
    accountNumber: "",
    ifsc: "",
    bankName: "",
    upiId: "",
  });

  const [documents, setDocuments] = useState({
    panCard: null,
    idProof: null,
    bankProof: null,
    gstCertificate: null,
  });

  const [agreements, setAgreements] = useState({
    sellerAgreement: false,
    commission: false,
    returns: false,
    rules: false,
  });

  const update = (key, value) =>
    setForm((p) => ({ ...p, [key]: value }));

  /* ------------------------- SUBMIT ------------------------- */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(agreements).includes(false)) {
      toast.error("Please accept all agreements");
      return;
    }

    if (!documents.panCard || !documents.idProof || !documents.bankProof) {
      toast.error("Please upload all required KYC documents");
      return;
    }

    try {
      const payload = new FormData();

      Object.entries(form).forEach(([k, v]) => payload.append(k, v));
      Object.entries(documents).forEach(
        ([k, v]) => v && payload.append(k, v)
      );

      payload.append("agreements", JSON.stringify(agreements));

      await registerVendorApi(payload);

      toast.success(
        "Your seller application has been submitted. We’ll verify and update you shortly."
      );

      setTimeout(() => {
        navigate("/seller/application-status");
      }, 1200);
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          "Registration failed. Please try again."
      );
    }
  };

  /* ------------------------- NAV ------------------------- */

  const next = () => setStep((s) => Math.min(s + 1, 3));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  return (
    <form onSubmit={handleSubmit} className="space-y-10">

      {/* ---------- STEP INDICATOR ---------- */}
      <div className="flex items-center gap-4 mb-6">
        {["Account", "Business", "Verification"].map((label, i) => {
          const idx = i + 1;
          return (
            <div key={label} className="flex-1 text-center">
              <div
                className={`mx-auto w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                ${step >= idx ? "bg-primary text-white" : "bg-muted text-muted-foreground"}`}
              >
                {idx}
              </div>
              <p className="text-xs mt-2 text-muted-foreground">{label}</p>
            </div>
          );
        })}
      </div>

      {/* ---------- STEP 1 ---------- */}
      {step === 1 && (
        <>
          <Section title="Account Information">
            <Grid>
              <SellerInput label="Full Name" value={form.name} onChange={(e) => update("name", e.target.value)} />
              <SellerInput label="Email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} />
              <SellerInput label="Phone" value={form.phone} onChange={(e) => update("phone", e.target.value)} />
              <SellerInput label="Password" type="password" value={form.password} onChange={(e) => update("password", e.target.value)} />
            </Grid>
          </Section>

          <Section title="Store Information">
            <SellerInput label="Store Name" value={form.storeName} onChange={(e) => update("storeName", e.target.value)} />
            <Textarea label="Store Description" value={form.storeDescription} onChange={(e) => update("storeDescription", e.target.value)} />
          </Section>
        </>
      )}

      {/* ---------- STEP 2 ---------- */}
      {step === 2 && (
        <>
          <Section title="Business Details">
            <Grid>
              <Select
                label="Business Type"
                value={form.businessType}
                onChange={(e) => update("businessType", e.target.value)}
                options={[
                  ["individual", "Individual"],
                  ["proprietorship", "Proprietorship"],
                  ["llp", "LLP"],
                  ["pvt_ltd", "Private Limited"],
                ]}
              />
              <SellerInput label="PAN Number" value={form.panNumber} onChange={(e) => update("panNumber", e.target.value)} />
              <SellerInput label="GST Number (Optional)" value={form.gstNumber} onChange={(e) => update("gstNumber", e.target.value)} />
            </Grid>
          </Section>

          <Section title="Business Address">
            <SellerInput label="Address Line" value={form.addressLine1} onChange={(e) => update("addressLine1", e.target.value)} />
            <Grid>
              <SellerInput label="City" value={form.city} onChange={(e) => update("city", e.target.value)} />
              <SellerInput label="State" value={form.state} onChange={(e) => update("state", e.target.value)} />
              <SellerInput label="Pincode" value={form.pincode} onChange={(e) => update("pincode", e.target.value)} />
            </Grid>
          </Section>

          <Section title="Bank Details">
            <Grid>
              <SellerInput label="Account Holder Name" value={form.accountHolderName} onChange={(e) => update("accountHolderName", e.target.value)} />
              <SellerInput label="Account Number" value={form.accountNumber} onChange={(e) => update("accountNumber", e.target.value)} />
              <SellerInput label="IFSC Code" value={form.ifsc} onChange={(e) => update("ifsc", e.target.value)} />
              <SellerInput label="Bank Name" value={form.bankName} onChange={(e) => update("bankName", e.target.value)} />
              <SellerInput label="UPI ID (Optional)" value={form.upiId} onChange={(e) => update("upiId", e.target.value)} />
            </Grid>
          </Section>
        </>
      )}

      {/* ---------- STEP 3 ---------- */}
      {step === 3 && (
        <>
          <Section title="KYC Documents">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <KycUpload label="PAN Card" file={documents.panCard} onChange={(f) => setDocuments({ ...documents, panCard: f })} />
              <KycUpload label="ID Proof" file={documents.idProof} onChange={(f) => setDocuments({ ...documents, idProof: f })} />
              <KycUpload label="Bank Proof" file={documents.bankProof} onChange={(f) => setDocuments({ ...documents, bankProof: f })} />
              <KycUpload label="GST Certificate (Optional)" file={documents.gstCertificate} onChange={(f) => setDocuments({ ...documents, gstCertificate: f })} />
            </div>
          </Section>

          <Section title="Agreements">
            <SellerAgreements
              values={agreements}
              onChange={(key, value) =>
                setAgreements({ ...agreements, [key]: value })
              }
            />
          </Section>
        </>
      )}

      {/* ---------- FOOTER ---------- */}
      <div className="flex justify-between pt-6">
        {step > 1 && (
          <button type="button" onClick={back} className="px-6 py-2 border rounded-md text-sm">
            Back
          </button>
        )}

        {step < 3 ? (
          <button type="button" onClick={next} className="ml-auto px-6 py-2 bg-primary text-background rounded-md text-sm">
            Next
          </button>
        ) : (
          <button type="submit" className="ml-auto px-6 py-2 bg-primary text-background rounded-md text-sm">
            Submit for Approval
          </button>
        )}
      </div>
    </form>
  );
}

/* -------------------------------- UI HELPERS -------------------------------- */

const Section = ({ title, children }) => (
  <div className="space-y-4">
    <h3 className="text-lg font-medium">{title}</h3>
    {children}
  </div>
)

const Grid = ({ children }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
)

const Textarea = ({ label, ...props }) => (
  <div className="space-y-1">
    <label className="text-xs uppercase tracking-widest text-muted-foreground">
      {label}
    </label>
    <textarea {...props} className="w-full rounded-md border px-3 py-2 text-sm" />
  </div>
)

const Select = ({ label, options, ...props }) => (
  <div className="space-y-1">
    <label className="text-xs uppercase tracking-widest text-muted-foreground">
      {label}
    </label>
    <select {...props} className="w-full rounded-md border px-3 py-2 text-sm">
      {options.map(([v, t]) => (
        <option key={v} value={v}>{t}</option>
      ))}
    </select>
  </div>
)

/* ------------------------- KYC UPLOAD (SAFE) ------------------------- */

const KycUpload = ({ label, file, onChange }) => {
  const [preview, setPreview] = useState(null)

  useEffect(() => {
    if (!file) {
      setPreview(null)
      return
    }
    const url = URL.createObjectURL(file)
    setPreview(url)
    return () => URL.revokeObjectURL(url)
  }, [file])

  return (
    <div className="space-y-2">
      <label className="text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </label>

      <div className="relative h-40 rounded-xl border border-dashed border-border flex items-center justify-center bg-card hover:bg-muted/40 transition cursor-pointer overflow-hidden">
        <input
          type="file"
          accept="image/*,.pdf"
          className="absolute inset-0 opacity-0 cursor-pointer"
          onChange={(e) => onChange(e.target.files[0])}
        />

        {preview ? (
          <img src={preview} alt={label} className="w-full h-full object-cover" />
        ) : (
          <div className="text-center text-sm text-muted-foreground">
            <p>Click to upload</p>
            <p className="text-xs">(JPG / PNG / PDF)</p>
          </div>
        )}
      </div>
    </div>
  )
}
