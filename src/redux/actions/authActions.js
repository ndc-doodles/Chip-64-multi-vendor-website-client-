// src/redux/actions/authActions.js
import { persistor } from "../app/store";
import { logoutApi } from "@/API/userAPI";

export const logoutUser = () => async (dispatch) => {
try {
    await logoutApi()
} catch (error) {
    console.log("error backend failed",error)
    
}
  dispatch({ type: "LOGOUT" });
  dispatch({ type: "VENDOR_LOGOUT" });
  dispatch({ type: "CLEAR_WISHLIST" });
  dispatch({ type: "CLEAR_CART" });

  await persistor.purge();
};
