export default function BrandList({ brands = [] }) {
  return (
    <section className="rounded-xl border border-border bg-card p-6">
      <h2 className="text-lg font-semibold mb-4">All Brands</h2>

      {brands.length === 0 ? (
        <p className="text-muted-foreground text-sm">
          No brands yet
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {brands.map((brand) => (
            <div
              key={brand._id}
              className="flex items-center gap-4 rounded-lg border border-border/50 bg-background p-4 hover:shadow-sm transition"
            >
              {/* Logo / Initials */}
              {brand.logo ? (
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="w-12 h-12 rounded-full object-cover border"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-sm font-semibold">
                  {brand.name.slice(0, 2).toUpperCase()}
                </div>
              )}

              {/* Info */}
              <div className="min-w-0">
                <p className="font-medium truncate">
                  {brand.name}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {brand.slug}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
