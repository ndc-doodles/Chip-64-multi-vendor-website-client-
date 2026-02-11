import React from 'react'
import { AdminDashboardContent } from '@/Admin/Layout/Dashboard/AdminDashboardLayout'
import AdminSidebar from '@/Admin/Layout/Sidebar/AdminSidebarLayout'
import AdminHeader from '@/Admin/Components/Header/AdminHeader'
import AdminLayout from '@/Admin/Layout/AdminLayout'

function AdminDashboardPage() {
  return (
    <>
    
    <AdminLayout>
      <AdminDashboardContent/>
    </AdminLayout>

    
    </>
  )
}

export default AdminDashboardPage