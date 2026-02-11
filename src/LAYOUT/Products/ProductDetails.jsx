"use client";
import { useState, useMemo ,useEffect} from "react";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ImageGallery from "@/Components/Product/ImageGallery";
import VariantSelector from "@/Components/Product/VariantSelector";
import TechnicalSpecs from "@/Components/Product/TechnicalSpecs";
import { addToCart } from "@/API/userAPI";
import StorageSelector from "@/Components/Product/StorageSelector";
import { toast } from "sonner";
import { getRelatedProductsApi } from "@/API/userAPI";
import RelatedProductCard from "@/Components/Cards/RelatableProductCard";
import { Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "@/redux/actions/wishlistActions";
import { isVariantWishlisted } from "@/Utils/WishlistUtils";
import { fetchCart } from "@/redux/actions/cartActions";
import AuthRequiredModal from "@/Components/AuthModal/AuthModal";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { googleLoginApi } from "@/API/userAPI";
import { fetchWishlist } from "@/redux/actions/wishlistActions";
import { useNavigate } from "react-router-dom";
import HeaderLayout from "../Header/HeaderLayout";
import ProductReviews from "../Review/ProductReviews";
import { buyNowApi } from "@/API/userAPI";

export default function ProductDetail({ product }) {
  const dispatch=useDispatch()
  const { user, accessToken } = useSelector((s) => s.user);
  const [authOpen, setAuthOpen] = useState(false);
  const navigate=useNavigate()

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const data = await googleLoginApi(tokenResponse.access_token)

        dispatch({
          type: "SET_USER",
          payload: {
            user: data.user,
            accessToken: data.accessToken,
          },
        });
          dispatch(fetchWishlist());
          dispatch(fetchCart());



        toast.success("Welcome back ");
        navigate("/home");
      } catch (error) {
        console.error(error);
        toast.error("Google login failed");
      }
    },
    onError: () => {
      toast.error("Google Login cancelled");
    },
  });

  const handleAddToCart = async () => {
  try {
     if (!user || !accessToken) {
    setAuthOpen(true); 
    return;
  }
    console.log(product)
    const payload = {
      productId: product._id,
      vendorId: product.vendorId,
      name: product.name,
      slug: product.slug,
      image:
        activeVariant.images?.[0] ,
        variantId: activeVariant._id, 
      price:
        activeVariant.price ?? product.basePrice,
      qty: quantity,
      attributes: 
        activeVariant.attributes
      
    };

    await addToCart(payload);
    dispatch(fetchCart())
    toast.success("Added to cart");
  } catch (err) {
    toast.error(err?.response?.data?.message || "Failed to add to cart");
  }
};
const slug=product.slug
  // ✅ use INDEX instead of id
  const [selectedColor, setSelectedColor] = useState(
  product.variants?.[0]?.attributes?.Color
);

const [selectedStorage, setSelectedStorage] = useState(
  product.variants?.[0]?.attributes?.Storage
);

  const [quantity, setQuantity] = useState(1);
const selectedVariant = useMemo(() => {
  return product.variants.find(
    (v) =>
      v.attributes?.Color === selectedColor &&
      v.attributes?.Storage === selectedStorage
  ) || null;
}, [selectedColor, selectedStorage, product]);
const activeVariant = selectedVariant ?? product.variants?.[0];


const colorOptions = useMemo(() => {
  const colors = product.variants
    ?.map(v => v.attributes?.color ?? v.attributes.Color)
    .filter(Boolean);

  return [...new Set(colors)];
}, [product]);


const storageOptions = useMemo(() => {
  if (!selectedColor) return [];

  const storage = product.variants
    .filter(v => v.attributes?.Color === selectedColor)
    .map(v => v.attributes?.Storage)
    .filter(Boolean);

  return [...new Set(storage)];
}, [product, selectedColor]);

  const displayPrice =
    activeVariant.price !== null
      ? activeVariant.price
      : product.basePrice;

  const stockStatus =
    activeVariant.stock === 0
      ? "Out of stock"
      : activeVariant.stock < 5
      ? "Low stock"
      : "In stock";

  const stockStatusColor =
   activeVariant.stock === 0
      ? "destructive"
      : activeVariant.stock < 5
      ? "secondary"
      : "default";

  const handleQuantityChange = (delta) => {
    const newQuantity = Math.max(
      1,
      Math.min(quantity + delta, activeVariant.stock)
    );
    setQuantity(newQuantity);
  };
   const [related, setRelated] = useState([]);

useEffect(() => {
  if (!slug) return;

  (async () => {
    try {
      const res = await getRelatedProductsApi(slug);
      setRelated(res.products || []);
    } catch {
      console.error("Failed to load related products");
    }
  })();
}, [slug]);
useEffect(() => {
  if (!selectedColor) return;

  const firstStorage = product.variants.find(
    v => v.attributes?.Color === selectedColor
  )?.attributes?.Storage;

  setSelectedStorage(firstStorage);
}, [selectedColor, product]);

