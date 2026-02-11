import { MoreHorizontal } from "lucide-react";

export const OrderRow = ({ id, product = [], status, onManage }) => {
  const colors = {
    PLACED: "bg-amber-100 text-amber-600",
    SHIPPED: "bg-purple-100 text-purple-600",
    DELIVERED: "bg-green-100 text-green-600",
  };

  const firstItem = product[0];

  return (
    <tr className="border-t text-xs md:text-sm">

      {/* ORDER ID */}
      <td className="px-3 py-3 md:px-6 md:py-4 font-bold break-all">
        {id}
      </td>

      {/* PRODUCT */}
      <td className="px-3 py-3 md:px-6 md:py-4 whitespace-normal break-words">
        {firstItem?.name}
        {product.length > 1 && (
          <span className="text-[10px] md:text-xs ml-1 text-green-400">
            +{product.length - 1} more
          </span>
        )}
      </td>

      {/* STATUS */}
      <td className="px-3 py-3 md:px-6 md:py-4">
        <span
          className={`text-[10px] md:text-xs font-black px-2 md:px-3 py-1 rounded ${colors[status]}`}
        >
          {status}
        </span>
      </td>

      {/* ACTION */}
      <td className="px-2 py-3 md:px-6 md:py-4 text-right">
        <button
          className="p-1 md:p-2 hover:bg-slate-100 rounded-lg"
          onClick={onManage}
        >
          <MoreHorizontal size={16} />
        </button>
      </td>

    </tr>
  );
};
