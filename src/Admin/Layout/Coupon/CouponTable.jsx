import CouponRow from "@/Admin/Components/Coupons/CouponRow";

export default function CouponTable({ coupons = [], refresh }) {
  if (!coupons.length) {
    return (
      <div className="bg-white rounded-xl border p-6 text-center text-sm text-gray-500">
        No coupons found
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border overflow-x-auto md:ml-20">
      <table className="min-w-[900px] w-full text-sm ">
        <thead className="bg-gray-50 text-left">
          <tr>
            <th className="p-4">Code</th>
            <th>Type</th>
            <th>Value</th>
            <th className="hidden md:table-cell">Used</th>
            <th className="hidden md:table-cell">Expiry</th>
            <th>Status</th>
            <th>Change Status</th>
            <th className="">Actions</th>
          </tr>
        </thead>

        <tbody>
          {coupons.map((coupon) => (
            <CouponRow
              key={coupon._id}
              coupon={coupon}
              refresh={refresh}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
