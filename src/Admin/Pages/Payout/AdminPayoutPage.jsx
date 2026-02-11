import React from 'react'
import AdminSidebar from '@/Admin/Layout/Sidebar/AdminSidebarLayout'
import AdminHeader from '@/Admin/Components/Header/AdminHeader'
import AdminLayout from '@/Admin/Layout/AdminLayout'
import PayoutManagement from '@/Admin/Layout/Payout/AdminPayoutLayout'

function AdminPayoutPage() {
  return (
    <>
    
    <AdminLayout>
      <PayoutManagement/>
    </AdminLayout>

    </>
  )
}

export default AdminPayoutPage