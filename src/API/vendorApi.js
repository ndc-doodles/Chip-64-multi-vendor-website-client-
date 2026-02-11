import api from "./axiosInstance";

export const vendorLoginApi=async({email,password})=>{
    const res = await api.post("/vendor/login",{email,password})
    return res.data
    }
export const getVendorProductsApi = async () => {
  const res = await api.get("/vendor/products");
  return res.data;
};

export const createVendorProductApi = async (formData) => {
  const res = await api.post("/vendor/products", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const updateVendorProductApi = async (id, formData) => {
  const res = await api.put(`/vendor/products/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const toggleVendorProductApi = async (id) => {
  const res = await api.patch(`/vendor/products/${id}/toggle`);
  return res.data;
};

export const getVendorCategoriesApi = async () => {
  const res = await api.get("/vendor/categories");
  return res.data;
};

export const createVendorCategoryApi = async (data) => {
  const res = await api.post("/vendor/categories", data);
  return res.data;
};

export const updateVendorCategoryApi = async (id, data) => {
  const res = await api.put(`/vendor/categories/${id}`, data);
  return res.data;
};

export const toggleVendorCategoryApi = async (id) => {
  const res = await api.patch(`/vendor/categories/${id}/toggle`);
  return res.data;
};
export const registerVendorApi = async (formData) => {
  const res = await api.post("/vendor/register", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
export const getVendorBrandsApi = async() =>{
  const res= await api.get("/vendor/brands");
  return res.data
}

export const requestBrandApi = async(data) => {
  const res= await api.post("/vendor/brand-requests", data);
  return res.data
};

export const getVendorOrdersApi = async () => {
  const res = await api.get('/vendor/orders')
  return res.data
}

export const updateOrderItemStatusApi = async (
  orderId,
  itemId,
  status
) => {
  const res = await api.put(
    `/vendor/orders/${orderId}/items/${itemId}/status`,
    { status }
  )
  return res.data
}
export const getVendorDashboardApi = async () => {
  const res = await api.get("/vendor/dashboard");
  return res.data;
};

export const getVendorOrderByIdApi = async(orderId) =>{
  const res= await api.get(`/vendor/orders/${orderId}`)
  return res.data

}

export const getVendorProfileApi=async()=>{
  const res=await api.get("/vendor/profile")
  return res.data
}

export const updateProfileVendorApi=async(payload)=>{
  const res=await api.put("/vendor/profile",payload)
  return res.data
}
export const updateVendorBankApi=async(payload)=>{
  const res=await api.put("/vendor/profile/bank",payload)
  return res.data
}

export const changePasswordVendorApi=async(payload)=>{
  const res=await api.put("/vendor/change-password",payload)
  return res.data
}
export const getVendorWalletApi= async ()=>{ 
  const res= await api.get("/vendor/wallet")
  return res.data
}

export const   getVendorWalletLedgerApi= async()=>{
  const res=await api.get("/vendor/wallet-ledger")
  return res.data
}
export const requestVendorPayoutApi = async () => {
  const res = await api.post("/vendor/payout/request");
  return res.data;
};

