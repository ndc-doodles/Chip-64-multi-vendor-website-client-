import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";

import AuthRequiredModal from "./AuthModal";
import { closeAuthModal } from "@/redux/actions/authModalActions";
import { googleLoginApi } from "@/API/userAPI";
import { fetchWishlist } from "@/redux/actions/wishlistActions";
import { fetchCart } from "@/redux/actions/cartActions";

export default function GlobalAuthModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const open = useSelector((state) => state.authModal.open);

  /* ================= GOOGLE LOGIN ================= */
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const data = await googleLoginApi(tokenResponse.access_token);

      dispatch({
        type: "SET_USER",
        payload: {
          user: data.user,
          accessToken: data.accessToken,
        },
      });

      dispatch(fetchWishlist());
      dispatch(fetchCart());

      dispatch(closeAuthModal()); // ⭐ auto close
    },
  });

  return (
    <AuthRequiredModal
      open={open}
      onClose={() => dispatch(closeAuthModal())}
      onGoogleLogin={handleGoogleLogin}
      onEmailLogin={() => {
        dispatch(closeAuthModal());
        navigate("/login");
      }}
    />
  );
}
