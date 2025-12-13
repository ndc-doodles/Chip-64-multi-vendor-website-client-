import api from "./axiosInstance";

export const loginUserApi=async(email,password)=>{
    const res=await api.post("/auth/login",{email,password})
    return res.data
}
export const googleLoginApi=async(googleAccessToken)=>{
    const res=await api.post("/auth/google",{
        token:googleAccessToken
    })
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
export const getShopProducts=async()=>{
    const res= await api.get("/user/products-shop")
    return res.data
}
export const getCartApi=async()=>{
    const res=await api.get("/user/cart")
    return res.data
}

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