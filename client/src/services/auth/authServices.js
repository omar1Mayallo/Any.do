import {createAsyncThunk} from "@reduxjs/toolkit";
import {usePostData} from "../../common/hooks/api/usePost";
import Cookies from "js-cookie";
import pushNotification from "../../utils/notify";

//_____________________REGISTER____________________//
export const register = createAsyncThunk(
  "auth/register",
  async (body, {rejectWithValue}) => {
    try {
      const res = await usePostData("/auth/register", body);
      pushNotification("Registered Successfully", "success");
      // Set token to cookies to expire in 30 days
      Cookies.set("token", res.data.token, {expires: 30});
      return res;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        (error.response && error.response.data && error.response.data.errors) ||
        error.message;
      console.log(message);
      if (typeof message === "string") {
        pushNotification(message, "error");
      } else {
        message.forEach((el) => {
          pushNotification(el.msg, "error");
        });
      }
      return rejectWithValue(message);
    }
  }
);

//_____________________LOGIN____________________//
export const login = createAsyncThunk(
  "auth/login",
  async (body, {rejectWithValue}) => {
    try {
      const res = await usePostData("/auth/login", body);
      pushNotification("Login Successfully", "success");
      // Set token to cookies to expire in 30 days
      Cookies.set("token", res.data.token, {expires: 30});
      return res;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        (error.response && error.response.data && error.response.data.errors) ||
        error.message;
      if (typeof message === "string") {
        pushNotification(message, "error");
      } else {
        message.forEach((el) => {
          pushNotification(el.msg, "error");
        });
      }
      return rejectWithValue(message);
    }
  }
);
