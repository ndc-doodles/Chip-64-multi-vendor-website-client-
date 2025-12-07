import axios from "axios"
import { store } from "../redux/app/store"

const api=axios.create({
    baseURL:import.meta.env.VITE_API_URL, 
    withCredentials:true
})

api.interceptors.request.use(
    (config)=>{
        const state=store.getState()
        const token=state.user.accessToken;
        if(token){
            config.headers.Authorization=`Bearer ${token}`
        }
        return config;
    },
    (error)=>Promise.reject(error)
)

api.interceptors.response.use(
    (response)=>response,
    async (error)=>{
        const originalRequest=error.config;
        if(error.response?.status === 401 && !originalRequest._retry){
            originalRequest._retry =true;
            try{
                const refreshResponse= await api.post("/auth/refresh")
                const {user,accessToken}=refreshResponse.data;
                store.dispatch({
                    type:"SET_USER",
                    payload:{user,accessToken}
                })
                originalRequest.headers.Authorization=`Bearer ${accessToken}`
                return api(originalRequest)
            }catch(err){
                store.dispatch({type:"LOGOUT"})
                return Promise.reject(err)
            }
            
        }
        return Promise.reject(error)
    }
)
export default api