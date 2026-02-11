import React, { useEffect, useState } from "react";
import {
  Search,
  Calendar,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Banknote,
  Landmark,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
import {
  getVendorPayoutsApi,
  settleVendorPayoutApi,
} from "@/API/adminApi";
import { useNavigate } from "react-router-dom";

export default function PayoutManagement() {
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [method, setMethod] = useState("BANK");
  const [referenceId, setReferenceId] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate()

  /* ---------- LOAD PAYOUT DATA ---------- */
  useEffect(() => {
    loadPayouts();
  }, []);

  const loadPayouts = async () => {
    try {
      const data = await getVendorPayoutsApi();
      setVendors(data);
    } catch {
      toast.error("Failed to load payout data");
    }
  };

  /* ---------- STATS ---------- */
  const stats = [
    {
      label: "Total Payable",
      value: vendors.reduce((a, v) => a + v.payable, 0),
      icon: Banknote,
    },
    {
      label: "Paid Out",
      value: vendors.reduce((a, v) => a + v.paid, 0),
      icon: CheckCircle2,
    },
    {
      label: "Pending Payout",
      value: vendors.reduce((a, v) => a + v.pending, 0),
      icon: Clock,
    },
    {
      label: "Active Vendors",
      value: vendors.length,
      icon: Landmark,
    },
  ];

  /* ---------- PAYOUT ---------- */
  const confirmPayout = async () => {
    try {
      setLoading(true);

      await settleVendorPayoutApi({
        vendorId: selectedVendor.vendorId,
        method,
        referenceId,
        note,
      });

      toast.success("Payout settled successfully");
      setSelectedVendor(null);
      setReferenceId("");
      setNote("");
      loadPayouts();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Payout failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-jakarta pb-20">
      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 px-8 py-5">
        <div className="max-w-[1600px] mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-black">Payout Management</h1>
            <p className="text-xs text-gray-400 uppercase tracking-widest">
              Track vendor earnings and release payments
            </p>
          </div>
         <div className="flex gap-3">
  <button
    onClick={() => navigate("/admin/payout-history")}
    className="px-4 py-2.5 rounded-xl bg-gray-900 text-white text-xs font-black uppercase tracking-widest hover:bg-black transition"
  >
   View Payout History
  </button>

  <div className="relative">
    <Search
      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      size={16}
    />
    <input
      placeholder="Search vendor..."
      className="pl-10 pr-4 py-2.5 bg-gray-50 rounded-xl text-sm w-64 outline-none"
    />
  </div>

  <button className="flex items-center gap-2 px-4 py-2.5 border rounded-xl text-xs font-bold">
    <Calendar size={14} /> This Month
  </button>
</div>

        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-8 mt-8 space-y-8">
        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl border shadow-sm"
            >
              <div className="flex justify-between mb-4">
                <div className="p-2 bg-gray-50 rounded-lg text-gray-400">
                  <s.icon size={20} />
                </div>
                <ArrowUpRight size={16} className="text-gray-300" />
              </div>
              <p className="text-[10px] font-black uppercase text-gray-400">
                {s.label}
              </p>
              <h3 className="text-2xl font-black text-[#39b02c]">
                {typeof s.value === "number"
                  ? `₹${s.value.toLocaleString()}`
                  : s.value}
              </h3>
            </div>
          ))}
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-3xl border overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {[
                  "Vendor",
                  "Delivered",
                  "Commission",
                  "Payable",
                  "Paid",
                  "Pending",
                  "Status",
                  "Action",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-6 py-5 text-[10px] font-black uppercase text-gray-400"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y">
              {vendors.map((v) => {
                const status =
                  v.pending === 0
                    ? "Paid"
                    : v.paid > 0
                    ? "Partially Paid"
                    : "Ready to Pay";

                return (
                  <tr key={v.vendorId}>
                    <td className="px-6 py-5 font-bold">{v.name}</td>
                    <td className="px-6 py-5 text-right">₹{v.delivered}</td>
                    <td className="px-6 py-5 text-right text-gray-400">
                      ₹{v.commission}
                    </td>
                    <td className="px-6 py-5 text-right font-bold">
                      ₹{v.payable}
                    </td>
                    <td className="px-6 py-5 text-right text-gray-400">
                      ₹{v.paid}
                    </td>
                    <td className="px-6 py-5 text-right text-[#39b02c] font-black">
                      ₹{v.pending}
                    </td>
                    <td className="px-6 py-5">
                      <StatusBadge status={status} />
                    </td>
                    <td className="px-6 py-5 text-center">
                      <button
                        disabled={v.pending === 0}
                        onClick={() => setSelectedVendor(v)}
                        className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase ${
                          v.pending
                            ? "bg-[#39b02c] text-white"
                            : "bg-gray-100 text-gray-300"
                        }`}
                      >
                        Pay Now
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>

      {/* PAYOUT MODAL */}
      {selectedVendor && (
        <>
          <div
            className="fixed inset-0 bg-black/20 z-50"
            onClick={() => setSelectedVendor(null)}
          />
          <div className="fixed top-0 right-0 w-[420px] h-full bg-white z-[60] p-8">
            <div className="flex justify-between mb-8">
              <h2 className="text-xl font-black">Release Payout</h2>
              <button onClick={() => setSelectedVendor(null)}>
                <ChevronRight />
              </button>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl mb-6">
              <p className="text-xs text-gray-400 uppercase">
                Total Due
              </p>
              <p className="text-3xl font-black text-[#39b02c]">
                ₹{selectedVendor.pending}
              </p>
            </div>

            <select
              className="w-full mb-4 p-3 bg-gray-50 rounded-xl"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
            >
              <option value="BANK">Bank</option>
              <option value="UPI">UPI</option>
              <option value="MANUAL">Manual</option>
            </select>

            <input
              placeholder="Reference ID (optional)"
              className="w-full mb-4 p-3 bg-gray-50 rounded-xl"
              value={referenceId}
              onChange={(e) => setReferenceId(e.target.value)}
            />

            <textarea
              placeholder="Internal note"
              className="w-full mb-6 p-3 bg-gray-50 rounded-xl h-28"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />

            <button
              disabled={loading}
              onClick={confirmPayout}
              className="w-full py-4 bg-[#39b02c] text-white rounded-xl font-black uppercase"
            >
              {loading ? "Processing..." : "Confirm Payout"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

/* ---------- SUB COMPONENTS ---------- */

const StatusBadge = ({ status }) => {
  const styles = {
    "Ready to Pay": "bg-emerald-50 text-[#39b02c]",
    "Partially Paid": "bg-amber-50 text-amber-600",
    Paid: "bg-gray-100 text-gray-400 italic",
  };
  return (
    <span
      className={`px-3 py-1 rounded-full text-[9px] font-black uppercase ${styles[status]}`}
    >
      {status}
    </span>
  );
};
