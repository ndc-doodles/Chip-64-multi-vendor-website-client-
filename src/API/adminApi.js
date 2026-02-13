
import api from "./axiosInstance";

export const adminLoginApi = async ({ email, password }) => {
  const res = await api.post("/admin/login", { email, password });
  return res.data; 
};

export const getCategoriesApi=async()=>{
   const res =await api.get("/admin/categories")
   return res.data
}
export const createCategoryApi = async (formData) => {
    const res = await api.post("/admin/categories", formData /*, { headers: { "Content-Type": "multipart/form-data" } }*/);

  return res.data;
};

export const toggleCategoryStatusApi= async(id)=>{
  const res=await api.patch(`/admin/categories/${id}/toggle`);
  return res.data
}

export const updateCategoryApi=async(id,formData)=>{
  const res=await api.put(`/admin/categories/${id}`,formData)
  return res.data
}

export const getProductsApi=async ()=>{
  const res=await api.get("/admin/products")
  return res.data
}
export const createProductApi = async (formData) => {
  const res = await api.post("/admin/products", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
export const updateProductApi = async (id, formData) => {
  const res = await api.put(`/admin/products/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const toggleProductApi = async (id) => {
  const res = await api.patch(`/admin/products/${id}/toggle`);
  return res.data;
};
export const getUsersApi = async () => {
  const res = await api.get("/admin/users")
  return res.data
}

export const blockUserApi = async (id) => {
  const res = await api.patch(`/admin/users/${id}/block`)
  return res.data
}
export const unblockUserApi = async (id) => {
  const res = await api.patch(`/admin/users/${id}/unblock`)
  return res.data
}

export const getVendorsApi = async () => {
  const res = await api.get("/admin/vendors");
  return res.data;
};

export const blockVendorApi = async (id) => {
  const res = await api.patch(`/admin/vendors/${id}/block`);
  return res.data;
};

export const unblockVendorApi = async (id) => {
  const res = await api.patch(`/admin/vendors/${id}/unblock`);
  return res.data;
};

export const getVendorByIdApi = async (id) => {
  const res = await api.get(`/admin/vendors/${id}`);
  return res.data;
};
export const approveVendorApi = async (id) =>{
  const res=  await api.patch(`/admin/vendors/${id}/approve`);
  return res.data
}

export const rejectVendorApi = async(id, reason) =>{
 const res=  await api.patch(`/admin/vendors/${id}/reject`, { reason });
return res.data
}

export const getBrandsApi = async() =>{
  const res= await api.get("/admin/brands");
  return res.data
}

export const getBrandRequestsApi = async() =>{
  const res= await api.get("/admin/brand-requests");
 return res.data
}

export const approveBrandRequestApi =async (id) =>{
  const res=  await api.post(`/admin/brand-requests/${id}/approve`);
  return res.data
}

export const rejectBrandRequestApi =async (id, data) =>{
  const res=  await api.post(`/admin/brand-requests/${id}/reject`, data);
   return res.data
}

export const createBrandApi =async (data) =>{
  const res=  await api.post("/admin/brands", data);
  return res.data
}

export const getAllCouponsApi =async () => {
  const res= await api.get("/admin/coupons");
  return res.data
};


export const createCouponApi = async (data) => {
  const res= await api.post("/admin/coupons", data);
  return res.data
};

export const toggleCouponApi = async(couponId) => {
  const res= await api.patch(`/admin/coupons/${couponId}/toggle`);
  return res.data
};


export const deleteCouponApi = async(couponId) => {
  const res= await api.delete(`/admin/coupons/${couponId}`);
  return res.data
};

export const getCommissionApi=async()=>{
  const res=await api.get("/admin/commission")
  return res.data
}
export const createCommissionApi=async(payload)=>{
   const res= await api.post("/admin/commission",payload)
   return res.data
}
export const updateCommissionApi=async(id,payload)=>{
  const res= await api.put(`/admin/commission/${id}`,payload)
  return res.data
}
export const toggleCommissionApi=async(id)=>{
  const res=await api.patch(`/admin/commission/${id}/toggle`)
  return res.data
}
export const getVendorPayoutsApi = async () => {
  const res = await api.get("/admin/payout");
  return res.data;
};
export const settleVendorPayoutApi = async (payload) => {
  const res = await api.post("/admin/payout", payload);
  return res.data;
};
export const getPayoutHistoryApi = async () => {
  const res = await api.get("/admin/payout/history");
  return res.data;
};

export const getAdminWalletApi = async () => {
  const res = await api.get("/admin/wallet");
  return res.data;
};

export const getAdminWalletLedgerApi = async () => {
  const res = await api.get("/admin/wallet/ledger");
  return res.data;
};
export const getPayoutRequestsApi = async () => {
  const res = await api.get("/admin/payout-requests");
  return res.data;
};


export const approvePayoutRequestApi = async (requestId) => {
  const res = await api.get("/admin/payout-request", {
    params: { requestId },
  });
  return res.data;
};

export const fetchDashboardApi=async(range="daily")=>{
   const res=await api.get(`/admin/dashboard/overview?range=${range}`)
   return res.data
}