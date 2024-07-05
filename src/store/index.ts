import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import productReducer from "./slices/productSlice";
import productCategoryReducer from "./slices/productCategorySlice";
import appReducer from "./slices/appSlice";
import companyReducer from "./slices/companySlice";
import appSnackBarSlice from "./slices/appSnackBarSlice";
// ...

export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    productCategory: productCategoryReducer,
    app: appReducer,
    company: companyReducer,
    appSnackBar: appSnackBarSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
