import {config} from "@/config";
import {CompanyPayload, UpdateCompanyPayload} from "@/type/company";
import {ProductPayload} from "@/type/product";
import {Company, Product} from "@prisma/client";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import exp from "constants";

const initialState: CompanyPayload = {
  company: null,
  isLoading: false,
  error: null,
};

export const updateCompany = createAsyncThunk(
  "users/upDateUser",
  async (payload: UpdateCompanyPayload, thunkAPI) => {
    const {onError, onSuccess} = payload;
    console.log(payload);
    try {
      const response = await fetch(`${config.backofficeApiBaseUrl}/company`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const dataFromSever = await response.json();
      const {updatedCompany} = dataFromSever;
      thunkAPI.dispatch(setCompany(updatedCompany));
      onSuccess && onSuccess();
    } catch (error) {
      console.log(error);
      onError && onError();
    }
  },
);

export const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setCompany: (state, actions: PayloadAction<Company>) => {
      state.company = actions.payload;
    },
  },
});

export const {setCompany} = companySlice.actions;

export default companySlice.reducer;
