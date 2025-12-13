
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