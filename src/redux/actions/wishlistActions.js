import { getWishlistApi,toggleWishlistApi } from "@/API/userAPI";

/* Load wishlist once (login / refresh) */
export const fetchWishlist = () => async (dispatch) => {
  const res = await getWishlistApi();
  dispatch({
    type: "SET_WISHLIST",
    payload: res.wishlist?.items || [],
  });
};

/* Toggle wishlist (add/remove) */
export const toggleWishlist = ({ productId, variantId }) => async (dispatch) => {
  const res = await toggleWishlistApi({ productId, variantId });

  dispatch({
    type: "SET_WISHLIST",
    payload: res.wishlist.items,
  });
};