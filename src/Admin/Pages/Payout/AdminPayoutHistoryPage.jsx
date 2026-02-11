import React from 'react'
import AdminLayout from '@/Admin/Layout/AdminLayout'
import PayoutManagement from '@/Admin/Layout/Payout/AdminPayoutLayout'
import PayoutHistory from '@/Admin/Layout/Payout/AdminPayoutHistoryLayout'

function AdminPayoutHistoryPage() {
  return (
    <AdminLayout>
        <PayoutHistory/>
    </AdminLayout>
  )
}

export default AdminPayoutHistoryPage