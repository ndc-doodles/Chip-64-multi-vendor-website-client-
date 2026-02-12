'use client'

import { ChevronDown } from 'lucide-react'
import { Button } from '@/Components/ui/button'
import { useState } from 'react'

export default function FilterPanel({
  statusFilter,
  onStatusChange,
  dateFilter,
  onDateChange,
}) {
  const [showStatusDropdown, setShowStatusDropdown] = useState(false)

  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'pending', label: 'Pending' },
    { value: 'processing', label: 'Processing' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'delivered', label: 'Delivered' },
  ]

  const currentStatusLabel =
    statusOptions.find((opt) => opt.value === statusFilter)?.label ||
    'All Statuses'

  return (
    <div className="flex gap-2">
      <div className="relative">
        <Button
          variant="outline"
          className="flex items-center gap-2 border border-border bg-transparent"
          onClick={() => setShowStatusDropdown((s) => !s)}
        >
          {currentStatusLabel}
          <ChevronDown className="w-4 h-4" />
        </Button>

        {showStatusDropdown && (
          <div className="absolute top-full right-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-lg z-10">
            {statusOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onStatusChange(option.value)
                  setShowStatusDropdown(false)
                }}
                className={`w-full text-left px-4 py-2 hover:bg-muted transition-colors ${
                  statusFilter === option.value
                    ? 'bg-primary/10 font-semibold text-primary'
                    : 'text-foreground'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
