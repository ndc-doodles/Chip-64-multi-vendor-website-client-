import { Link } from "react-router-dom";

export default function RelatedProductCard({ product }) {
  const startingPrice =
    product.variants?.find(v => v.price !== null)?.price ??
    product.basePrice;

  return (
    <Link
      to={`/product/${product.slug}`}
      className="group block bg-white rounded-2xl border border-gray-200 overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative aspect-square bg-gray-100 overflow-hidden">
        <img
          src={product.mainImage}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <h3 className="font-serif text-base font-semibold text-gray-900 line-clamp-2">
          {product.name}
        </h3>

        <p className="text-sm text-gray-500">
          Starting from
        </p>

        <div className="text-lg font-semibold text-gray-900">
          ₹{startingPrice.toLocaleString()}
        </div>
      </div>
    </Link>
  );
}
