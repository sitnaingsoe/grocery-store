import {Payload} from "@prisma/client/runtime/library";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
type SnackbarType = "error" | "success";

interface AppSnackbarSlice {
  type: SnackbarType;
  open: boolean;
  message: string;
}

const initialState: AppSnackbarSlice = {
  type: "success",
  open: false,
  message: "",
};

export const appSnackBarSlice = createSlice({
  name: "appSnackBar",
  initialState,
  reducers: {
    showSnackbar: (state, action: PayloadAction<{type: SnackbarType; message: string}>) => {
      const {type, message} = action.payload;
      state.open = true;
      state.type = type;
      state.message = message;
    },
    hideSnackbar: (state) => {
      state.open = false;
      state.type = "success";
      state.message = "";
    },
  },
});

export const {showSnackbar, hideSnackbar} = appSnackBarSlice.actions;
export default appSnackBarSlice.reducer;
