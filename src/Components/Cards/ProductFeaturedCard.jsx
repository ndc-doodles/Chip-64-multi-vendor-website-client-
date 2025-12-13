export default function ProductCardFeatured({ id, name, price, image, onAddToCart }) {
  return (
    <div className="group animate-fade-in">
      <div className="relative overflow-hidden rounded-sm bg-background mb-4 aspect-3/4">
        <img
          src={image || "/placeholder.svg"}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Add to Cart Button */}
        <button
          onClick={() => onAddToCart?.(id)}
          className="absolute bottom-4 right-4 w-10 h-10 bg-primary/90 hover:bg-primary text-primary-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      <div className="space-y-2">
        <h3 className="font-serif text-lg font-light text-foreground uppercase tracking-widest">
          {name}
        </h3>
        <p className="text-accent font-light text-sm">{price}</p>
      </div>
    </div>
  );
}
