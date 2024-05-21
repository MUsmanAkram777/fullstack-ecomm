import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';


const initialState = {
    product: {},
    loading:true
}



export const fetchProductDetails = createAsyncThunk("fetchProductDetails", async (id) => {
    const {data} = await axios.get(`/api/products/${id}`)
    return data;
 });

export const productDetailSlice = createSlice({
  name: 'productDetail',
  initialState,
  reducers: { 
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductDetails.pending, (state, action) => {
     state.loading = true;
    })
    builder.addCase(fetchProductDetails.fulfilled, (state, action) => {
     state.loading = false;
     state.product = action.payload;
    })
    builder.addCase(fetchProductDetails.rejected, (state, action) => {
     state.loading = true;
    })
   }
})

// Action creators are generated for each case reducer function
export const {} = productDetailSlice.actions

export default productDetailSlice.reducer







