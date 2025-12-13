import React, { useState } from 'react';
import AdminSidebar from '../Component/Common/AdminSidebar';
import DashboardStatsSection from '../Layout/Dashboard/DashboardStatsSection';
import RecentOrdersSection from '../Layout/Dashboard/RecentOrdersSection';
import TopCategoriesSection from '../Layout/Dashboard/TopCategoriesSection';
const AdminDashboardPage = () => {
  const [activeNav, setActiveNav] = useState('dashboard');

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <AdminSidebar activeItem={activeNav} onNavigate={setActiveNav} />

      {/* Main Content Area */}
      <div className="ml-64">
        {/* Top Bar */}
        

        {/* Dashboard Content */}
        <main className="px-12 py-12">
          {/* Page Header */}
          <div className="mb-16">
            <h1 className="text-5xl font-serif font-light mb-4 tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground text-lg">
              Welcome back. Here's what's happening with your store today.
            </p>
          </div>

          {/* Stats Section */}
          <DashboardStatsSection />

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <RecentOrdersSection />
            </div>
            <div className="lg:col-span-1">
              <TopCategoriesSection />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardPage;