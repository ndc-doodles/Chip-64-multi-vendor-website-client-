import { Button } from "@/components/ui/button";

export default function CollectionHeroBar({
  total,
  selectedBrands,
  onClear,
}) {
  return (
    <div
      className="
        flex flex-col md:flex-row
        md:items-center md:justify-between
        gap-4
        rounded-2xl
        border border-border
        bg-card
        px-6 py-4
      "
    >
      {/* LEFT */}
      <div>
        <p className="text-sm text-muted-foreground">
          Showing
        </p>
        <h2 className="text-lg font-semibold">
          {total} Products
        </h2>
      </div>

      {/* RIGHT */}
      <div className="flex flex-wrap items-center gap-2">
        {selectedBrands.length > 0 && (
          <span className="text-xs text-muted-foreground">
            Filters applied
          </span>
        )}

        {selectedBrands.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClear}
          >
            Clear filters
          </Button>
        )}
      </div>
    </div>
  );
}
