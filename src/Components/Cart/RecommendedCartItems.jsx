import { Link } from "react-router-dom";

export default function CartRecommendations({ products = [] }) {
  if (!products.length) return null;
  console.log(products)

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4">
        You may also like
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white border rounded-xl p-3 hover:shadow-sm transition"
          >
            {/* Image */}
            <Link to={`/product/${product.slug}`}>
              <img
                src={product.mainImage}
                alt={product.name}
                className="w-full h-36 object-contain rounded-lg"
              />
            </Link>

            {/* Info */}
            <div className="mt-3 space-y-1">
              <p className="text-sm font-medium line-clamp-2">
                {product.name}
              </p>

              <p className="text-sm font-semibold">
                ₹{product.basePrice}
              </p>
            </div>

            {/* Action */}
            <Link to={`/product/${product.slug}`}>
              <button className="mt-3 w-full text-sm border rounded-lg py-2 hover:bg-gray-50">
                View Product
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}