import {configureStore, combineReducers} from "@reduxjs/toolkit";
import logger from "redux-logger";
import authSlice from "../services/auth/authSlice";

const reducers = combineReducers({auth: authSlice});

const middlewares = process.env.NODE_ENV !== "production" && logger;

const store = configureStore({
  reducer: reducers,
  // preloadedState:{},
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(middlewares),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
