import AdminSidebar from "./Sidebar/AdminSidebarLayout"
import AdminHeader from "../Components/Header/AdminHeader"

export default function AdminLayout({ children }) {
  console.log("ADMIN LAYOUT MOUNTED");

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <aside className="w-64 shrink-0">
        <AdminSidebar />
      </aside>

      {/* MAIN */}
      <div className="flex flex-col flex-1">

        {/* HEADER */}
        <AdminHeader />

        {/* CONTENT */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>

      </div>
    </div>
  )
}
