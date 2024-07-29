import {CompanyPayload} from "@/type/company";
import {ProductPayload} from "@/type/product";
import {ProductCategoryProductPayload} from "@/type/productCategoryProduct";
import {Company, Product, ProductCategoryProduct} from "@prisma/client";
import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";

const initialState: ProductCategoryProductPayload = {
  productCategoryProduct: [],
  isLoading: false,
  error: null,
};

export const productCategoryProductSlice = createSlice({
  name: "productCategoryProduct",
  initialState,
  reducers: {
    setProductCategoryProduct: (state, actions: PayloadAction<ProductCategoryProduct[]>) => {
      state.productCategoryProduct = actions.payload;
    },
  },
});

export const {setProductCategoryProduct} = productCategoryProductSlice.actions;

export default productCategoryProductSlice.reducer;
