import Cookies from "js-cookie";
import {createSlice} from "@reduxjs/toolkit";
import {register, login} from "./authServices";
import pushNotification from "../../utils/notify";

const initialState = {
  isMutation: {success: false},
  loggedStatus: {userToken: Cookies.get("token")},
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetMutationResult: (state) => {
      state.isMutation.success = false;
    },
    //_LOGOUT_//
    logout: (state) => {
      state.loggedStatus.userToken = null;
      Cookies.remove("token");
      pushNotification("Logout Successfully", "success");
    },
  },
  extraReducers: (builder) => {
    builder
      //_____________________REGISTER____________________//
      .addCase(register.pending, (state) => {
        state.isMutation.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isMutation.loading = false;
        state.loggedStatus.userToken = action.payload.data.token;
      })
      .addCase(register.rejected, (state, action) => {
        state.isMutation.loading = false;
      })
      //_____________________LOGIN____________________//
      .addCase(login.pending, (state) => {
        state.loggedStatus.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loggedStatus.loading = false;
        state.loggedStatus.error = false;
        state.loggedStatus.userToken = action.payload.data.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loggedStatus.loading = false;
        state.loggedStatus.error = action.payload;
      });
  },
});
export const {logout, resetMutationResult} = authSlice.actions;

export default authSlice.reducer;
