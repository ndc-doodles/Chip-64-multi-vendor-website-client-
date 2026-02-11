import React from 'react';

const OrderStatusBadge = ({ status }) => {
  const styles = {
    completed: 'bg-green-50 text-green-800 border-green-200/50',
    processing: 'bg-amber-50 text-amber-800 border-amber-200/50',
    pending: 'bg-blue-50 text-blue-800 border-blue-200/50',
    cancelled: 'bg-red-50 text-red-800 border-red-200/50'
  };
  
  return (
    <span className={`inline-flex px-3 py-1 rounded-full text-xs tracking-wide border ${styles[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default OrderStatusBadge;