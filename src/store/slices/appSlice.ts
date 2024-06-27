import {config} from "@/config";
import {AppSlice} from "@/type/app";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {setUser} from "./userSlice";
import {setProductCategory} from "./productCategorySlice";

const initialState: AppSlice = {
  init: false,
  isLoading: false,
  error: null,
};

export const fetchData = createAsyncThunk("user/fetchData", async (payload, thunkAPI) => {
  thunkAPI.dispatch(setIsLoading(true));
  const response = await fetch(`${config.backofficeApiBaseUrl}/app`);
  const dataFromServer = await response.json();
  const {company, products, productCategories, user} = dataFromServer;
  console.log(productCategories)
  thunkAPI.dispatch(setInit(true));
  thunkAPI.dispatch(setIsLoading(false));
  thunkAPI.dispatch(setUser(user));
  thunkAPI.dispatch(setProductCategory(productCategories));
});

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
