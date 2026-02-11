"use client";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getVendorByIdApi,
  approveVendorApi,
  rejectVendorApi,
  blockVendorApi,
  unblockVendorApi,
} from "@/API/adminApi";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

/* ============================ PAGE ============================ */

export default function AdminVendorDetailsLayout() {
  const { id } = useParams();
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showReject, setShowReject] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  const fetchVendor = async () => {
    try {
      setLoading(true);
      const res = await getVendorByIdApi(id);
      setVendor(res.vendor);
    } catch {
      toast.error("Failed to load vendor");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendor();
  }, [id]);

  if (loading)
    return <p className="text-sm text-gray-500">Loading vendor...</p>;
  if (!vendor) return null;

  const isPending = vendor.status === "pending";
  const isVerified = vendor.status === "verified";
  const isBlocked = vendor.isBlocked;

  /* ============================ ACTIONS ============================ */

  const handleApprove = async () => {
    try {
      await approveVendorApi(id);
      toast.success("Vendor approved");
      fetchVendor();
    } catch {
      toast.error("Failed to approve vendor");
    }
  };

  const handleReject = async () => {
    if (!rejectReason.trim()) {
      toast.error("Rejection reason required");
      return;
    }

    try {
      await rejectVendorApi(id, rejectReason);
      toast.success("Vendor rejected");
      setShowReject(false);
      setRejectReason("");
      fetchVendor();
    } catch {
      toast.error("Failed to reject vendor");
    }
  };

  const handleBlock = async () => {
    try {
      await blockVendorApi(id);
      toast.success("Vendor suspended");
      fetchVendor();
    } catch {
      toast.error("Failed to block vendor");
    }
  };

  const handleUnblock = async () => {
    try {
      await unblockVendorApi(id);
      toast.success("Vendor unblocked");
      fetchVendor();
    } catch {
      toast.error("Failed to unblock vendor");
    }
  };

  /* ============================ UI ============================ */

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Vendor Details</h2>
        <StatusBadge status={vendor.status} />
      </div>

      {/* BASIC INFO */}
      <Card className="p-6 space-y-3">
        <SectionTitle title="Basic Info" />
        <InfoRow label="Name" value={vendor.name} />
        <InfoRow label="Email" value={vendor.email} />
        <InfoRow label="Phone" value={vendor.phone || "—"} />
        <InfoRow label="Blocked" value={isBlocked ? "Yes" : "No"} />
      </Card>

      {/* STORE INFO */}
      <Card className="p-6 space-y-3">
        <SectionTitle title="Store Information" />
        <InfoRow label="Store Name" value={vendor.storeName} />
        <InfoRow label="Description" value={vendor.storeDescription} />
        <InfoRow label="Business Type" value={vendor.businessType} />
      </Card>

      {/* BANK DETAILS */}
      <Card className="p-6 space-y-3">
        <SectionTitle title="Bank Details" />
        <InfoRow
          label="Account Holder"
          value={vendor.bankDetails?.accountHolderName}
        />
        <InfoRow
          label="Account Number"
          value={vendor.bankDetails?.accountNumber}
        />
        <InfoRow label="IFSC" value={vendor.bankDetails?.ifsc} />
        <InfoRow label="UPI ID" value={vendor.bankDetails?.upiId} />
      </Card>

      {/* KYC DOCUMENTS */}
      <Card className="p-6 space-y-3">
        <SectionTitle title="KYC Documents" />
        <DocRow label="PAN Card" url={vendor.documents?.panCard} />
        <DocRow label="ID Proof" url={vendor.documents?.idProof} />
        <DocRow label="Bank Proof" url={vendor.documents?.bankProof} />
        <DocRow label="GST Certificate" url={vendor.documents?.gstCertificate} />
      </Card>

      {/* ACTIONS */}
      <Card className="p-6 flex flex-wrap gap-3">

        {/* APPROVE */}
        <Button disabled={!isPending} onClick={handleApprove}>
          Approve Vendor
        </Button>

        {/* REJECT */}
        <Button
          variant="outline"
          disabled={!isPending}
          onClick={() => setShowReject(true)}
        >
          Reject Vendor
        </Button>

        {/* BLOCK / UNBLOCK */}
        {isBlocked ? (
          <Button variant="secondary" onClick={handleUnblock}>
            Unblock Vendor
          </Button>
        ) : (
          <Button variant="destructive" onClick={handleBlock}>
            Block Vendor
          </Button>
        )}
      </Card>

      {/* REJECT MODAL */}
      {showReject && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-md p-6 space-y-4">
            <h3 className="text-lg font-medium">Reject Vendor</h3>

            <textarea
              rows={4}
              className="w-full border rounded-md p-2 text-sm"
              placeholder="Enter rejection reason"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            />

            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setShowReject(false)}
              >
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleReject}>
                Reject
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================ REUSABLE UI ============================ */

const SectionTitle = ({ title }) => (
  <h3 className="font-medium text-gray-900">{title}</h3>
);

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between text-sm">
    <span className="text-gray-500">{label}</span>
    <span className="text-gray-900">{value || "—"}</span>
  </div>
);

const DocRow = ({ label, url }) => (
  <div className="flex justify-between items-center text-sm">
    <span className="text-gray-700">{label}</span>
    {url ? (
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="text-accent underline"
      >
        View
      </a>
    ) : (
      <span className="text-gray-400">Not uploaded</span>
    )}
  </div>
);

const StatusBadge = ({ status }) => {
  const styles = {
    pending: "bg-yellow-50 text-yellow-700",
    verified: "bg-green-50 text-green-700",
    rejected: "bg-red-50 text-red-700",
    suspended: "bg-gray-200 text-gray-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status]}`}
    >
      {status.toUpperCase()}
    </span>
  );
};
