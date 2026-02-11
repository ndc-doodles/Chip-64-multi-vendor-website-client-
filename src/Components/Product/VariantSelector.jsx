"use client";

export default function VariantSelector({
  options = [],
  selected,
  onSelect,
}) {
  if (!options.length) return null;

  return (
    <div className="space-y-4 border-t border-border pt-6">
      <h3 className="text-sm font-semibold">Color</h3>

      <div className="flex flex-wrap gap-4">
        {options.map((color) => {
          const isSelected =
            selected?.toLowerCase() === color?.toLowerCase();

          return (
            <button
              key={color}
              type="button"
              onClick={() => onSelect(color)}
              className="relative"
            >
              <div
                className={`w-11 h-11 rounded-full border-2 transition-all
                  ${
                    isSelected
                      ? "ring-2 ring-primary ring-offset-2 border-primary"
                      : "border-border hover:border-foreground"
                  }
                `}
                style={{
                  backgroundColor: color,
                }}
              />

              <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-xs opacity-0 hover:opacity-100 transition bg-foreground text-background px-2 py-1 rounded">
                {color}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
