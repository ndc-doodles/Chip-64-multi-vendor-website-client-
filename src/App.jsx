// App.jsx
import { useDispatch ,useSelector} from "react-redux";

import { useEffect } from "react";
import { fetchWishlist } from "./redux/actions/wishlistActions";
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
import VendorLoginPage from "./Seller/Pages/VendorLoginPage";
import ProductsPage from './Seller/Pages/VendorProductPage'
import ProductDetailPage from './Pages/ProductDetail/ProductDetailPage'
import CartPage from './Pages/Cart/CartPage'
import AdminLogin from "./Admin/Pages/LoginPage/AdminLoginPage";
import AdminDashboardPage from "./Admin/Pages/Dashboard/AdminDashboardPage";
import AdminCategoriesPage from "./Admin/Pages/Category/AdminCategoryPage";
import AdminUserPage from "./Admin/Pages/Users/AdminUserPage";
import SellerRegisterPage from "./Seller/Pages/SellerRegistrationPage";
import SellerApplicationStatus from "./Seller/Pages/SellerApplicationStatus";
import AdminVendorsPage from "./Admin/Pages/Vendors/AdminVendorPage";
import AdminVendorsDetailsPage from "./Admin/Pages/Vendors/AdminVendorDetails";
import SellerAgreement from "./Pages/Legal/SellerAgreement";
import CommissionPolicy from "./Pages/Legal/CommissionAgreement";
import ReturnsPolicy from "./Pages/Legal/ReturnAgreement";
import PlatformRules from "./Pages/Legal/PlatformRules";
import AdminBrandsPage from "./Admin/Pages/Brands/BrandPage";
import AddressManagement from "./Pages/Address/AddressPage";
import CollectionPage from "./Pages/Collection/CollectionPage";
import WishlistPage from "./Pages/Wishlist/WishlistPage";
import { fetchCart } from "./redux/actions/cartActions";
import AccountHub from "./Pages/Account/Accounthub";
import SecurityPrivacy from "./Pages/SecurityPage/SecurityPage";
import ChangePassword from "./Pages/SecurityPage/ChangePassword";
import SecuritySessions from "./Pages/SecurityPage/SecuritySessions";
import CouponsPage from "./Admin/Pages/Coupons/CouponPage";
import CheckoutPage from "./Pages/Checkout/CheckoutPage";
import SuccessPage from "./Pages/Order/Order-success";
import { OrdersList } from "./Components/Orders/OrdersList";
import OrdersPage from "./Pages/Order/OrderPage";
import OrderDetailPage from "./Pages/Order/OrderDetailPage";
import SellerOrdersPage from "./Seller/Pages/SellerOrdersPage";
import SellerDashboardPage from "./Seller/Pages/SellerDashboardPage";
import SellerSettings from "./Seller/Pages/SellerSettingsPage";
import AdminPayoutPage from "./Admin/Pages/Payout/AdminPayoutPage";
import AdminPayoutHistoryPage from "./Admin/Pages/Payout/AdminPayoutHistoryPage";
import AdminCommissionPage from "./Admin/Pages/Commission/AdminCommissionPage";
import AdminWalletPage from "./Admin/Pages/Wallet/AdminWalletPage";
import SelllerWallet from "./Seller/Layout/Wallet/SellerWalletLayout";
import SellerWalletPage from "./Seller/Pages/SellerWalletPage";
import AdminPayoutRequestPage from "./Admin/Pages/Payout/AdminPayoutRequest";
import About from "./Pages/About/About";
import ContactPage from "./Pages/Contact/ContactPage";
import GlobalAuthModal from "./Components/AuthModal/GlobalAuthModal";
function App() {
  const dispatch = useDispatch();
const user = useSelector((state) => state.user.user);

useEffect(() => {
  if (user) {
    dispatch(fetchWishlist());
  }
}, [user]);
useEffect(() => {
  if (user) {
    dispatch(fetchCart());
  }
}, [user]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify-otp" element={<VerifyOtpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/reset-otp" element={<ResetOtpPage />} />
        <Route path="/product/:slug" element={
          <ProductDetailPage/>
         }  />
         <Route path="/checkout" element={<CheckoutPage/>}/>
        <Route
  path="/legal/seller-agreement"
  element={<SellerAgreement />}
/>
<Route path="/legal/commission" element={<CommissionPolicy />} />
<Route path="/legal/returns" element={<ReturnsPolicy/>}/>
<Route path="legal/platform-rules" element={<PlatformRules/>}/>
<Route path="/admin/payout" element={<AdminPayoutPage/>}/>
<Route path="/admin/payout-history" element={<AdminPayoutHistoryPage/>}/>
<Route path="/admin/commissions" element={<AdminCommissionPage/>}/>
<Route path="/admin/wallet" element={<AdminWalletPage/>}/>
<Route path="/admin/payout-request" element={<AdminPayoutRequestPage/>}/>
        <Route
          path="/"
          element={
              <HomePage />
          }
        />
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<ContactPage/>}/>
        <Route
          path="/shop"
          element={
            
              <ShopPage />
          }
        />
        <Route path="/order-success/:orderId" element={<SuccessPage />} />
       <Route path="/orders" element={<OrdersPage/>}/>
        <Route path="/address" element={<AddressManagement/>}/>
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />
        <Route path="/wishlist" element={
          <ProtectedRoute>
             <WishlistPage/>
          </ProtectedRoute>
         }/>
        <Route path="/account" element={<ProtectedRoute>
          <AccountHub/>
        </ProtectedRoute>
          }/>
        <Route path="/security" element={<SecurityPrivacy/>}/>
        <Route path="/vendor" element={<VendorLoginPage />} />
        <Route path="/security/change-password" element={<ChangePassword/>}/>
        <Route path="/security/sessions" element={<SecuritySessions/>}/>
      
        
        <Route
          path="/vendor/product"
          element={
              <ProductsPage />
          }
        />
        <Route path="/seller/register" element={<SellerRegisterPage />} />
        <Route
  path="/seller/application-status"
  element={<SellerApplicationStatus />}
/>
        <Route path="/admin" element={<AdminLogin/>}/>
        <Route path="/admin/dashboard" element={<AdminDashboardPage/>}/>
        <Route path="/admin/category" element={<AdminCategoriesPage/>}/>
        <Route path="/admin/users" element={<AdminUserPage/>}/>
        <Route path="/admin/vendors" element={<AdminVendorsPage/>}/>
        <Route path="/admin/vendors/:id" element={<AdminVendorsDetailsPage/>}/>
        <Route path="/admin/brands" element={<AdminBrandsPage/>}/>
        <Route path="/collection/:slug" element={<CollectionPage/>}/>
        <Route path="/admin/coupons" element={<CouponsPage/>}/>
        <Route path="/orders/:orderId" element={<OrderDetailPage/>}/>
        
        <Route path="/seller/orders" element={<SellerOrdersPage/>}/>
        <Route path="/seller/dashboard" element={<SellerDashboardPage/>}/>
        <Route path="/seller/settings" element={<SellerSettings/>}/>
        <Route path="/seller/wallet" element={<SellerWalletPage/>}/>
      </Routes>
      <GlobalAuthModal/>
    </BrowserRouter>
  );
}

export default App;
