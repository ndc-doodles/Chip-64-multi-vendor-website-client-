import { getCartApi, addToCart } from "@/API/userAPI";

/* Load cart once */
export const fetchCart = () => async (dispatch) => {
  const res = await getCartApi();
  dispatch({
    type: "SET_CART",
    payload: res.cart,
  });
};

/* Add item */
export const addItemToCart = (payload) => async (dispatch) => {
  const res = await addToCart(payload);
  dispatch({
    type: "SET_CART",
    payload: res.cart,
  });
};