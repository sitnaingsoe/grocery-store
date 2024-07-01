import {CompanyPayload} from "@/type/company";
import {ProductPayload} from "@/type/product";
import {Company, Product} from "@prisma/client";
import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";

const initialState: CompanyPayload = {
  company: null,
  isLoading: false,
  error: null,
};

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
