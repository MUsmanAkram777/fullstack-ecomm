import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
  products: [],
  loading:true
}


export const fetchProducts = createAsyncThunk("fetchProducts", async () => {
    const {data} = await axios.get('/api/products')
    return data;
 });

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: { 
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state, action) => {
     state.loading = true;
    })
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
     state.loading = false;
     state.products = action.payload;
    })
    builder.addCase(fetchProducts.rejected, (state, action) => {
     state.loading = true;
    })
   }
})

// Action creators are generated for each case reducer function
export const {} = productSlice.actions

export default productSlice.reducer