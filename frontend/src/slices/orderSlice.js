import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  orderDetails: {},
  loading: true,
  allLoading:true,
  loadingId:true,
  error: "",
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

export const getOrderById = createAsyncThunk(
  "getOrderById",
  async (id, { getState }) => { 
    const state = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${state.user.userInfo.token}`,
      },
    };
    try {
      const { data } = await axios.get(`/api/orders/${id}`, config);
      return data;
    } catch (error) {
      console.log(error);
      return { error: error.response.data.message };
    }
  }
);

export const getAllOrders = createAsyncThunk(
    "getAllOrders",
    async (_ , { getState }) => { 
      const state = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${state.user.userInfo.token}`,
        },
      };
      try {
        const { data } = await axios.get(`/api/orders/myorders`, config);
        return data;
      } catch (error) {
        console.log(error);
        return { error: error.response.data.message };
      }
    }
  );

export const orderSlice = createSlice({
  name: "orderDetails",
  initialState,
  reducers: {
    clearOrder:(state,action) => {
        state.orderDetails ={}
        state.loading= true
        state.allLoading= true
        state.error= ''
        state.allOrders = []
      }
  },
  extraReducers: (builder) => {
    builder.addCase(addOrder.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addOrder.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.error = action.payload.error;
      } else {
        state.error = "";
      }
      state.loading = false;
    });
    builder.addCase(addOrder.rejected, (state, action) => {
      state.error = "Something went wrong";
    });


    builder.addCase(getOrderById.pending, (state, action) => {
        state.loadingId = true;
      });
        builder.addCase(getOrderById.fulfilled, (state, action) => {
        if (action.payload.error) {
            state.error = action.payload.error;
        } else {
            console.log(action.payload)
            state.orderDetails = action.payload
            state.error = "";
        }
        state.loadingId = false;
    });
    builder.addCase(getOrderById.rejected, (state, action) => {
        state.error = "Something went wrong";
    });


    builder.addCase(getAllOrders.pending, (state, action) => {
        state.allLoading = true;
      });
        builder.addCase(getAllOrders.fulfilled, (state, action) => {
        if (action.payload.error) {
            state.error = action.payload.error;
        } else {
            console.log(action.payload)
            state.allOrders = action.payload
            state.error = "";
        }
        state.allLoading = false;
    });
    builder.addCase(getAllOrders.rejected, (state, action) => {
        state.error = "Something went wrong";
    });
  },
});

export const {clearOrder} = orderSlice.actions;
export default orderSlice.reducer;
