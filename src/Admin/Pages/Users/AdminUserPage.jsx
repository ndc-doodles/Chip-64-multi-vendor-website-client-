import React from 'react'
import AdminSidebar from '@/Admin/Layout/Sidebar/AdminSidebarLayout'
import AdminHeader from '@/Admin/Components/Header/AdminHeader'
import AdminLayout from '@/Admin/Layout/AdminLayout'
import AdminUsersContent from '@/Admin/Layout/User/AdminUserList'

function AdminUserPage() {
  return (
    <>
    
    <AdminLayout>
      <AdminUsersContent/>
    </AdminLayout>

    </>
  )
}

export default AdminUserPage