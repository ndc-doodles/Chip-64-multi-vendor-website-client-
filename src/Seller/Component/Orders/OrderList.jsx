'use client'

import { ChevronRight } from 'lucide-react'
import { Button } from '@/Components/ui/button'

const STATUS_COLORS = {
  PLACED: 'bg-yellow-100 text-yellow-800',
  CONFIRMED: 'bg-blue-100 text-blue-800',
  SHIPPED: 'bg-purple-100 text-purple-800',
  DELIVERED: 'bg-green-100 text-green-800',
}

export default function OrderListTable({
  orders,
  vendorId,
  onViewOrder,
}) {
  const getVendorItems = (order) =>
    order.items.filter(
      (i) => String(i.vendorId) === String(vendorId)
    )

  const getVendorSubtotal = (order) =>
    getVendorItems(order).reduce(
      (sum, i) => sum + i.price * i.qty,
      0
    )

  const getVendorStatus = (order) => {
    const statuses = getVendorItems(order).map((i) => i.status)

    if (statuses.every((s) => s === 'DELIVERED')) return 'DELIVERED'
    if (statuses.some((s) => s === 'SHIPPED')) return 'SHIPPED'
    if (statuses.some((s) => s === 'CONFIRMED')) return 'CONFIRMED'
    return 'PLACED'
  }

  return (
    <div className="overflow-x-auto rounded-xl border">
      <table className="w-full">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="px-6 py-3 text-left text-sm font-semibold">
              Order
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold">
              Customer
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold">
              Date
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold">
              Status
            </th>
            <th className="px-6 py-3 text-right text-sm font-semibold">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => {
            const vendorStatus = getVendorStatus(order)

            return (
              <tr
                key={order._id}
                className="border-b hover:bg-muted/40 transition"
              >
                <td className="px-6 py-4">
                  <p className="font-semibold">
                    {order.orderNumber}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    #{order._id.slice(-6)}
                  </p>
                </td>

                <td className="px-6 py-4">
                  <p className="font-medium">
                    {order.user?.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {order.user?.email}
                  </p>
                </td>

                <td className="px-6 py-4 text-sm">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>

                <td className="px-6 py-4 font-semibold">
                  ₹{getVendorSubtotal(order).toLocaleString()}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[vendorStatus]}`}
                  >
                    {vendorStatus}
                  </span>
                </td>

                <td className="px-6 py-4 text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary hover:bg-primary/10"
                    onClick={() => onViewOrder(order)}
                  >
                    View <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
