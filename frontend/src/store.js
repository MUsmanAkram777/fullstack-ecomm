import {
  configureStore,
  createListenerMiddleware,
  isAnyOf,
} from "@reduxjs/toolkit";
import productReducer from "./slices/productSilce";
import productDetailReducer from "./slices/productDetailSlice";
import cartReducer, {
  addToCart,
  removeItem,
  setShippingAddress,
  setPaymentMethod,
  addOrder
} from "./slices/cartSlice";
import userReducer, {
  fetchUserLogin,
  logout,
  fetchUserRegister,
  updateUser,
} from "./slices/userSlice";

const initialState = {};

const localStorageMiddleware = createListenerMiddleware();

localStorageMiddleware.startListening({
  matcher: isAnyOf(
    addToCart,
    removeItem,
    fetchUserLogin,
    logout,
    fetchUserRegister,
    updateUser,
    setShippingAddress,
    setPaymentMethod,
    addOrder
  ),
  effect: (action, listenerApi) => {
    localStorage.setItem("cart", JSON.stringify(listenerApi.getState().cart));
    localStorage.setItem(
      "user",
      JSON.stringify(listenerApi.getState().user.userInfo)
    );
  },
});

export const store = configureStore({
  reducer: {
    productsList: productReducer,
    productDetail: productDetailReducer,
    cart: cartReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(localStorageMiddleware.middleware),
  // preloadedState :initialState
});
