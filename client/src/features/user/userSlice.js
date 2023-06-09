import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  user: {},
  error: "",
};

export const fetchUser = createAsyncThunk("user/fetchUser", () => {
  return axios.get("/api/auth/profile").then((res) => res.data);
});

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      (state.loading = false),
        (state.user = action.payload),
        (state.error = "");
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      (state.loading = false),
        (state.user = {}),
        (state.error = action.payload.message);
    });
  },
});

export default userSlice.reducer;
