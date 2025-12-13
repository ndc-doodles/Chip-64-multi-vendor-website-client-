import React from 'react';
import StatCard from '@/Admin/Component/Dashboard/StatCard';

const DashboardStatsSection = () => {
  const stats = [
    { 
      title: 'Total Orders', 
      value: '2,847', 
      change: 12.5, 
      subtitle: 'This month' 
    },
    { 
      title: 'Revenue', 
      value: '$284,750', 
      change: 8.2, 
      subtitle: 'Last 30 days' 
    },
    { 
      title: 'New Customers', 
      value: '1,429', 
      change: 15.3, 
      subtitle: 'This month' 
    },
    { 
      title: 'Products', 
      value: '342', 
      change: 4.1, 
      subtitle: 'Active listings' 
    }
  ];

  return (
    <section className="mb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
    </section>
  );
};

export default DashboardStatsSection;