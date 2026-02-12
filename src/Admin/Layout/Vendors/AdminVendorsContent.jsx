"use client";

import { useEffect, useMemo, useState } from "react";
import { Card } from "@/Components/ui/card";
import VendorRow from "@/Admin/Components/Vendors/VendorsRow";
import {
  getVendorsApi,
  blockVendorApi,
  unblockVendorApi,
} from "@/API/adminApi";
import { toast } from "sonner";

/* ---------------- STATUS TABS ---------------- */

const STATUS_TABS = [
  { key: "pending", label: "Pending" },
  { key: "verified", label: "Verified" },
  { key: "rejected", label: "Rejected" },
  { key: "suspended", label: "Suspended" },
];

export default function AdminVendorsContent() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeStatus, setActiveStatus] = useState("pending"); // 🔥 default

  /* ---------------- FETCH VENDORS ---------------- */

  const fetchVendors = async () => {
    try {
      setLoading(true);
      const data = await getVendorsApi();
      setVendors(data.vendors || []);
    } catch {
      toast.error("Failed to load vendors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  /* ---------------- FILTERED VENDORS ---------------- */

  const filteredVendors = useMemo(() => {
    return vendors.filter((v) => v.status === activeStatus);
  }, [vendors, activeStatus]);

  /* ---------------- COUNTS ---------------- */

  const statusCounts = useMemo(() => {
    const counts = {
      pending: 0,
      verified: 0,
      rejected: 0,
      suspended: 0,
    };

    vendors.forEach((v) => {
      if (counts[v.status] !== undefined) {
        counts[v.status]++;
      }
    });

    return counts;
  }, [vendors]);

  /* ---------------- ACTIONS ---------------- */

  const handleBlock = async (id) => {
    try {
      await blockVendorApi(id);
      toast.success("Vendor blocked");
      fetchVendors();
    } catch {
      toast.error("Failed to block vendor");
    }
  };

  const handleUnblock = async (id) => {
    try {
      await unblockVendorApi(id);
      toast.success("Vendor unblocked");
      fetchVendors();
    } catch {
      toast.error("Failed to unblock vendor");
    }
  };

  /* ============================ UI ============================ */

  return (
    <Card className="p-6 bg-white border-gray-200 shadow-sm space-y-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Vendors</h3>
        <p className="text-sm text-gray-500">
          Manage marketplace sellers
        </p>
      </div>

      {/* STATUS TABS */}
      <div className="flex gap-2 border-b border-gray-200 pb-2">
        {STATUS_TABS.map((tab) => {
          const active = activeStatus === tab.key;

          return (
            <button
              key={tab.key}
              onClick={() => setActiveStatus(tab.key)}
              className={`
                px-4 py-2 text-sm rounded-t-md
                transition
                ${
                  active
                    ? "bg-gray-900 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }
              `}
            >
              {tab.label}
              <span className="ml-2 text-xs opacity-80">
                ({statusCounts[tab.key] || 0})
              </span>
            </button>
          );
        })}
      </div>

      {/* TABLE */}
      {loading ? (
        <p className="text-sm text-gray-500">Loading vendors...</p>
      ) : filteredVendors.length === 0 ? (
        <p className="text-sm text-gray-500">
          No vendors in <strong>{activeStatus}</strong> status
        </p>
      ) : (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Phone
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {filteredVendors.map((vendor) => (
                <VendorRow
                  key={vendor._id}
                  vendor={vendor}
                  onBlock={handleBlock}
                  onUnblock={handleUnblock}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}
