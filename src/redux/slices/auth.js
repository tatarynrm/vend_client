import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from '../../utils/axios'
export const fetchAuth = createAsyncThunk(
    "auth/fetchUserData",
    async (params) => {
      try {
        const { data } = await axios.post("/auth/login", params);
  
        return data;
      } catch (error) {
        console.log(error);
      }
    }
  );
  export const fetchRegister = createAsyncThunk(
    "auth/fetchRegisterUser",
    async (params) => {
      const { data } = await axios.post("/auth/register", params);
      return data;
    }
  );
  export const fetchAuthMe = createAsyncThunk(
    "auth/fetchAuthMe",
    async (params) => {
      try {
        const { data } = await axios.get("/auth/me", params);
      return data;
      } catch (error) {
        if (error.response.status === 403) {
          localStorage.clear()
        }

      }
    }
  );
  const initialState = {
    data: null,
    status: "loading",
  };
  
  const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      logout: (state) => {
        state.data = null;
        state.status = "loaded";
      },
    },
    extraReducers: {
      [fetchAuth.pending]: (state) => {
        state.status = "loading";
        state.data = null;
      },
      [fetchAuth.fulfilled]: (state, action) => {
        state.status = "loaded";
        state.data = action.payload;
      },
      [fetchAuth.rejected]: (state) => {
        state.status = "error";
        state.data = null;
      },
      [fetchAuthMe.pending]: (state) => {
        state.status = "loading";
        state.data = null;
      },
      [fetchAuthMe.fulfilled]: (state, action) => {
        state.status = "loaded";
        state.data = action.payload;
      },
      [fetchAuthMe.rejected]: (state) => {
        state.status = "error";
        state.data = null;
      },
      [fetchRegister.pending]: (state) => {
        state.status = "loading";
        state.data = null;
      },
      [fetchRegister.fulfilled]: (state, action) => {
        state.status = "loaded";
        state.data = action.payload;
      },
      [fetchRegister.rejected]: (state) => {
        state.status = "error";
        state.data = null;
      },
    },
  });
  
  export const selectIsAuth = (state) => Boolean(state.auth.data);
  export const authReducer = authSlice.reducer;
  
  export const { logout } = authSlice.actions;
  