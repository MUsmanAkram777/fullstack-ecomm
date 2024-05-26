import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = JSON.parse(localStorage.getItem("cart")) ?? {
  cartItems: [],
  totalItems: 0,
  totalPrice: 0,
  shippingAddress: {
    address: "",
    street: "",
    city: "",
    postalCode: "",
    country: "",
  },
};



export const cartSlice = createSlice({
  name: "cartDetails",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      let product = action.payload.product;
      let itemExists = state.cartItems.find((item) => item.id == product.id);
      if (itemExists) {
        state.cartItems = state.cartItems.map((item) => {
          if (item.id == product.id) {
            if (action.payload?.type === "UPDATE_QTY_CART") {
              return { ...item, qty: product.qty };
            } else {
              return { ...item, qty: item.qty + product.qty };
            }
          }
          return item;
        });
      } else {
        state.cartItems.push(product);
      }

      state.totalItems = state.cartItems.reduce((total, item) => {
        return total + item.qty;
      }, 0);

      state.totalPrice = state.cartItems
        .reduce((price, item) => {
          console.log(item.qty * item.price);
          return parseFloat(price + item.qty * item.price);
        }, 0)
        .toFixed(2);
    },
    removeItem: (state, action) => {
      console.log(action.payload);
      state.cartItems = state.cartItems.filter(
        (item) => item.id != action.payload
      );

      state.totalItems = state.cartItems.reduce((total, item) => {
        return total + item.qty;
      }, 0);

      state.totalPrice = state.cartItems
        .reduce((price, item) => {
          console.log(item.qty * item.price);
          return parseFloat(price + item.qty * item.price);
        }, 0)
        .toFixed(2);
    },
    setShippingAddress: (state, action) => {
      state.shippingAddress = action.payload.shippingAddress;
    },
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
    clearCart:(state,action) => {
      state.cartItems = []
      state.totalItems= 0
      state.totalPrice= 0
      state.shippingAddress = {}
      state.paymentMethod = ""
    }
  },
});

export const { addToCart, removeItem, setShippingAddress, setPaymentMethod,clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
