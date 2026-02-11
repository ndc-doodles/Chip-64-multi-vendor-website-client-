"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import UserRow from "@/Admin/Components/Users/UserRow"
import { getUsersApi,unblockUserApi,blockUserApi } from "@/API/adminApi"
import { toast } from "sonner"

export default function AdminUsersContent() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)

  /* ---------------- FETCH USERS ---------------- */
  const fetchUsers = async () => {
    try {
      setLoading(true)
      const data = await getUsersApi()
      setUsers(data.users)
    } catch (error) {
      toast.error("Failed to load users")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  /* ---------------- ACTIONS ---------------- */
  const handleBlock = async (id) => {
    try {
      await blockUserApi(id)
      toast.success("User blocked")
      fetchUsers() // refresh list
    } catch {
      toast.error("Failed to block user")
    }
  }

  const handleUnblock = async (id) => {
    try {
      await unblockUserApi(id)
      toast.success("User unblocked")
      fetchUsers()
    } catch {
      toast.error("Failed to unblock user")
    }
  }

  return (
    <Card className="p-6 bg-white border-gray-200 shadow-sm">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Users</h3>
          <p className="text-sm text-gray-500">
            Manage registered users
          </p>
        </div>

        {loading ? (
          <p className="text-sm text-gray-500">Loading users...</p>
        ) : (
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Action</th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <UserRow
                    key={user._id}
                    user={{
                      ...user,
                      status: user.isBlocked ? "blocked" : "active",
                      joined: new Date(user.createdAt).toLocaleDateString(),
                    }}
                    onBlock={handleBlock}
                    onUnblock={handleUnblock}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Card>
  )
}
