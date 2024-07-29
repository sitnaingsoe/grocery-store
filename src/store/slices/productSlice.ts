import {config} from "@/config";
import {
  CreateProductPayload,
  deleteProductPayload,
  ProductPayload,
  UpdateProductPayload,
} from "@/type/product";
import {Product} from "@prisma/client";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import {setProductCategoryProduct} from "./productCatagoryProductSlice";

// Define a type for the slice state
// Define the initial state using that type
const initialState: ProductPayload = {
  product: [],
  isLoading: false,
  error: null,
};

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (payload: CreateProductPayload, thunkApi) => {
    const {onError, onSuccess} = payload;

    try {
      const response = await fetch(`${config.backofficeApiBaseUrl}/product`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const dataFromServer = await response.json();
      const {product} = dataFromServer;
      {
        onSuccess && onSuccess();
      }
      thunkApi.dispatch(addProduct(product));
    } catch (error) {
      {
        onError && onError();
      }
    }
  },
);

export const deleteProduct = createAsyncThunk(
  "product/deletProduct",
  async (payload: deleteProductPayload, thunkApi) => {
    const {productId, onError, onSuccess} = payload;
    try {
      const response = await fetch(`${config.backofficeApiBaseUrl}/product?id=${productId}`, {
        method: "DELETE",
      });
      {
        onSuccess && onSuccess();
      }
      //thunkApi.dispatch(setProductCategoryProduct(productCategoryProducts));
      thunkApi.dispatch(removeProduct(productId));
    } catch (error) {
      {
        onError && onError();
      }
    }
  },
);
export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async (payload: UpdateProductPayload, thunkApi) => {
    const {onError, onSuccess} = payload;

    try {
      const response = await fetch(`${config.backofficeApiBaseUrl}/product`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const dataFromServer = await response.json();
      const {updatedProduct, productCategoryProducts} = dataFromServer;
      {
        onSuccess && onSuccess();
      }
      //thunkApi.dispatch(setProductCategoryProduct(productCategoryProducts));
      thunkApi.dispatch(replaceProduct(updatedProduct));
    } catch (error) {
      {
        onError && onError();
      }
    }
  },
);
export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct: (state, actions: PayloadAction<Product[]>) => {
      state.product = actions.payload;
    },
    addProduct: (state, actions: PayloadAction<Product>) => {
      state.product = [...state.product, actions.payload];
    },
    replaceProduct: (state, action: PayloadAction<Product>) => {
      state.product = state.product.map((item) =>
        item.id === action.payload.id ? action.payload : item,
      );
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      state.product = state.product.filter((item) => !(item.id === action.payload));
    },
  },
});

export const {setProduct, addProduct, replaceProduct, removeProduct} = productSlice.actions;

export default productSlice.reducer;
