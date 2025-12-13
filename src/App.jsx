// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "@/Routes/ProtectedRoute";
import AdminRoute from "@/Routes/AdminRoute";

import LoginPage from './Pages/Auth/LoginPage'
import RegisterPage from './Pages/Auth/RegisterPage'
import VerifyOtpPage from './Pages/Auth/VerifyOtp'
import ForgotPasswordPage from './Pages/Auth/ForgetPasswordPage'
import ResetPasswordPage from './Pages/Auth/ResetPasswordPage'
import ResetOtpPage from './Pages/Auth/ResetOtpPage'
import HomePage from './Pages/Home/HomePage'
import ShopPage from './Pages/Shop/ShopPage'
import AdminLoginPage from './Admin/Pages/AdminLoginPage'
import AdminDashboardPage from './Admin/Pages/AdminDashboardPage'
import CategoriesPage from './Admin/Pages/AdminCategoryPage'
import ProductsPage from './Admin/Pages/AdminProductPage'
import ProductDetailPage from './Pages/ProductDetail/ProductDetailPage'
import CartPage from './Pages/Cart/CartPage'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify-otp" element={<VerifyOtpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/reset-otp" element={<ResetOtpPage />} />
        <Route path="/product/:slug" element={<ProtectedRoute>
          <ProductDetailPage/>
        </ProtectedRoute>  }  />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/shop"
          element={
            <ProtectedRoute>
              <ShopPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />
        <Route path="/admin" element={<AdminLoginPage />} />

        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboardPage />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/category"
          element={
            <AdminRoute>
              <CategoriesPage />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/product"
          element={
            <AdminRoute>
              <ProductsPage />
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
