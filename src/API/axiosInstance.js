import axios from "axios";
import { store } from "../redux/app/store";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

let isRefreshing = false;

/* ================= REQUEST INTERCEPTOR ================= */
api.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const isVendorApi = config.url?.startsWith("/vendor");

    const token = isVendorApi
      ? state.vendor?.accessToken
      : state.user?.accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* ================= RESPONSE INTERCEPTOR ================= */
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    /* 🔴 HARD STOP for auth-failed requests */
    if (error?.__isAuthError) {
      return Promise.reject(error);
    }

    const originalRequest = error.config;
    const state = store.getState();

    const isVendorApi = originalRequest.url?.startsWith("/vendor");

    /* ✅ STRONG session check (VERY IMPORTANT) */
    const hasSession = isVendorApi
      ? !!state.vendor?.vendor && !!state.vendor?.accessToken
      : !!state.user?.user && !!state.user?.accessToken;

    /* ❌ Never refresh refresh-token request itself */
    if (originalRequest.url?.includes("/auth/refresh")) {
      return Promise.reject(error);
    }

    /* ❌ No session → no refresh */
    if (!hasSession) {
      return Promise.reject(error);
    }

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      /* ❌ Prevent parallel refresh calls */
      if (isRefreshing) {
        return Promise.reject(error);
      }

      isRefreshing = true;

      try {
        const refreshResponse = await api.post("/auth/refresh");
        const { accessToken, entity, data } = refreshResponse.data;

        if (entity === "vendor") {
          store.dispatch({
            type: "SET_VENDOR",
            payload: { vendor: data, accessToken },
          });
        } else {
          store.dispatch({
            type: "SET_USER",
            payload: { user: data, accessToken },
          });
        }

        originalRequest.headers.Authorization =
          `Bearer ${accessToken}`;

        isRefreshing = false;
        return api(originalRequest);
      } catch (err) {
        isRefreshing = false;

        /* 🔥 HARD LOGOUT (tokenVersion mismatch / refresh expired) */
        if (isVendorApi) {
          store.dispatch({ type: "VENDOR_LOGOUT" });
        } else {
          store.dispatch({ type: "LOGOUT" });
        }

        return Promise.reject({
          ...err,
          __isAuthError: true,
        });
      }
    }

    return Promise.reject(error);
  }
);

export default api;
