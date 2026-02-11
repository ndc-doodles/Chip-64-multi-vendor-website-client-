"use client";

import { Clock, Truck, Package, CheckCircle } from "lucide-react";

export function NextSteps({ status = "CONFIRMED" }) {
  const steps = [
    {
      key: "CONFIRMED",
      icon: Clock,
      title: "Order Confirmed",
      description: "Your payment has been processed successfully.",
    },
    {
      key: "PACKED",
      icon: Package,
      title: "Preparing to Ship",
      description: "Your items are being picked and packed.",
    },
    {
      key: "SHIPPED",
      icon: Truck,
      title: "Shipped",
      description: "Your package will be on its way soon.",
    },
    {
      key: "DELIVERED",
      icon: CheckCircle,
      title: "Delivered",
      description: "Expected arrival by December 24.",
    },
  ];

  const currentIndex = steps.findIndex(
    (step) => step.key === status
  );
  console.log("STATUS:", status);
console.log("INDEX:", currentIndex);

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-light">What's Next</h2>

      <div className="space-y-8">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index === currentIndex;
          const isCompleted = index < currentIndex;

          return (
            <div key={step.key} className="flex gap-6">
              {/* TIMELINE */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center
                    ${
                      isActive
                        ? "bg-primary text-white"
                        : isCompleted
                        ? "bg-primary/20 text-primary"
                        : "bg-gray-100 text-gray-400"
                    }`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                {/* VERTICAL LINE */}
              {index < steps.length - 1 && (
  <div
    className={`w-0.5 h-12 mt-2 ${
      index <= currentIndex
        ? "bg-primary"
        : "bg-border"
    }`}
  />
)}
              </div>

              {/* CONTENT */}
              <div className="pt-1">
                <h3 className="font-medium text-foreground">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
