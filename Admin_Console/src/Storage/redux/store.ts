import { configureStore } from "@reduxjs/toolkit";
import { authApi, categoryApi, userApi, weatherApi } from "../../Apis";

import { userAuthReducer } from "./userAuthSlice";

const store = configureStore({
  reducer: {
    userAuthStore: userAuthReducer,

    [authApi.reducerPath]: authApi.reducer,
    [weatherApi.reducerPath]: weatherApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(weatherApi.middleware)
      .concat(userApi.middleware)
      .concat(categoryApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
