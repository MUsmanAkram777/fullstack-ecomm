import { configureStore,createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit'
import productReducer from './slices/productSilce' 
import productDetailReducer from './slices/productDetailSlice' 
import cartReducer from './slices/cartSlice' 
import { addToCart,removeItem } from './slices/cartSlice'

const initialState = {

};


const localStorageMiddleware = createListenerMiddleware();

localStorageMiddleware.startListening({
  matcher: isAnyOf(addToCart,removeItem),
  effect: (action, listenerApi) => localStorage.setItem('cart', JSON.stringify(listenerApi.getState().cart)),
});

export const store = configureStore({
  reducer: {
    productsList: productReducer,
    productDetail:productDetailReducer,
    cart:cartReducer
  }, 
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(localStorageMiddleware.middleware),
  // preloadedState :initialState
})