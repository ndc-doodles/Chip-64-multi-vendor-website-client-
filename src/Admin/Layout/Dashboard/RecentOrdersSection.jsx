import React from 'react';
import OrderStatusBadge from '@/Admin/Component/Dashboard/OrderStatusbadge';


const RecentOrdersSection = () => {
  const orders = [
    { 
      id: 'ORD-2847', 
      customer: 'Emma Thompson', 
      product: 'Classic Leather Tote', 
      amount: '$489', 
      status: 'completed', 
      date: 'Dec 8, 2025' 
    },
    { 
      id: 'ORD-2846', 
      customer: 'James Wilson', 
      product: 'Executive Briefcase', 
      amount: '$725', 
      status: 'processing', 
      date: 'Dec 8, 2025' 
    },
    { 
      id: 'ORD-2845', 
      customer: 'Sophia Martinez', 
      product: 'Vintage Wallet Set', 
      amount: '$189', 
      status: 'pending', 
      date: 'Dec 7, 2025' 
    },
    { 
      id: 'ORD-2844', 
      customer: 'Oliver Chen', 
      product: 'Laptop Sleeve', 
      amount: '$145', 
      status: 'completed', 
      date: 'Dec 7, 2025' 
    },
    { 
      id: 'ORD-2843', 
      customer: 'Isabella Brown', 
      product: 'Travel Duffel', 
      amount: '$599', 
      status: 'cancelled', 
      date: 'Dec 6, 2025' 
    }
  ];

  return (
    <section className="mb-12">
      <div className="bg-card rounded-lg border border-border/50 shadow-sm overflow-hidden">
        <div className="px-8 py-6 border-b border-border/50">
          <h2 className="text-xl font-serif font-light">Recent Orders</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/30">
                <th className="px-8 py-4 text-left text-xs uppercase tracking-[0.15em] text-muted-foreground font-normal">
                  Order ID
                </th>
                <th className="px-8 py-4 text-left text-xs uppercase tracking-[0.15em] text-muted-foreground font-normal">
                  Customer
                </th>
                <th className="px-8 py-4 text-left text-xs uppercase tracking-[0.15em] text-muted-foreground font-normal">
                  Product
                </th>
                <th className="px-8 py-4 text-left text-xs uppercase tracking-[0.15em] text-muted-foreground font-normal">
                  Amount
                </th>
                <th className="px-8 py-4 text-left text-xs uppercase tracking-[0.15em] text-muted-foreground font-normal">
                  Status
                </th>
                <th className="px-8 py-4 text-left text-xs uppercase tracking-[0.15em] text-muted-foreground font-normal">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr 
                  key={order.id} 
                  className={`border-b border-border/20 hover:bg-muted/30 transition-colors duration-300 ${
                    index === orders.length - 1 ? 'border-b-0' : ''
                  }`}
                >
                  <td className="px-8 py-5 text-sm text-accent">{order.id}</td>
                  <td className="px-8 py-5 text-sm">{order.customer}</td>
                  <td className="px-8 py-5 text-sm text-muted-foreground">{order.product}</td>
                  <td className="px-8 py-5 text-sm font-medium">{order.amount}</td>
                  <td className="px-8 py-5">
                    <OrderStatusBadge status={order.status} />
                  </td>
                  <td className="px-8 py-5 text-sm text-muted-foreground">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default RecentOrdersSection;