"use client"

import { Card } from "@/Components/ui/card"
import { Users, Store, ShoppingBag } from "lucide-react"

const stats = [
  {
    label: "Total Users",
    value: "1,247",
    icon: Users,
    change: "+12% from last month",
  },
  {
    label: "Vendors",
    value: "89",
    icon: Store,
    change: "+5 new this month",
  },
  {
    label: "Orders",
    value: "3,421",
    icon: ShoppingBag,
    change: "+18% from last month",
  },
]

export function AdminDashboardContent() {
  return (
    <div className="space-y-6">
      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card
              key={stat.label}
              className="p-6 bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                  <p className="text-3xl font-semibold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.change}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-gray-700" strokeWidth={2} />
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Table placeholder */}
      <Card className="p-6 bg-white border-gray-200 shadow-sm">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-4 py-4 text-sm text-gray-900">John Smith</td>
                  <td className="px-4 py-4 text-sm text-gray-600">New order placed</td>
                  <td className="px-4 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">
                      Completed
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">2 hours ago</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-4 py-4 text-sm text-gray-900">Emma Wilson</td>
                  <td className="px-4 py-4 text-sm text-gray-600">Product review submitted</td>
                  <td className="px-4 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                      Pending
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">5 hours ago</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-4 py-4 text-sm text-gray-900">Michael Brown</td>
                  <td className="px-4 py-4 text-sm text-gray-600">Vendor application</td>
                  <td className="px-4 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-50 text-yellow-700">
                      Review
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">1 day ago</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Card>

      {/* Empty state placeholder */}
      <Card className="p-12 bg-white border-gray-200 shadow-sm">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mx-auto">
            <ShoppingBag className="w-8 h-8 text-gray-400" strokeWidth={1.5} />
          </div>
          <h3 className="text-lg font-medium text-gray-900">No pending tasks</h3>
          <p className="text-sm text-gray-500 max-w-sm mx-auto">
            All systems running smoothly. Check back later for updates.
          </p>
        </div>
      </Card>
    </div>
  )
}
