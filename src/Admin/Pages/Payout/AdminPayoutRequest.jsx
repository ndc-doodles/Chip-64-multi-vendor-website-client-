import React from 'react'
import AdminSidebar from '@/Admin/Layout/Sidebar/AdminSidebarLayout'
import AdminHeader from '@/Admin/Components/Header/AdminHeader'
import AdminLayout from '@/Admin/Layout/AdminLayout'
import PayoutManagement from '@/Admin/Layout/Payout/AdminPayoutLayout'
import AdminPayoutRequests from '@/Admin/Layout/Payout/AdminPayoutRequest'

function AdminPayoutRequestPage() {
  return (
    <>
    
    <AdminLayout>
      <AdminPayoutRequests/>
    </AdminLayout>

    </>
  )
}

export default AdminPayoutRequestPage