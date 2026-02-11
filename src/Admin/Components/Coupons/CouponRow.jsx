import { Trash2 } from "lucide-react";
import { toggleCouponApi, deleteCouponApi } from "@/API/adminApi";
import { toast } from "sonner";

export default function CouponRow({ coupon, refresh }) {
  const handleToggle = async () => {
    try {
      await toggleCouponApi(coupon._id);
      toast.success("Coupon status updated");
      refresh();
    } catch {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this coupon?")) return;

    try {
      await deleteCouponApi(coupon._id);
      toast.success("Coupon deleted");
      refresh();
    } catch {
      toast.error("Failed to delete coupon");
    }
  };

  return (
    <tr className="border-t">
      <td className="p-4 font-medium">{coupon.code}</td>

      <td>{coupon.discountType}</td>

      <td>
        {coupon.discountType === "PERCENTAGE"
          ? `${coupon.discountValue}%`
          : `₹${coupon.discountValue}`}
      </td>

      <td className="hidden md:table-cell">
        {coupon.usedCount}
      </td>

      <td className="hidden md:table-cell">
        {new Date(coupon.expiryDate).toLocaleDateString()}
      </td>

      <td>
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            coupon.isActive
              ? "bg-green-100 text-green-700"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          {coupon.isActive ? "Active" : "Disabled"}
        </span>
        
      </td>
    <td>
         <button
          onClick={handleToggle}
          className={`   text-white px-8  py-1 rounded-2xl ${coupon.isActive ? 
            "bg-red-800":
            "bg-green-600" 
          }`}
        >
           {coupon.isActive ? "Block" : "Active"}
        </button>
    </td>
     
      <td className="">
       

        <button
          onClick={handleDelete}
          className="text-red-500"
        >
          <Trash2 size={16} />
        </button>
      </td>
    </tr>
  );
}
