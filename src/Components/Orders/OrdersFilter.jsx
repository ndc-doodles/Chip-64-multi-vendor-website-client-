import { Button } from "@/Components/ui/button";

export function OrdersFilter({
  statusFilter,
  paymentFilter,
  onStatusChange,
  onPaymentChange,
}) {
  const statusOptions = ["ALL", "PLACED", "CONFIRMED", "SHIPPED", "DELIVERED"];
  const paymentOptions = ["ALL", "PAID", "PENDING"];

  return (
    <div className="mb-6 sm:mb-10 space-y-5 sm:space-y-6 overflow-hidden">

      {/* ================= ORDER STATUS ================= */}
      <div className="space-y-2">
        <p className="text-xs font-medium tracking-wide text-muted-foreground">
          ORDER STATUS
        </p>

        {/* 
          ✅ Mobile: horizontal scroll
          ✅ Desktop: unchanged inline layout
        */}
        <div
          className="
            -mx-4 px-4
            overflow-x-auto
            overflow-hidden
            sm:overflow-visible sm:px-0 sm:mx-0
            
          "
        >
          <div className="inline-flex min-w-max rounded-xl border border-border bg-muted/40 p-1 gap-1 overflow-hidden">
            {statusOptions.map((status) => {
              const active =
                statusFilter === status ||
                (status === "ALL" && statusFilter === "all");

              return (
                <Button
                  key={status}
                  onClick={() =>
                    onStatusChange(status === "ALL" ? "all" : status)
                  }
                  variant="ghost"
                  className={`
                    px-4 py-2 text-sm rounded-lg transition-all whitespace-nowrap
                    ${
                      active
                        ? "bg-background shadow-sm text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }
                  `}
                >
                  {status}
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ================= PAYMENT STATUS ================= */}
      <div className="space-y-2">
        <p className="text-xs font-medium tracking-wide text-muted-foreground">
          PAYMENT STATUS
        </p>

        <div
          className="
            -mx-4 px-4
            overflow-x-auto
            sm:overflow-visible sm:px-0 sm:mx-0
          "
        >
          <div className="inline-flex min-w-max rounded-xl border border-border bg-muted/40 p-1 gap-1">
            {paymentOptions.map((payment) => {
              const active =
                paymentFilter === payment ||
                (payment === "ALL" && paymentFilter === "all");

              return (
                <Button
                  key={payment}
                  onClick={() =>
                    onPaymentChange(payment === "ALL" ? "all" : payment)
                  }
                  variant="ghost"
                  className={`
                    px-4 py-2 text-sm rounded-lg transition-all whitespace-nowrap
                    ${
                      active
                        ? "bg-background shadow-sm text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }
                  `}
                >
                  {payment}
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
