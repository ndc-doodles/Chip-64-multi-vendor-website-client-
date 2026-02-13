import { Link } from "react-router-dom";

export default function CartRecommendations({ products = [] }) {
  if (!products.length) return null;

  return (
    <div className="mt-8 px-2 sm:px-0">
      <h3 className="text-lg md:text-xl font-semibold mb-4">
        You may also like
      </h3>

      {/* ✅ Responsive grid */}
      <div
        className="
          grid
          grid-cols-2
          sm:grid-cols-3
          lg:grid-cols-4
          gap-3 md:gap-5
        "
      >
        {products.map((product) => (
          <div
            key={product._id}
            className="
              bg-white
              border
              rounded-xl
              p-3 md:p-4
              hover:shadow-md
              transition
              flex flex-col
            "
          >
            {/* Image */}
            <Link to={`/product/${product.slug}`}>
              <div className="aspect-square overflow-hidden rounded-lg bg-gray-50">
                <img
                  src={product.mainImage}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition"
                />
              </div>
            </Link>

            {/* Info */}
            <div className="mt-3 flex-1 space-y-1">
              <p className="text-xs md:text-sm font-medium line-clamp-2">
                {product.name}
              </p>

              <p className="text-sm md:text-base font-semibold">
                ₹{product.basePrice}
              </p>
            </div>

            {/* Action */}
            <Link to={`/product/${product.slug}`}>
              <button
                className="
                  mt-3
                  w-full
                  text-xs md:text-sm
                  border
                  rounded-lg
                  py-2.5
                  cursor-pointer
                  hover:bg-gray-50
                  active:scale-95
                  transition
                "
              >
                View Product
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
