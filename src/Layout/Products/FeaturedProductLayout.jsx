import React, { useEffect, useState } from "react";
import ProductCard from "@/Components/Cards/ProductFeaturedCard";
import { getUserProductsApi } from "@/API/userAPI";
import AuthRequiredModal from "@/Components/AuthModal/AuthModal";
import { useGoogleLogin } from "@react-oauth/google";
import { googleLoginApi } from "@/API/userAPI";
import { fetchWishlist } from "@/redux/actions/wishlistActions";
import { fetchCart } from "@/redux/actions/cartActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
const [authOpen, setAuthOpen] = useState(false);
const dispatch = useDispatch();
const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getUserProductsApi();
        // assuming backend returns { products: [] }
        setProducts(data.products || []);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  const handleGoogleLogin = useGoogleLogin({
  onSuccess: async (tokenResponse) => {
    const data = await googleLoginApi(tokenResponse.access_token);

    dispatch({
      type: "SET_USER",
      payload: {
        user: data.user,
        accessToken: data.accessToken,
      },
    });

    dispatch(fetchWishlist());
    dispatch(fetchCart());

    setAuthOpen(false);
  },
});


  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-[#8fee1a38] m-5 rounded-4xl">
      <h2 className="font-extrabold text-3xl md:text-4xl text-[#121212] mb-12 text-center">
        Featured <span className="text-primary">Products</span>
      </h2>

      {/* Loading */}
      {loading && (
        <p className="text-center text-sm text-muted-foreground">
          Loading products...
        </p>
      )}

      {/* Empty */}
      {!loading && products.length === 0 && (
        <p className="text-center text-sm text-muted-foreground">
          No products available
        </p>
      )}

      {/* Products */}
      {!loading && products.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto ">
          {products.map((product) => (
         <ProductCard
  key={product._id}
  id={product._id}
  raw={product}
  name={product.name.toUpperCase()}
  vendor={product.vendorId?.name}
  price={product.basePrice}
  image={product.mainImage}
  slug={product.slug}
  onRequireAuth={() => setAuthOpen(true)} // ✅ PASS HERE
/>

          ))}
        </div>
      )}

      <AuthRequiredModal
  open={authOpen}
  onClose={() => setAuthOpen(false)}
  onGoogleLogin={handleGoogleLogin}
  onEmailLogin={() => navigate("/login")}
/>

    </section>
  );
}
