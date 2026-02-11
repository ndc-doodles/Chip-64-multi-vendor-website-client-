import React, { useEffect, useState } from "react";
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  TrendingUp,
  Clock,
  IndianRupee,
} from "lucide-react";
import { toast } from "sonner";
import {
  getVendorWalletApi,
  getVendorWalletLedgerApi,
} from "@/API/vendorApi";
import { requestVendorPayoutApi } from "@/API/vendorApi";
export default function SelllerWallet() {
  const [wallet, setWallet] = useState(null);
  const [ledger, setLedger] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWallet();
  }, []);

  const loadWallet = async () => {
    try {
      const walletData = await getVendorWalletApi();
      const ledgerData = await getVendorWalletLedgerApi();

      setWallet(walletData);
      setLedger(ledgerData.slice(0, 6)); // show recent 6 only
    } catch {
      toast.error("Failed to load wallet");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading wallet...
      </div>
    );
  }

  const cards = [
    {
      label: "Available Balance",
      value: wallet.balance,
      icon: Wallet,
      accent: "text-[#39b02c]",
    },
    {
      label: "Total Earned",
      value: wallet.totalEarned,
      icon: TrendingUp,
      accent: "text-[#39b02c]",
    },
    {
      label: "Paid Out",
      value: wallet.totalPaid,
      icon: ArrowDownLeft,
      accent: "text-gray-400",
    },
    {
      label: "Pending Payout",
      value: wallet.pendingAmount,
      icon: Clock,
      accent: "text-amber-500",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-jakarta pb-20">
      {/* HEADER */}
      <header className="bg-white border-b border-gray-100 px-8 py-6 sticky top-0 z-30">
        <div className="max-w-[1400px] mx-auto">
          <h1 className="text-2xl font-black text-gray-900">
            Wallet
          </h1>
          <p className="text-xs uppercase tracking-widest text-gray-400 mt-1">
            Your earnings & payouts
          </p>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-8 mt-10 space-y-10">
        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((c, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-[28px] border border-gray-100 shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-center mb-4">
                <div className={`p-3 bg-gray-50 rounded-xl ${c.accent}`}>
                  <c.icon size={22} />
                </div>
              </div>

              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                {c.label}
              </p>
              <h3 className="text-2xl font-black mt-1 text-gray-900">
                ₹{c.value.toLocaleString()}
              </h3>
            </div>
          ))}
        </div>

        {/* MAIN BALANCE CARD */}
        <div className="bg-gradient-to-br from-[#39b02c] to-[#2e8f24] text-white rounded-[36px] p-10 shadow-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <p className="text-[11px] uppercase tracking-widest text-white/80">
              Withdrawable Balance
            </p>
            <h2 className="text-4xl font-black mt-2 flex items-center gap-2">
              <IndianRupee size={30} />
              {wallet.balance.toLocaleString()}
            </h2>
            <p className="text-xs text-white/70 mt-2">
              Updated in real-time
            </p>
          </div>

         <button
  disabled={wallet.balance === 0}
  onClick={async () => {
    try {
      await requestVendorPayoutApi();
      toast.success("Payout request submitted");
      loadWallet();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Request failed");
    }
  }}
  className={`px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition
    ${
      wallet.balance > 0
        ? "bg-white text-[#39b02c] hover:scale-105"
        : "bg-white/40 text-white/70 cursor-not-allowed"
    }`}
>
  Request Payout
</button>

        </div>

        {/* WALLET LEDGER */}
        <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-black text-gray-900">
                Recent Wallet Activity
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Last transactions
              </p>
            </div>

            <button className="text-xs font-black uppercase tracking-widest text-[#39b02c] hover:underline" >
              View Full History →
            </button>
          </div>

          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                {["Type", "Reference", "Amount", "Balance", "Date"].map(
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
              {ledger.map((l, i) => (
                <tr key={i} className="hover:bg-gray-50/50">
                  <td className="px-8 py-5 text-xs font-black text-gray-700">
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
                    {l.amount > 0 ? "+" : "-"}₹
                    {Math.abs(l.amount).toLocaleString()}
                  </td>
                  <td className="px-8 py-5 font-mono font-bold text-gray-900">
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
      </main>
    </div>
  );
}
