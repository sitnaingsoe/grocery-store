import {config} from "@/config";
import {AppSlice, uploadAssetPayload} from "@/type/app";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {setUser} from "./userSlice";
import {setProductCategory} from "./productCategorySlice";
import {setProduct} from "./productSlice";
import {setCompany} from "./companySlice";
import {setProductCategoryProduct} from "./productCatagoryProductSlice";

const initialState: AppSlice = {
  init: false,
  isLoading: false,
  error: null,
};

export const fetchData = createAsyncThunk("user/fetchData", async (payload, thunkAPI) => {
  thunkAPI.dispatch(setIsLoading(true));
  const response = await fetch(`${config.backofficeApiBaseUrl}/app`);
  const dataFromServer = await response.json();
  const {company, products, productCategories, user, productCategoryProducts} = dataFromServer;

  thunkAPI.dispatch(setInit(true));
  thunkAPI.dispatch(setIsLoading(false));
  thunkAPI.dispatch(setUser(user));
  thunkAPI.dispatch(setProduct(products));
  thunkAPI.dispatch(setProductCategory(productCategories));
  thunkAPI.dispatch(setCompany(company));
  thunkAPI.dispatch(setProductCategoryProduct(productCategoryProducts));
});

export const uploadAsset = createAsyncThunk(
  "app/uploadAsset",
  async (payload: uploadAssetPayload, thunkAPI) => {
    const { file, onSuccess, onError } = payload;
    try {
      const formData = new FormData();
      formData.append("file", file);

    const response = await fetch(`${config.backofficeApiBaseUrl}/asset`, {
      method: "POST",
      body: formData,
    });

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      onSuccess && onSuccess(data.assetUrl);

      return data.assetUrl;
    } catch (error) {
      onError && onError(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export interface UploadAssetPayload {
  file: File;
  onSuccess?: (assetUrl: string) => void;
  onError?: (error: any) => void;
}

export const uploadAsset2 = createAsyncThunk(
  "app/uploadAsset",
  async (payload: UploadAssetPayload, thunkAPI) => {
    const { file, onSuccess, onError } = payload;
    try {
      const formData = new FormData();
      formData.append("file", file);

       const res = await fetch(`${config.backofficeApiBaseUrl}/asset`, {
      method: "POST",
      body: formData,
      });
      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      onSuccess && onSuccess(data.assetUrl);

      return data.assetUrl;
    } catch (error) {
      onError && onError(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const appSlice = createSlice({
  name: "app",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setInit: (state, action: PayloadAction<boolean>) => {
      state.init = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {setInit, setIsLoading} = appSlice.actions;

export default appSlice.reducer;
