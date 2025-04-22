import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "../store.ts";
import toast from "react-hot-toast";

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

// Fetch authenticated user
export const fetchAuthenticatedUser = createAsyncThunk<
  User,
  void,
  { state: RootState }
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
    return rejectWithValue("Error when fetching user");
  }
});

// Logout user
export const logOutUser = createAsyncThunk<
  void,
  { navigate: (path: string) => void }, // Accept navigate as an argument
  { state: RootState }
>("auth/logoutUser", async ({ navigate }, { dispatch, rejectWithValue }) => {
  try {
    const res = await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    if (!res.ok) {
      throw new Error("Failed to log out");
    }
    dispatch(logout());
    toast.success("Logged out successfully!");
    navigate("/");
  } catch (error) {
    console.error("Error logging out:", error);
    return rejectWithValue("Error logging out");
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
    builder.addCase(logOutUser.rejected, () => {
      toast.error("Error");
    });
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
