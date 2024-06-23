import {config} from "@/config";
import {ProductCategoryPayload} from "@/type/product-category";
import {ProductCategory} from "@prisma/client";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";

// Define a type for the slice state
interface ProductCategorySlice {
  productCategory: ProductCategory[];
  isLoading: boolean;
  error: String | null;
}
const initialState: ProductCategorySlice = {
  productCategory: [],
  isLoading: false,
  error: "",
};

export const getProductCategory = createAsyncThunk(
  "productCategory/getProductCategory",
  async (data, thunkApi) => {
    const response = await fetch(`${config.backofficeApiBaseUrl}/product-category`);
    const dataFromServer = await response.json();
    const {productCategories} = dataFromServer;
    thunkApi.dispatch(setProductCategory(productCategories));
  },
);

export const createProductCategory = createAsyncThunk(
  "productCategory/createProductCategory",
  async (payload: ProductCategoryPayload, thunkApi) => {
    const response = await fetch(`${config.backofficeApiBaseUrl}/product-category`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    const {productCategory} = data;
    thunkApi.dispatch(addProductCategory(productCategory));
  },
);

export const productSlice = createSlice({
  name: "productCategory",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setProductCategory: (state, action: PayloadAction<ProductCategory[]>) => {
      state.productCategory = action.payload;
    },
    addProductCategory: (state, action: PayloadAction<ProductCategory>) => {
      state.productCategory = [...state.productCategory, action.payload];
    },
  },
});
export const {setProductCategory, addProductCategory} = productSlice.actions;
export default productSlice.reducer;
