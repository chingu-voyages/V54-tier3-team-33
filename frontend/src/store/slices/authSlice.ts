import {ActionReducerMapBuilder , createAsyncThunk , createSlice , PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store.ts";

export interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

export const fetchAuthenticatedUser = createAsyncThunk<
  User,
  void,
  { state:RootState }
>("auth/fetchAuthUserStatus", async (_, { rejectWithValue }) => {
  try {
    const res = await fetch("/api/auth/me", {
      credentials: "include",
    });
    if (!res.ok) {
      return rejectWithValue("Invalid or expired token");
    }
    const data = await res.json();
    return data.data;
  } catch {
     return rejectWithValue("Error when fetching user ");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<AuthState>) => {
    builder.addCase(fetchAuthenticatedUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    });
    builder.addCase(fetchAuthenticatedUser.rejected, (state) => {
      state.user = null;
      state.isAuthenticated = false;
    });
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
