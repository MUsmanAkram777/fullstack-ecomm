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

export const addOrder = createAsyncThunk(
  "addOrder",
  async (
    { orderItems, shippingAddress, paymentMethod, totalPrice, shippingPrice },
    { getState }
  ) => {
    
    const state = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state.user.userInfo.token}`,
      },
    };  
    try {
      const { data } = await axios.post(
        `/api/orders`,
        {
          orderItems,
          shippingAddress,
          paymentMethod,
          totalPrice,
          shippingPrice,
        },
        config
      );
      return data;
    } catch (error) {
      console.log(error.response.data.message);
      return { error: error.response.data.message };
    }
  }
);

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
  },
  extraReducers: (builder) => {
    builder.addCase(addOrder.pending, (state, action) => { 
    });
    builder.addCase(addOrder.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.error = action.payload.error;
      } else {
        console.log(action.payload)
        state.error = "";
      } 
    });
    builder.addCase(addOrder.rejected, (state, action) => { 
      state.error = "Something went wrong";
    });
  },
});

export const { addToCart, removeItem, setShippingAddress, setPaymentMethod } =
  cartSlice.actions;
export default cartSlice.reducer;