const wishlist = useSelector((state) => state.wishlist.items);

const loved = isVariantWishlisted(
  wishlist,
  product._id,
  activeVariant?._id
);
const handleBuyNow = async () => {
  try {
    if (!user || !accessToken) {
      setAuthOpen(true);
      return;
    }

    const payload = {
      productId: product._id,
      variantId: activeVariant._id,
      qty: quantity,
      attributes: {
        Color: selectedColor,
        Storage: selectedStorage,
      },
    };

    await buyNowApi(payload);

    // 🔥 go straight to checkout
    navigate("/checkout");
  } catch (err) {
    toast.error(err?.response?.data?.message || "Buy now failed");
  }
};


  return (
    <>
          <HeaderLayout/>
<div className="bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8   ">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
       
        <span className="hover:text-foreground cursor-pointer" onClick={()=>navigate(`/collection/${product.category.name.toLowerCase()}`)}>
          {product.category?.name}
        </span>
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Images */}
       <ImageGallery
  images={activeVariant.images || []}
  productName={product.name}
  loved={loved}
  onToggleWishlist={() => {
  if (!user || !accessToken) {
    setAuthOpen(true);
    return;
  }

  dispatch(
    toggleWishlist({
      productId: product._id,
      variantId: activeVariant._id,
    })
  );
}}

/>
<AuthRequiredModal
  open={authOpen}
  onClose={() => setAuthOpen(false)}
  onGoogleLogin={handleGoogleLogin}
  onEmailLogin={() => navigate("/login")}
/>

        {/* Info */}
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
            <p className="text-muted-foreground mb-4">
              {product.description}
            </p>

            {/* Vendor (optional) */}
            {product.vendorId?.name && (
              <Badge variant="outline">
                Sold by {product.vendorId.name}
              </Badge>
            )}
          </div>

          {/* Price */}
          <div className="border-t pt-4">
            <div className="text-5xl font-bold">
              ₹{displayPrice.toLocaleString()}
            </div>

            {activeVariant.price !== null && (
              <p className="text-sm text-muted-foreground">
                Base price ₹{product.basePrice.toLocaleString()}
              </p>
            )}
          </div>

          {/* Color selector */}
         <VariantSelector
  options={colorOptions}
  selected={selectedColor}
  onSelect={setSelectedColor}
/>
<StorageSelector
  storageOptions={storageOptions}
  selectedStorage={selectedStorage}
  onSelect={setSelectedStorage}
/>



          {/* Stock */}
          <div className="flex items-center gap-3">
            <Badge variant={stockStatusColor}>{stockStatus}</Badge>
            {activeVariant.stock > 0 && (
              <span className="text-sm text-muted-foreground">
                {activeVariant.stock} available
              </span>
            )}
          </div>

          {/* Quantity */}
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Quantity:</span>

              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="p-2 hover:bg-muted"
                >
                  <Minus className="w-4 h-4" />
                </button>

                <input
                  value={quantity}
                  readOnly
                  className="w-12 text-center bg-transparent"
                />

                <button
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= activeVariant.stock}
                  className="p-2 hover:bg-muted"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

<div className="flex gap-4 w-full pt-4 font-jakarta">
  {/* PRIMARY: ADD TO CART */}
  <Button
    size="lg"
    onClick={handleAddToCart}
    disabled={activeVariant.stock === 0}
    className={`
      flex-[1.5] h-14 rounded-3xl gap-3 text-xs font-extrabold uppercase tracking-[0.15em] transition-all duration-300 shadow-xl
      relative overflow-hidden group 
      ${activeVariant.stock === 0 
        ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
        : "bg-primary text-black hover:text-primary hover:bg-secondary-foreground  hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.3)] active:scale-[0.98]"}
    `}
  >
    {/* Subtle Inner Glow Effect */}
    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    
    <ShoppingCart className="w-5 h-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" strokeWidth={2.5} />
    <span className="relative z-10  ">Add to Cart</span>
  </Button>

  {/* SECONDARY: BUY NOW */}
  <Button
  size="lg"
  onClick={handleBuyNow}
  disabled={activeVariant.stock === 0}
  className="
    flex-1 h-14 rounded-3xl text-xs font-black uppercase tracking-[0.15em]
    shadow-lg bg-black text-primary
   active:scale-[0.98]
    disabled:opacity-20 disabled:grayscale
    hover:bg-primary hover:text-secondary-foreground
  "
>
  Buy Now
</Button>

</div>
          </div>

          {/* Specs */}
          

        </div>

      </div>
<TechnicalSpecs variant={activeVariant} />
                            <ProductReviews product={product} />
    </div>

    {related.length > 0 && (
  <section className="mt-20 px-10">
    <h2 className="text-2xl font-serif font-semibold mb-6">
      You may also like
    </h2>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 ">
      {related.map((p) => (
        <RelatedProductCard key={p._id} product={p} />
      ))}
    </div>
  </section>
)}
</div>
</>
  );
}
