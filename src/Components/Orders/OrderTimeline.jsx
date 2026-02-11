const STEPS = ["PLACED", "CONFIRMED", "SHIPPED", "OUT_FOR_DELIVERY", "DELIVERED"];

export default function OrderTimeline({ status }) {
  const currentIndex = STEPS.indexOf(status);

  return (
    <div className="bg-white rounded-xl p-6 border">
      <div className="flex items-center justify-between">
        {STEPS.map((step, index) => (
          <div key={step} className="flex-1 flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`h-4 w-4 rounded-full ${
                  index <= currentIndex ? "bg-secondary" : "bg-gray-300"
                }`}
              />
              <span className="text-xs mt-2 text-center capitalize">
                {step.replaceAll("_", " ").toLowerCase()}
              </span>
            </div>

            {index !== STEPS.length - 1 && (
              <div
                className={`flex-1 h-[2px] mx-2 ${
                  index < currentIndex ? "bg-secondary" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
