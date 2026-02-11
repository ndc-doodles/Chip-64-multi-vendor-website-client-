"use client"

import { Link } from "react-router-dom"

export default function SellerAgreements({ values, onChange }) {
  const items = [
    {
      key: "sellerAgreement",
      label: "Seller Agreement",
      path: "/legal/seller-agreement",
      prefix: "I agree to the",
    },
    {
      key: "commission",
      label: "Commission Rates",
      path: "/legal/commission",
      prefix: "I accept the",
    },
    {
      key: "returns",
      label: "Return & Refund Policy",
      path: "/legal/returns",
      prefix: "I agree to the",
    },
    {
      key: "rules",
      label: "Platform Rules",
      path: "/legal/platform-rules",
      prefix: "I agree to follow the",
    },
  ]

  return (
    <div className="space-y-4 text-sm">
      {items.map((item) => (
        <label
          key={item.key}
          className="flex items-start gap-3 leading-snug cursor-pointer"
        >
          {/* Checkbox */}
          <input
            type="checkbox"
            checked={values[item.key]}
            onChange={(e) =>
              onChange(item.key, e.target.checked)
            }
            className="mt-0.5"
          />

          {/* Text + Link */}
          <span className="text-foreground/80">
            {item.prefix}{" "}
            <Link
              to={item.path}
              className="text-primary underline underline-offset-4 hover:opacity-80"
              onClick={(e) => e.stopPropagation()}
            >
              {item.label}
            </Link>
          </span>
        </label>
      ))}
    </div>
  )
}
