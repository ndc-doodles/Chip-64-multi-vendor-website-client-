import api from "./axiosInstance";

export const loginUserApi=async(email,password)=>{
    const res=await api.post("/auth/login",{email,password})
    return res.data
}
export const googleLoginApi=async(googleAccessToken)=>{
    const res=await api.post("/auth/google",{
        token:googleAccessToken
    })
    console.log(res)
    return res.data
}
export const sendOtpApi=async(payload)=>{
    const res=await api.post("/auth/send-otp",payload);
    return res.data
}

export const verifyOtpApi=async(payload)=>{
    const res=await api.post("/auth/verify-otp",payload)
    return res.data
}
export const resetPasswordApi=async(email,newPassword)=>{
    const res=await api.post("/auth/reset-password",{
        email,
        newPassword
        
    })
    return res.data
}
export const getUserProductsApi = async () => {
  const res = await api.get("/user/products", {
    headers: { "Cache-Control": "no-cache" },
    params: { t: Date.now() },
  });

  return res.data;
};

export const getUserProductBySlugApi = async (slug) => {
  const res = await api.get(`/user/products/${slug}`);
  return res.data;
};

export const getUserCategories=async()=>{
    const res=await api.get("/user/categories")
    return res.data
}
export const getShopCategories = async () => {
  const res = await api.get("/user/shop-categories");
  return res.data;
};

export const getShopProducts = async ({
  category,
  subcategory,
  gender,
  minPrice,
  maxPrice,
  inStock,
  sort,
  page,
  limit,
  search
} = {}) => {

  const params = {};

  if (category) params.category = category;
  if (subcategory) params.subcategory = subcategory;
  if (gender && gender.length) params.gender = gender;
  if (minPrice != null) params.minPrice = minPrice;
  if (maxPrice != null) params.maxPrice = maxPrice;
  if (inStock) params.inStock = true;
  if (sort) params.sort = sort;
  if (page) params.page = page;
  if (limit) params.limit = limit;
  if(search) params.search=search

  const res = await api.get("/user/products-shop", { params });
  return res.data;
};
export const getCartApi=async()=>{
    const res=await api.get("/user/cart")
    return res.data
}

export const getCheckoutItemsApi = async () => {
  const res = await api.get("/user/checkout");
  return res.data;
};

export const addToCart=async (payload)=>{
    const res=await api.post("/user/cart/items",payload)
    return res.data
}

export const updateCartItemQtyApi = async (itemId, qty) => {
  const res = await api.patch(`/user/cart/items/${itemId}`, { qty });
  return res.data;
};

export const removeCartItemApi = async (itemId) => {
  const res = await api.delete(`/user/cart/items/${itemId}`);
  return res.data;
};

export const clearCartApi = async () => {
  const res = await api.delete("/user/cart");
  return res.data;
};
export const getAddressesApi = async() =>{
  const res= await  api.get("/user/addresses");
  return res.data
}

export const createAddressApi =async (data) =>{
  const res= await api.post("/user/addresses", data);
  return res.data
}

export const updateAddressApi = async(id, data) =>{
  const res= await api.put(`/user/addresses/${id}`, data);
  return res.data
}

export const deleteAddressApi = async(id) =>{
  const res= await  api.delete(`/user/addresses/${id}`);
  return res.data
}

export const setDefaultAddressApi =async (id) =>{
  const res= await api.patch(`/user/addresses/${id}/default`);
    return res.data

}
  export const getCollectionProductsApi = async(slug, params = {}) => {
  const res=await api.get(`/user/collections/${slug}`, { params });
 return res.data
};
export const getRelatedProductsApi = async (slug) => {
  const res = await api.get(`/user/products/related/${slug}`);
  return res.data;
};
export const getWishlistApi = async () => {
  const res = await api.get("/user/wishlist");
  return res.data;
};

export const addToWishlistApi = async (payload) => {
  const res = await api.post("/user/wishlist", payload);
  return res.data;
};

export const removeWishlistItemApi = async (itemId) => {
  const res = await api.delete(`/user/wishlist/${itemId}`);
  return res.data;
};
export const toggleWishlistApi = async (payload) => {
  const res = await api.post("/user/wishlist/toggle", payload);
  return res.data;
};
export const logoutApi=async()=>{
  const res=await api.post("/auth/logout");
  return res.data;
}
export const logoutAllApi=async()=>{
  const res=await api.post("/auth/logout-all")
  return res.data
}

export const changePassword =async (currentPassword,newPassword)=>{
  const res= await api.post("/auth/change-password", {
        currentPassword,
        newPassword,
      });
  return res.data
}

export const deleteAccountApi = async (password) => {
  const res = await api.post("/user/delete-account", { password });
  return res.data;
};

export const deleteGoogleAccountApi = async (googleToken) => {
  const res = await api.post("/user/delete-account/google", {
    token: googleToken,
  });
  return res.data;
}

export const getCartRecommendationsApi = async (data) => {
  try {
    const res = await api.post(
      "/user/cart-recommendations",
      data
    );
    return res.data;
  } catch (error) {
    throw error?.response?.data || error;
  }
};
export const getAvailableCouponsApi = async (cartTotal) => {
  const res = await api.get("/user/coupons/available", {
    params: { cartTotal }
  });
  return res.data;
};
export const validateCouponApi = async ({ code, cartTotal }) => {
  const res = await api.post("/user/coupons/validate", {
    code,
    cartTotal,
  });
  return res.data;
};
export const placeOrderApi = async (payload) => {
  const res = await api.post("/user/orders", payload);
  return res.data;
};

export const verifyRazorpayApi = async (payload) => {
  const res = await api.post("/user/orders/verify-payment", payload);
  return res.data;
};
export const getOrderByIdApi = async (orderId) => {
  const res = await api.get(`/user/orders/${orderId}`);
  console.log(res)
  return res.data;
};
export const getUserOrdersApi = async (params) => {
  console.log("📡 API called with params:", params);

  const res = await api.get("/user/orders", { params });

  console.log("📥 API response:", res.data);
  return res.data;
};
export const getProductReviewsApi = async (productId) => {
  const res = await api.get(`/user/product/${productId}/reviews`);
  return res.data;
};

export const createReviewApi = async (payload) => {
  const res = await api.post("/user/review", payload);
  return res.data;
};
export const updateReviewApi = async (reviewId, payload) => {
  const res = await api.put(`/user/review/${reviewId}`, payload);
  return  res.data;
};
export const deleteReviewApi = async (reviewId) => {
  const res = await api.delete(`/user/review/${reviewId}`);
  return res.data;
};

export const buyNowApi=async(payload)=>{
  const res=await api.post("/user/buy-now",payload)
  return res.data
}
export const searchProductsApi = async (query) => {
  const res = await api.get(`/user/search-products?q=${query}`);
  return res.data;
};

export const getRecentlyViewedApi=async()=>{
  const res=await api.get("/user/recently-viewed")
  return res.data
}