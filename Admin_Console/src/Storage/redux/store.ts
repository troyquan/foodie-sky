import { configureStore } from "@reduxjs/toolkit";

import { authApi, categoryApi, dishApi, userApi, weatherApi } from "../../Apis";

import { userAuthReducer } from "./userAuthSlice";
import { categoryReducer } from "./categorySlice";

const store = configureStore({
  reducer: {
    userAuthStore: userAuthReducer,
    categoryStore: categoryReducer,

    [authApi.reducerPath]: authApi.reducer,
    [weatherApi.reducerPath]: weatherApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [dishApi.reducerPath]: dishApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(weatherApi.middleware)
      .concat(userApi.middleware)
      .concat(categoryApi.middleware)
      .concat(dishApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
