import { getWishlistApi,toggleWishlistApi } from "@/API/userAPI";

/* Load wishlist once (login / refresh) */
export const fetchWishlist = () => async (dispatch) => {
  const res = await getWishlistApi();
  dispatch({
    type: "SET_WISHLIST",
    payload: res.wishlist?.items || [],
  });
};

export const toggleWishlist =
  ({ productId, variantId }) =>
  async (dispatch, getState) => {
    const currentItems = getState().wishlist.items;

    const exists = currentItems.some(
      (item) =>
        item.productId === productId &&
        item.variantId === variantId
    );

    // ✅ 1. Optimistic update FIRST (instant UI)
    const updated = exists
      ? currentItems.filter(
          (item) =>
            !(item.productId === productId &&
              item.variantId === variantId)
        )
      : [...currentItems, { productId, variantId }];

    dispatch({
      type: "SET_WISHLIST",
      payload: updated,
    });

    try {
      // ✅ 2. Call server in background
      const res = await toggleWishlistApi({ productId, variantId });

      // sync with server (optional safety)
      dispatch({
        type: "SET_WISHLIST",
        payload: res.wishlist.items,
      });
    } catch (err) {
      // ❌ revert if failed
      dispatch({
        type: "SET_WISHLIST",
        payload: currentItems,
      });
    }
  };
