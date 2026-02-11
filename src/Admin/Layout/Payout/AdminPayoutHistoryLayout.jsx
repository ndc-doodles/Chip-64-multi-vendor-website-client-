import React, { useEffect, useState } from "react";
import {
  Search, Calendar, Filter, Download,
  ExternalLink, ChevronRight, FileText,
  User, CheckCircle2, XCircle, RefreshCcw
} from "lucide-react";
import { getPayoutHistoryApi } from "@/API/adminApi";

export default function PayoutHistory() {
  const [activeHistoryDetail, setActiveHistoryDetail] = useState(null);
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const res = await getPayoutHistoryApi();
      setHistoryData(res);
    } catch (err) {
      console.error("Failed to load payout history", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-jakarta pb-20">

      {/* HEADER */}
      <header className="bg-white border-b border-gray-100 px-8 py-6 sticky top-0 z-30">
        <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row justify-between gap-6">
          <div>
            <h1 className="text-2xl font-black text-gray-900">Payout History</h1>
            <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">
              Complete record of all vendor payouts
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-8 mt-8">

        {/* TABLE */}
        <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-6 py-4 text-[10px] uppercase text-gray-400">Payout ID</th>
                  <th className="px-6 py-4 text-[10px] uppercase text-gray-400">Vendor</th>
                  <th className="px-6 py-4 text-[10px] uppercase text-gray-400 text-right">Net Amount</th>
                  <th className="px-6 py-4 text-[10px] uppercase text-gray-400">Method</th>
                  <th className="px-6 py-4 text-[10px] uppercase text-gray-400">Paid On</th>
                  <th className="px-6 py-4 text-[10px] uppercase text-gray-400">Status</th>
                  <th className="px-6 py-4 text-[10px] uppercase text-gray-400 text-center">View</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-50">
                {!loading && historyData.length === 0 && (
                  <tr>
                    <td colSpan="7" className="text-center py-10 text-gray-400 text-sm">
                      No payout history found
                    </td>
                  </tr>
                )}

                {!loading && historyData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/50">
                    <td className="px-6 py-5 text-xs font-mono text-gray-400">
                      {item.id}
                    </td>

                    <td className="px-6 py-5">
                      <p className="font-bold text-gray-900 text-sm">
                        {item.vendor.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {item.vendor.email}
                      </p>
                    </td>

                    <td className="px-6 py-5 text-right font-mono font-black text-[#39b02c]">
                      ₹{item.net.toLocaleString()}
                    </td>

                    <td className="px-6 py-5">
                      <span className="text-xs font-bold bg-gray-100 px-2 py-1 rounded">
                        {item.method}
                      </span>
                    </td>

                    <td className="px-6 py-5 text-xs text-gray-500">
                      {new Date(item.date).toLocaleString()}
                    </td>

                    <td className="px-6 py-5">
                      <StatusBadge status={item.status} />
                    </td>

                    <td className="px-6 py-5 text-center">
                      <button
                        onClick={() => setActiveHistoryDetail(item)}
                        className="p-2 text-gray-300 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                      >
                        <ExternalLink size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* SIDE DRAWER */}
      {activeHistoryDetail && (
        <>
          <div
            className="fixed inset-0 bg-black/10 z-50"
            onClick={() => setActiveHistoryDetail(null)}
          />

          <div className="fixed top-0 right-0 h-full w-[480px] bg-white z-[60] shadow-2xl p-10">
            <h2 className="text-xl font-black mb-2">Payout Details</h2>

            <p className="text-xs text-gray-400 mb-6">
              {activeHistoryDetail.id}
            </p>

            <div className="space-y-3">
              <MetaBox label="Vendor" value={activeHistoryDetail.vendor.name} />
              <MetaBox label="Email" value={activeHistoryDetail.vendor.email} />
              <MetaBox label="Method" value={activeHistoryDetail.method} />
              <MetaBox label="Reference ID" value={activeHistoryDetail.refId} />
              <MetaBox
                label="Amount"
                value={`₹${activeHistoryDetail.net.toLocaleString()}`}
              />
            </div>

            <button
              onClick={() => setActiveHistoryDetail(null)}
              className="mt-8 w-full py-3 bg-gray-900 text-white rounded-xl font-black"
            >
              Close
            </button>
          </div>
        </>
      )}
    </div>
  );
}

/* -------- helpers -------- */

const StatusBadge = ({ status }) => {
  const map = {
    COMPLETED: { icon: CheckCircle2, cls: "text-green-600 bg-green-50" },
    FAILED: { icon: XCircle, cls: "text-rose-600 bg-rose-50" },
    REVERSED: { icon: RefreshCcw, cls: "text-gray-500 bg-gray-50" },
  };

  const cfg = map[status] || map.COMPLETED;
  return (
    <span className={`px-3 py-1 rounded-full text-[10px] font-black ${cfg.cls}`}>
      <cfg.icon size={12} /> {status}
    </span>
  );
};

const MetaBox = ({ label, value }) => (
  <div className="p-3 bg-gray-50 rounded-xl border">
    <p className="text-[10px] uppercase text-gray-400">{label}</p>
    <p className="text-sm font-bold text-gray-900 break-all">{value}</p>
  </div>
);
