import React from 'react'

import AdminLayout from '@/Admin/Layout/AdminLayout'
import AdminWallet from '@/Admin/Layout/Wallet/AdminWalletLayout'
function AdminWalletPage() {
  return (
    <AdminLayout>
        <AdminWallet/>
    </AdminLayout>
  )
}

export default AdminWalletPage