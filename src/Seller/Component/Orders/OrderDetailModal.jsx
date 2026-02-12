'use client'

import { useState } from 'react'
import { X, Copy, Check } from 'lucide-react'
import { Button } from '@/Components/ui/button'
import { Card } from '@/Components/ui/card'

const STATUS_OPTIONS = [
  { value: 'PLACED', label: 'Placed' },
  { value: 'CONFIRMED', label: 'Confirmed' },
  { value: 'SHIPPED', label: 'Shipped' },
  { value: 'DELIVERED', label: 'Delivered' },
]

const STATUS_COLORS = {
  PLACED: 'bg-yellow-100 text-yellow-800',
  CONFIRMED: 'bg-blue-100 text-blue-800',
  SHIPPED: 'bg-purple-100 text-purple-800',
  DELIVERED: 'bg-green-100 text-green-800',
}

export default function OrderDetailModal({
  order,
  vendorId,
  onClose,
  onItemStatusUpdate,
}) {
  const [copied, setCopied] = useState(false)
  const [itemStatusMap, setItemStatusMap] = useState(() => {
    const map = {}
    order.items.forEach((i) => (map[i._id] = i.status))
    return map
  })

  const vendorItems = order.items.filter(
    (i) => String(i.vendorId) === String(vendorId)
  )
console.log("vendorId prop:", vendorId)
console.log("order items:", order.items)

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleUpdate = (itemId) => {
    if (itemStatusMap[itemId]) {
      onItemStatusUpdate(order._id, itemId, itemStatusMap[itemId])
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-6 border-b bg-background">
          <div>
            <h2 className="text-2xl font-bold">{order.orderNumber}</h2>
            <p className="text-sm text-muted-foreground">
              {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6 space-y-8">

          {/* Customer */}
          <section>
            <h3 className="font-semibold mb-2">Customer</h3>
            <p className="text-sm">{order.user?.name}</p>
            <p className="text-sm text-muted-foreground">{order.user?.email}</p>
          </section>

          {/* Address */}
          <section>
            <h3 className="font-semibold mb-2">Shipping Address</h3>
            <p className="text-sm text-muted-foreground">
              {order.address.line1},{order.address.line2},{order.address.city},{' '}
              {order.address.state} - {order.address.postalCode},
              {order.address.country}
            </p>
          </section>

          {/* Items (ONLY vendor items) */}
          <section>
            <h3 className="font-semibold mb-3">Items</h3>

            <div className="space-y-4">
              {vendorItems.map((item) => (
                <div
                  key={item._id}
                  className="flex gap-4 p-4 border rounded-xl"
                >
                  <img
                    src={item.image}
                    className="w-16 h-16 object-contain"
                  />

                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Qty: {item.qty} × ₹{item.price.toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground" >
                      {item.attributes.Color} - {item.attributes.Storage}
                    </p>

                    <div className="mt-3 flex items-center gap-3">
                      <select
                        value={itemStatusMap[item._id]}
                        onChange={(e) =>
                          setItemStatusMap((s) => ({
                            ...s,
                            [item._id]: e.target.value,
                          }))
                        }
                        className="px-3 py-2 border rounded-lg bg-background"
                      >
                        {STATUS_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>

                      {itemStatusMap[item._id] !== item.status && (
                        <Button
                          size="sm"
                          onClick={() => handleUpdate(item._id)}
                        >
                          Update
                        </Button>
                      )}
                    </div>

                    <span
                      className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[itemStatusMap[item._id]]}`}
                    >
                      {itemStatusMap[item._id]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Payment */}
          <section className="border-t pt-4">
            <p className="text-sm">
              Payment: <strong>{order.paymentMethod}</strong>
            </p>
            <p className="text-sm">
              Status:{' '}
              <strong
                className={
                  order.paymentStatus === 'PAID'
                    ? 'text-green-600'
                    : 'text-yellow-600'
                }
              >
                {order.paymentStatus}
              </strong>
            </p>
          </section>

        </div>
      </Card>
    </div>
  )
}
