'use client'

import { useEffect, useMemo, useState } from 'react'
import { Search, Clock, Check, Truck, Package, Filter, ListFilter } from 'lucide-react'
import { Card } from '@/Components/ui/card'
import OrderListTable from '@/Seller/Component/Orders/OrderList'
import OrderDetailModal from '@/Seller/Component/Orders/OrderDetailModal'
import FilterPanel from '@/Seller/Component/Orders/FIlterPanel'
import { getVendorOrdersApi, updateOrderItemStatusApi } from '@/API/vendorApi'
import { useSelector } from 'react-redux'
import VendorSidebar from '@/Seller/Component/Common/VendorSidebar'

export default function SellerOrderLayout() {
  const vendor = useSelector((s) => s.vendor.vendor)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  /* ---------------- FETCH ORDERS ---------------- */
  const loadOrders = async () => {
    try {
      setLoading(true)
      const data = await getVendorOrdersApi()
      setOrders(data || [])
    } catch (err) {
      console.error('Failed to load vendor orders', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (vendor?.id) loadOrders()
  }, [vendor?.id])

  /* ---------------- STATUS UPDATE ---------------- */
  const handleItemStatusUpdate = async (orderId, itemId, status) => {
    try {
      await updateOrderItemStatusApi(orderId, itemId, status)
      await loadOrders()
      setSelectedOrder(null)
    } catch (err) {
      console.error("Failed to update item status", err)
    }
  }

  /* ---------------- FILTERING LOGIC ---------------- */
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.user?.name?.toLowerCase().includes(searchTerm.toLowerCase())

      const vendorStatuses = order.items.map((i) => i.status)
      const derivedStatus =
        vendorStatuses.every((s) => s === 'DELIVERED') ? 'DELIVERED' :
        vendorStatuses.some((s) => s === 'SHIPPED') ? 'SHIPPED' :
        vendorStatuses.some((s) => s === 'CONFIRMED') ? 'CONFIRMED' : 'PLACED'

      return matchesSearch && (statusFilter === 'all' || derivedStatus === statusFilter)
    })
  }, [orders, searchTerm, statusFilter])

  const statusStats = useMemo(() => {
    const stats = { PLACED: 0, CONFIRMED: 0, SHIPPED: 0, DELIVERED: 0 }
    orders.forEach((order) => {
      const statuses = order.items.map((i) => i.status)
      if (statuses.every((s) => s === 'DELIVERED')) stats.DELIVERED++
      else if (statuses.some((s) => s === 'SHIPPED')) stats.SHIPPED++
      else if (statuses.some((s) => s === 'CONFIRMED')) stats.CONFIRMED++
      else stats.PLACED++
    })
    return stats
  }, [orders])

  return (
<div className="w-full bg-[#FAFAFA]">
    

      <main className="flex-1 p-6 md:p-10">
        <div className="max-w-7xl mx-auto space-y-10">
          
          {/* HEADER AREA */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-[#39b02c] font-bold tracking-widest text-xs uppercase italic"></span>
              <h1 className="text-4xl font-black text-[#39b02c] mt-1">Order Pipeline</h1>
              <p className="text-gray-500 text-sm mt-2 font-medium">Track and fulfill vendor-specific items</p>
            </div>
            <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-gray-100 shadow-sm">
               <button className="px-4 py-2 text-xs font-bold bg-[#39b02c] text-white rounded-xl shadow-md shadow-[#39b02c]/20">Active Orders</button>
               <button className="px-4 py-2 text-xs font-bold text-gray-400 hover:text-gray-600 transition-colors">Archived</button>
            </div>
          </div>

          {/* STATUS CARDS GRID */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <StatusCard label="New Orders" value={statusStats.PLACED} icon={Package} color="text-amber-500" bg="bg-amber-50" />
            <StatusCard label="Processing" value={statusStats.CONFIRMED} icon={Clock} color="text-blue-500" bg="bg-blue-50" />
            <StatusCard label="In Transit" value={statusStats.SHIPPED} icon={Truck} color="text-purple-500" bg="bg-purple-50" />
            <StatusCard label="Completed" value={statusStats.DELIVERED} icon={Check} color="text-[#39b02c]" bg="bg-[#39b02c]/10" />
          </div>

          {/* FILTER TOOLBAR */}
          <div className="flex flex-col md:flex-row gap-4 items-center bg-white p-4 rounded-[24px] border border-gray-100 shadow-sm">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search ID, customer name..."
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 ring-[#39b02c]/10 transition-all outline-none text-sm"
              />
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="h-10 w-px bg-gray-100 hidden md:block mx-2" />
              <FilterPanel
                statusFilter={statusFilter}
                onStatusChange={setStatusFilter}
                dateFilter="all"
                onDateChange={() => {}}
              />
            </div>
          </div>

          {/* MAIN TABLE AREA */}
          <div className="bg-white rounded-[32px] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)] overflow-hidden">
            <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <ListFilter size={18} className="text-[#39b02c]" />
                    Order Manifest
                </h3>
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Showing {filteredOrders.length} Results</span>
            </div>
            
            <div className="overflow-hidden">
                <OrderListTable
                    orders={filteredOrders}
                    vendorId={vendor?.id}
                    onViewOrder={setSelectedOrder}
                />
            </div>

          {filteredOrders.length === 0 && (
  <div className="p-20 text-center">

    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
      <Package size={32} className="text-gray-200" />
    </div>

    {/* 🟢 NO ORDERS AT ALL */}
    {orders.length === 0 ? (
      <>
        <p className="text-gray-700 font-semibold text-sm">
          No orders yet
        </p>

        <p className="text-gray-400 text-xs mt-2">
          Orders will appear here once customers purchase your products
        </p>
      </>
    ) : (
      /* 🟡 FILTER EMPTY */
      <>
        <p className="text-gray-400 font-medium">
          No results match your current filters
        </p>

        <button
          onClick={() => {
            setSearchTerm('')
            setStatusFilter('all')
          }}
          className="mt-4 text-[#39b02c] text-sm font-bold"
        >
          Clear all filters
        </button>
      </>
    )}

  </div>
)}

          </div>
        </div>
      </main>

      {/* ORDER MODAL */}
      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          vendorId={vendor?.id}
          onClose={() => setSelectedOrder(null)}
          onItemStatusUpdate={handleItemStatusUpdate}
        />
      )}
    </div>
  )
}

function StatusCard({ label, value, icon: Icon, color, bg }) {
  return (
    <div className="bg-white p-6 rounded-[28px] border border-gray-100 shadow-sm hover:shadow-md transition-all group">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.1em] text-gray-400 mb-1">{label}</p>
          <p className="text-3xl font-black text-gray-900 tracking-tight">{value}</p>
        </div>
        <div className={`p-3 rounded-2xl ${bg} ${color} transition-transform group-hover:scale-110`}>
          <Icon size={22} strokeWidth={2.5} />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#39b02c]" />
          <span className="text-[10px] font-bold text-gray-400">Live Sync</span>
      </div>
    </div>
  )
}