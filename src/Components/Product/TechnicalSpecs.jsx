"use client";

export default function TechnicalSpecs({ variant }) {
  // variant.attributes is a Map or plain object
  const attributes = variant?.attributes
    ? Array.from(
        variant.attributes instanceof Map
          ? variant.attributes.entries()
          : Object.entries(variant.attributes)
      )
    : [];

  return (
    <div className="border-t border-border pt-10 md:mt-10 space-y-4 w-full">
      <h3 className="text-sm font-semibold text-foreground">
        Technical Specifications
      </h3>

      <div className="space-y-3">
        {attributes.length > 0 ? (
          attributes.map(([key, value]) => (
            <div
              key={key}
              className="flex justify-between text-sm"
            >
              <span className="text-muted-foreground capitalize">
                {key.replace(/_/g, " ")}
              </span>
              <span className="font-medium text-foreground">
                {value}
              </span>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">
            No specifications available
          </p>
        )}
      </div>
    </div>
  );
}
