"use client";

import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function VendorRow({ vendor, onBlock, onUnblock }) {
  const navigate = useNavigate();

  const isBlocked = vendor.isBlocked;

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-4 py-4 text-sm text-gray-900">
        {vendor.name}
      </td>

      <td className="px-4 py-4 text-sm text-gray-600">
        {vendor.email}
      </td>

      <td className="px-4 py-4 text-sm text-gray-600">
        {vendor.phone || "—"}
      </td>

      <td className="px-4 py-4">
        {isBlocked ? (
          <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700">
            Blocked
          </span>
        ) : (
          <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">
            Active
          </span>
        )}
      </td>

      <td className="px-4 py-4 text-right space-x-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => navigate(`/admin/vendors/${vendor._id}`)}
        >
          View
        </Button>

        {isBlocked ? (
          <Button
            size="sm"
            onClick={() => onUnblock(vendor._id)}
          >
            Unblock
          </Button>
        ) : (
          <Button
            size="sm"
            variant="destructive"
            onClick={() => onBlock(vendor._id)}
          >
            Block
          </Button>
        )}
      </td>
    </tr>
  );
}
