import React, { useEffect, useState } from "react";
import {
  IndianRupee,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";

import {
  getPayoutRequestsApi,
  approvePayoutRequestApi,
} from "@/API/adminApi";

export default function AdminPayoutRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      const data = await getPayoutRequestsApi();
      setRequests(data);
    } catch {
      toast.error("Failed to load payout requests");
    } finally {
      setLoading(false);
    }
  };

  const approveRequest = async (requestId) => {
    try {
      setProcessingId(requestId);

      await approvePayoutRequestApi(requestId);

      toast.success("Payout approved & settled");
      loadRequests();
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Approval failed"
      );
    } finally {
      setProcessingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading payout requests...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-jakarta p-8">
      {/* HEADER */}
      <div className="max-w-[1500px] mx-auto mb-8">
        <h1 className="text-2xl font-black">Payout Requests</h1>
        <p className="text-xs uppercase tracking-widest text-gray-400">
          Vendor withdrawal approvals
        </p>
      </div>

      {/* TABLE */}
      <div className="max-w-[1500px] mx-auto bg-white rounded-3xl border shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {[
                "Vendor",
                "Amount",
                "Wallet Balance",
                "Status",
                "Requested At",
                "Action",
              ].map((h) => (
                <th
                  key={h}
                  className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y">
            {requests.map((r) => (
              <tr key={r.requestId} className="hover:bg-gray-50/50">
                <td className="px-6 py-5">
                  <p className="font-bold">{r.vendor.name}</p>
                  <p className="text-xs text-gray-400">
                    {r.vendor.email}
                  </p>
                </td>

                <td className="px-6 py-5 font-black text-[#39b02c]">
                  ₹{r.amount.toLocaleString()}
                </td>

                <td className="px-6 py-5 text-sm text-gray-500">
                  ₹{r.vendor.walletBalance.toLocaleString()}
                </td>

                <td className="px-6 py-5">
                  <StatusBadge status={r.status} />
                </td>

                <td className="px-6 py-5 text-xs text-gray-500">
                  {new Date(r.requestedAt).toLocaleString()}
                </td>

                <td className="px-6 py-5">
                  {r.status === "PENDING" ? (
                    <button
                      disabled={processingId === r.requestId}
                      onClick={() => approveRequest(r.requestId)}
                      className="px-5 py-2 rounded-xl bg-[#39b02c] text-white text-[10px] font-black uppercase tracking-widest hover:scale-105 transition"
                    >
                      {processingId === r.requestId
                        ? "Processing..."
                        : "Approve"}
                    </button>
                  ) : (
                    <span className="text-xs text-gray-400 italic">
                      Processed
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------------- SUB ---------------- */

const StatusBadge = ({ status }) => {
  const config = {
    PENDING: {
      icon: Clock,
      class: "bg-amber-50 text-amber-600",
    },
    APPROVED: {
      icon: CheckCircle2,
      class: "bg-green-50 text-[#39b02c]",
    },
    REJECTED: {
      icon: XCircle,
      class: "bg-rose-50 text-rose-500",
    },
  }[status];

  return (
    <span
      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[9px] font-black uppercase ${config.class}`}
    >
      <config.icon size={10} />
      {status}
    </span>
  );
};
