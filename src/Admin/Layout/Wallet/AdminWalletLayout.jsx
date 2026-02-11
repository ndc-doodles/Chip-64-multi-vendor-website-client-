import React, { useEffect, useState } from "react";
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  TrendingUp,
  ArrowUpRight as ExternalArrow,
} from "lucide-react";
import {
  getAdminWalletApi,
  getAdminWalletLedgerApi,
} from "@/API/adminApi";
import { useNavigate } from "react-router-dom";

export default function AdminWallet() {
  const navigate = useNavigate();

  const [summary, setSummary] = useState(null);
  const [ledger, setLedger] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWallet();
  }, []);

  const loadWallet = async () => {
    try {
      const wallet = await getAdminWalletApi();
      const ledgerData = await getAdminWalletLedgerApi();

      setSummary(wallet);
      setLedger(ledgerData);
    } catch (err) {
      console.error("Failed to load admin wallet", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400 font-bold">
        Loading wallet…
      </div>
    );
  }

  const stats = [
    {
      label: "Platform Balance",
      value: summary.balance,
      icon: Wallet,
      color: "text-[#39b02c]",
    },
    {
      label: "Total Commission Earned",
      value: summary.totalCommission,
      icon: TrendingUp,
      color: "text-[#39b02c]",
    },
    {
      label: "Paid to Vendors",
      value: summary.totalPaidToVendors,
      icon: ArrowDownLeft,
      color: "text-gray-400",
    },
    {
      label: "Pending Vendor Liability",
      value: summary.pendingVendorLiability,
      icon: ArrowUpRight,
      color: "text-amber-500",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-jakarta pb-20">
      {/* HEADER */}
      <header className="bg-white border-b border-gray-100 px-8 py-6 sticky top-0 z-30">
        <div className="max-w-[1600px] mx-auto">
          <h1 className="text-2xl font-black text-gray-900">
            Admin Wallet
          </h1>
          <p className="text-xs uppercase tracking-widest text-gray-400 mt-1">
            Platform funds & immutable ledger
          </p>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-8 mt-10 space-y-10">
        {/* SUMMARY */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-[28px] border border-gray-100 shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-center mb-4">
                <div className={`p-3 rounded-xl bg-gray-50 ${s.color}`}>
                  <s.icon size={22} />
                </div>
              </div>

              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                {s.label}
              </p>
              <h3 className="text-2xl font-black mt-1 text-gray-900">
                ₹{s.value.toLocaleString()}
              </h3>
            </div>
          ))}
        </div>

        {/* PLATFORM BALANCE HIGHLIGHT */}
        <div className="bg-gradient-to-br from-[#39b02c] to-[#2e8f24] text-white rounded-[36px] p-10 shadow-xl">
          <p className="text-[11px] uppercase tracking-widest text-white/80">
            Current Platform Balance
          </p>
          <h2 className="text-4xl font-black mt-2">
            ₹{summary.balance.toLocaleString()}
          </h2>
          <p className="text-xs text-white/70 mt-2">
            Updated just now
          </p>
        </div>

        {/* LEDGER */}
        <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-8 py-6 border-b">
            <h3 className="text-lg font-black text-gray-900">
              Wallet Ledger
            </h3>
            <p className="text-xs text-gray-400 mt-1">
              Append-only financial history
            </p>
          </div>

          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                {["Type", "Reference", "Amount", "Balance After", "Date"].map(
                  (h) => (
                    <th
                      key={h}
                      className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>

            <tbody className="divide-y">
              {ledger.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-8 py-10 text-center text-sm text-gray-400"
                  >
                    No wallet transactions yet
                  </td>
                </tr>
              )}

              {ledger.map((l, i) => (
                <tr key={i} className="hover:bg-gray-50/50">
                  <td className="px-8 py-5 text-xs font-black">
                    {l.type}
                  </td>
                  <td className="px-8 py-5 text-xs font-mono text-gray-400">
                    {l.reference || "—"}
                  </td>
                  <td
                    className={`px-8 py-5 font-black ${
                      l.amount > 0
                        ? "text-[#39b02c]"
                        : "text-rose-500"
                    }`}
                  >
                    {l.amount > 0 ? "+" : "-"}₹{Math.abs(l.amount)}
                  </td>
                  <td className="px-8 py-5 font-mono font-bold">
                    ₹{l.balanceAfter.toLocaleString()}
                  </td>
                  <td className="px-8 py-5 text-xs text-gray-500">
                    {new Date(l.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* QUICK ACTIONS */}
        <div className="flex gap-4">
          <ActionButton
            label="Payout Management"
            onClick={() => navigate("/admin/payout")}
          />
          <ActionButton
            label="Payout History"
            onClick={() => navigate("/admin/payout-history")}
          />
          <ActionButton label="Export Ledger" />
        </div>
      </main>
    </div>
  );
}

/* ---------- SUB ---------- */

const ActionButton = ({ label, onClick }) => (
  <button
    onClick={onClick}
    className="px-6 py-3 rounded-xl bg-gray-900 text-white text-xs font-black uppercase tracking-widest hover:bg-black transition flex items-center gap-2"
  >
    {label}
    <ExternalArrow size={14} />
  </button>
);
