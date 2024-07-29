import {config} from "@/config";
import {
  ProductCategoryPayload,
  RemoveProductCategory,
  UpdateProductCategory,
} from "@/type/product-category";
import {ProductCategory} from "@prisma/client";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import {act} from "react";

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

export const createProductCategory = createAsyncThunk(
  "productCategory/createProductCategory",
  async (payload: ProductCategoryPayload, thunkApi) => {
    const {onError, onSuccess} = payload;
    try {
      const response = await fetch(`${config.backofficeApiBaseUrl}/product-category`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      const {productCategory} = data;
      {
        onSuccess && onSuccess();
      }
      thunkApi.dispatch(addProductCategory(productCategory));
    } catch (error) {
      {
        onError && onError();
      }
    }
  },
);
export const updatedProductCategory = createAsyncThunk(
  "productCategory/updateProductCategory",
  async (payload: UpdateProductCategory, thunkApi) => {
    const {onError, onSuccess} = payload;
    try {
      const response = await fetch(`${config.backofficeApiBaseUrl}/product-category`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const dataFromServer = await response.json();
      const {updatedProductCategory} = dataFromServer;
      updatedProductCategory;
      thunkApi.dispatch(repalceProductCategory(updatedProductCategory));
      {
        onSuccess && onSuccess();
      }
    } catch (error) {
      {
        onError && onError();
      }
    }
  },
);

export const deleteProductCategory = createAsyncThunk(
  "productCategory/deleteProductCategory",
  async (payload: RemoveProductCategory, thunkapi) => {
    const {id, onError, onSuccess} = payload;
    try {
      const response = await fetch(`${config.backofficeApiBaseUrl}/product-category?id=${id}`, {
        method: "DELETE",
      });
      thunkapi.dispatch(removeProductCategory(id));
      {
        onSuccess && onSuccess();
      }
    } catch (error) {
      {
        onError && onError;
      }
      alert(error);
    }
  },
);

export const productCategory = createSlice({
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
    repalceProductCategory: (state, action: PayloadAction<ProductCategory>) => {
      state.productCategory = state.productCategory.map((item) =>
        item.id === action.payload.id ? action.payload : item,
      );
    },
    removeProductCategory: (state, action: PayloadAction<number>) => {
      state.productCategory = state.productCategory.filter((item) =>
        item.id === action.payload ? false : true,
      );
    },
  },
});
export const {
  setProductCategory,
  addProductCategory,
  repalceProductCategory,
  removeProductCategory,
} = productCategory.actions;
export default productCategory.reducer;
