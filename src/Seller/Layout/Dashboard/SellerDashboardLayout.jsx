'use client'

import {
  Search,
  Bell,
  Package,
  Truck,
  Check,
  Clock,
  MoreHorizontal,
} from 'lucide-react'
import { StatCard } from '@/Seller/Component/Dashboard/StatCard'
import { Card } from '@/Seller/Component/Dashboard/DashboardCard'
import { TopProduct } from '@/Seller/Component/Dashboard/TopProduct'
import { StockItem } from '@/Seller/Component/Dashboard/StockItem'
import { OrderRow } from '@/Seller/Component/Dashboard/OrderRow'
import { useState,useEffect } from 'react'
import { getVendorDashboardApi } from '@/API/vendorApi'
import OrderDetailModal from '@/Seller/Component/Orders/OrderDetailModal'
import { useSelector } from 'react-redux'
import { getVendorOrderByIdApi } from '@/API/vendorApi'
import SalesChart from '@/Seller/Component/Dashboard/SalesChart'
import { useNavigate } from 'react-router-dom'
/* ================================
   SELLER DASHBOARD (CONTENT ONLY)
================================ */
export default function SellerDashboard() {
    const [dashboard,setDashboard]=useState(null)
    const [loading,setLoading]=useState(true)
      const [selectedOrder, setSelectedOrder] = useState(null)
      const vendor=useSelector((state)=>state.vendor.vendor)
      const navigate=useNavigate()
      const handleManageOrder = async (orderId) => {
  try {
    const res = await getVendorOrderByIdApi(orderId) // 🔥 FULL ORDER
    setSelectedOrder(res.order)
  } catch (err) {
    console.error(err)
  }
}


    useEffect(()=>{
        const loadDashboard=async()=>{
            try{
  const data=await getVendorDashboardApi()
           setDashboard(data)
            }
            catch(err){
                console.log(err)
            }
            finally{
                setLoading(false)
            }
         
        }
        loadDashboard()
    },[])
    if (loading) return <p className="p-8">Loading dashboard...</p>;
    console.log("selectedOrder", selectedOrder);
const salesChartData = [...dashboard.recentOrders]
  .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
  .map(order => ({
    date: new Date(order.createdAt).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
    }),
    revenue: order.items.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    ),
  }));


  return (
    
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#0f172a] text-slate-900 dark:text-slate-100">

      {/* MAIN CONTENT */}
      <main className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">

        {/* ================= HEADER ================= */}
        <header className="h-16 bg-white/80 dark:bg-[#0f172a]/80 backdrop-blur-md
          border border-slate-200 dark:border-slate-800 rounded-xl
          px-6 flex items-center justify-between">
          
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              placeholder="Search orders, products..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800
                text-sm outline-none focus:ring-2 ring-[#39b02c]/30"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="w-9 h-9 rounded-full bg-[#39b02c]/10 border border-[#39b02c]/30
              flex items-center justify-center font-bold text-[#39b02c]">
              V
            </div>
          </div>
        </header>

        {/* ================= STATS ================= */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <StatCard label="Total Orders" value={dashboard.stats.totalOrders} />
          <StatCard label="Placed" value={dashboard.stats.placed} icon={<Package />} />
          <StatCard label="Confirmed" value={dashboard.stats.confirmed} icon={<Clock />} />
          <StatCard label="Shipped" value={dashboard.stats.shipped} icon={<Truck />} />
          <StatCard label="Delivered" value={dashboard.stats.delivered} icon={<Check />} />
        </section>

        {/* ================= ANALYTICS + SIDE ================= */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* SALES */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 border
            border-slate-200 dark:border-slate-800 rounded-2xl p-6">
            <div className="flex justify-between mb-4">
              <h3 className="font-bold text-lg">Sales Performance</h3>
              <select className="text-xs font-bold bg-slate-100 dark:bg-slate-800
                rounded-lg px-3 py-1">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
              </select>
            </div>

          <div className="h-64 rounded-xl bg-slate-50 dark:bg-slate-800/50
  border border-slate-200 dark:border-slate-700 p-2">
  <SalesChart data={salesChartData} />
</div>

          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">

            {/* STOCK ALERTS */}
      
<Card title="Stock Alerts">
  {dashboard.lowStockProducts.length > 0 ? (
    dashboard.lowStockProducts.map((p) => (
      <StockItem
        key={p._id}
        name={p.name}
        stock={p.stock}
      />
    ))
  ) : (
    <p className="text-sm text-muted-foreground">
      No low stock products 🎉
    </p>
  )}
</Card>


            {/* PAYOUT */}
            <div className="bg-gradient-to-br from-[#39b02c] to-[#2d8a22]
              rounded-2xl p-6 text-white">
              <p className="text-xs font-bold uppercase opacity-80">
                Pending Payout
              </p>
              <h2 className="text-3xl font-black mt-2">₹18,450</h2>
              <button className="w-full mt-4 bg-white/20 py-2 rounded-xl
                text-sm font-bold hover:bg-white/30">
                Request Withdrawal
              </button>
            </div>

           <Card title="Top Products">
  {dashboard.topProducts.map(p => (
    <TopProduct
      key={p._id}
      name={p.name}
      sold={p.sold}
      revenue={`₹${p.revenue}`}
    />
  ))}
</Card>

          </div>
        </section>

        {/* ================= RECENT ORDERS ================= */}
       <section
  className="bg-white dark:bg-slate-900 border
  border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden"
>
  {/* HEADER */}
  <div className="p-4 md:p-6 flex justify-between items-center border-b">
    <h3 className="font-bold text-base md:text-lg">Recent Orders</h3>
    <button className="text-[#39b02c] text-xs md:text-sm font-bold" onClick={()=>navigate("/seller/orders")}>
      View All
    </button>
  </div>

  {/* TABLE WRAPPER (important for mobile scroll) */}
  <div className="w-full overflow-x-auto">
    <table className="w-full min-w-[520px]">
      
      {/* HEAD */}
      <thead className="bg-slate-50 dark:bg-slate-800 text-[10px] md:text-xs uppercase font-black">
        <tr>
          <th className="px-3 py-2 md:px-6 md:py-3 text-left">Order</th>
          <th className="px-3 py-2 md:px-6 md:py-3 text-left">Product</th>
          <th className="px-3 py-2 md:px-6 md:py-3 text-left">Status</th>
          <th className="px-3 py-2 md:px-6 md:py-3 text-right">View</th>
        </tr>
      </thead>

      {/* BODY */}
      
     <tbody>
  {dashboard.recentOrders.length === 0 ? (
    <tr>
      <td colSpan="4">
        <div className="flex flex-col items-center justify-center py-16 text-center">

          <Package className="w-10 h-10 text-gray-300 mb-3" />

          <p className="text-sm font-semibold text-gray-700">
            No orders yet
          </p>

          <p className="text-xs text-gray-400 mt-1">
            Orders will appear once customers purchase your products
          </p>

        </div>
      </td>
    </tr>
  ) : (
    dashboard.recentOrders.map((o) => (
      <OrderRow
        key={o._id}
        id={o.orderNumber}
        product={o.items || "—"}
        status={o.status}
        onManage={() => handleManageOrder(o._id)}
      />
    ))
  )}
</tbody>

    </table>
  </div>
</section>

        {selectedOrder && (
  <OrderDetailModal
    order={selectedOrder}
    vendorId={vendor.id}
    onClose={() => setSelectedOrder(null)}
    onItemStatusUpdate={() => {
      setSelectedOrder(null)
    }}
  />
)}

      </main>
    </div>
  )
}





