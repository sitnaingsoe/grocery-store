import {ProductPayload} from "@/type/product";
import {Product} from "@prisma/client";
import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import {error} from "console";

// Define a type for the slice state

// Define the initial state using that type
const initialState: ProductPayload = {
  product: [],
  isLoading: false,
  error: null,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct: (state, actions: PayloadAction<Product[]>) => {
      state.product = actions.payload;
    },
  },
});

export const {setProduct} = productSlice.actions;

export default productSlice.reducer;
