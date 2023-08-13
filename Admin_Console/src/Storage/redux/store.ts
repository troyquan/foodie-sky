import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../../Apis";

import { userAuthReducer } from "./userAuthSlice";
import weatherApi from "../../Apis/weatherApi";
import userApi from "../../Apis/userApi";

const store = configureStore({
  reducer: {
    userAuthStore: userAuthReducer,

    [authApi.reducerPath]: authApi.reducer,
    [weatherApi.reducerPath]: weatherApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(weatherApi.middleware)
      .concat(userApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
