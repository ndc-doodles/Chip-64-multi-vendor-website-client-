import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { approveBrandRequestApi,rejectBrandRequestApi } from "@/API/adminApi";
import { useState } from "react";

export default function BrandRequests({ requests = [], onAction }) {
  if (!requests.length) return null;
const [filter, setFilter] = useState("pending"); // pending | rejected
const filteredRequests = requests.filter(
  (r) => r.status === filter
);

  const approve = async (id) => {
    try {
      await approveBrandRequestApi(id);
      toast.success("Brand approved");
      onAction?.();
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Failed to approve brand"
      );
    }
  };

  const reject = async (id) => {
    try {
      await rejectBrandRequestApi(id, {
        adminNote: "Not approved by admin",
      });
      toast.success("Brand rejected");
      onAction?.();
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Failed to reject brand"
      );
    }
  }; 
  return (
    <section className="rounded-xl border p-6">
      <h2 className="text-lg font-semibold mb-4">Brand Requests</h2>
<div className="flex gap-2 mb-4">
  {["pending", "rejected"].map((f) => (
    <button
      key={f}
      onClick={() => setFilter(f)}
      className={`px-4 py-1.5 rounded-full text-sm font-medium transition
        ${
          filter === f
            ? "bg-primary text-white"
            : "bg-muted text-muted-foreground hover:bg-muted/70"
        }
      `}
    >
      {f === "pending" ? "New Requests" : "Rejected"}
    </button>
  ))}
</div>

      <div className="space-y-3">
        {filteredRequests.map((r) => (
          <div
            key={r._id}
            className="flex items-center justify-between border rounded-lg p-4"
          >
            <div>
              <p className="font-medium">{r.brandName}</p>
              <p className="text-xs text-muted-foreground">
                Requested by {r.vendorId?.name}
              </p>
            </div>

            <div className="flex gap-2">
              <Button size="sm" onClick={() => approve(r._id)}>
                Approve
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => reject(r._id)}
              >
                Reject
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
