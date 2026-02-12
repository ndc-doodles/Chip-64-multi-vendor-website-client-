"use client"

import { Button } from "@/Components/ui/button"

export default function UserRow({ user, onBlock, onUnblock }) {
  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-4 py-4 text-sm text-gray-900">
        {user.name}
      </td>

      <td className="px-4 py-4 text-sm text-gray-600">
        {user.email}
      </td>

      {/* ✅ STATUS */}
      <td className="px-4 py-4">
        {user.isBlocked ? (
          <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700">
            Blocked
          </span>
        ) : (
          <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">
            Active
          </span>
        )}
      </td>

      <td className="px-4 py-4 text-sm text-gray-500">
        {user.joined}
      </td>

      {/* ✅ ACTION */}
      <td className="px-4 py-4 text-right">
        {user.isBlocked ? (
          <Button
            size="sm"
            variant="outline"
            onClick={() => onUnblock(user._id)}
          >
            Unblock
          </Button>
        ) : (
          <Button
            size="sm"
            variant="destructive"
            onClick={() => onBlock(user._id)}
          >
            Block
          </Button>
        )}
      </td>
    </tr>
  )
}
