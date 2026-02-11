'use client';

import { CheckCircle2 } from 'lucide-react';

export function SuccessHeader() {
  return (
    <div className="text-center mb-12">
      <div className="flex justify-center mb-6">
        <div className="relative">
          <div className="absolute inset-0 bg-accent/20 rounded-full blur-xl" />
          <CheckCircle2 className="w-20 h-20 text-accent relative z-10" strokeWidth={1.5} />
        </div>
      </div>
      
      <h1 className="text-4xl font-light text-foreground mb-3">
        Thank You for Your Order
      </h1>
      
      <p className="text-lg text-muted-foreground font-light">
        Your order has been confirmed and will be shipped soon.
      </p>
    </div>
  );
}
