import {config} from "@/config";
import {CreateUserPayload, DeleteUserPayload} from "@/type/user";
import {User} from "@prisma/client";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
// Define a type for the slice state
interface UserSlice {
  users: User[];
  isLoading: boolean;
  error: null | String;
}

// Define the initial state using that type
const initialState: UserSlice = {
  users: [],
  isLoading: false,
  error: null,
};

export const createUser = createAsyncThunk(
  "users/createUser",
  async (payload: CreateUserPayload, thunkAPI) => {
    const response = await fetch(`${config.backofficeApiBaseUrl}/user`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const dataFromServer = await response.json();
    const {user} = dataFromServer;

    thunkAPI.dispatch(addUser(user));
  },
);

export const upDateUser = createAsyncThunk(
  "users/upDateUser",
  async (payload: CreateUserPayload, thunkAPI) => {
    const response = await fetch(`${config.backofficeApiBaseUrl}/user`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const dataFromServer = await response.json();
    const {user} = dataFromServer;

    thunkAPI.dispatch(replaceUser(user));
  },
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (payload: DeleteUserPayload, thunkAPI) => {
    const {id} = payload;
    const response = await fetch(`${config.backofficeApiBaseUrl}/user?id=${id}`, {
      method: "DELETE",
    });
    if (id) {
      thunkAPI.dispatch(removeUser(id));
    }
  },
);

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    addUser: (state, action: PayloadAction<User>) => {
      state.users = [...state.users, action.payload];
    },
    replaceUser: (state, action: PayloadAction<User>) => {
      state.users = state.users.map((user) =>
        user.id === action.payload.id ? action.payload : user,
      );
    },
    removeUser: (state, action: PayloadAction<number>) => {
      state.users = state.users.filter((user) => (user.id === action.payload ? false : true));
    },
  },
});

export const {setUser, addUser, replaceUser, removeUser} = userSlice.actions;

export default userSlice.reducer;
