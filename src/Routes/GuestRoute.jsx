import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function GuestRoute({ children, type }) {
  const { user, accessToken } = useSelector((s) => s.user);
  const { vendor, accessToken: vendorToken } = useSelector((s) => s.vendor);

  const isLoggedInUser = user && accessToken && user.role === "user";
  const isAdmin = user && accessToken && user.role === "admin";
  const isVendor = vendor && vendorToken;

  /* ---------------- USER LOGIN PAGE ---------------- */
  if (type === "user" && isLoggedInUser) {
    return <Navigate to="/" replace />;
  }

  /* ---------------- ADMIN LOGIN PAGE ---------------- */
  if (type === "admin" && isAdmin) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  /* ---------------- VENDOR LOGIN PAGE ---------------- */
  if (type === "vendor" && isVendor) {
    return <Navigate to="/seller/dashboard" replace />;
  }

  return children;
}
