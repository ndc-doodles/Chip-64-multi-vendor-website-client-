import React from 'react';

const StatCard = ({ title, value, change, subtitle }) => {
  const isPositive = change >= 0;

  return (
    <div className="bg-card rounded-lg p-8 border border-border/50 shadow-sm hover:shadow-md transition-shadow duration-500">
      <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-6">
        {title}
      </p>
      
      <div className="mb-4">
        <h3 className="text-4xl font-serif font-light text-foreground">
          {value}
        </h3>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          {subtitle}
        </p>
        <span className={`text-xs font-medium ${isPositive ? 'text-green-700' : 'text-red-700'}`}>
          {isPositive ? '+' : ''}{change}%
        </span>
      </div>
    </div>
  );
};

export default StatCard;