import { configureStore } from "@reduxjs/toolkit";
import { authApi, dishApi, shopApi,orderApi} from "../../Apis";

import { userAuthReducer } from "./userAuthSlice";
import { shoppingCartReducer } from "./shoppingCartSlice";
import shoppingCartApi from "../../Apis/shoppingCartApi";
import { searchReducer } from "./searchSlice";
import { cateogryReducer } from "./categorySlice";


const store = configureStore({
  reducer: {
    userAuthStore: userAuthReducer,
    searchStore: searchReducer,
    categoryStore: cateogryReducer,
    shoppingCartStore: shoppingCartReducer,
    [authApi.reducerPath]: authApi.reducer,
    [shopApi.reducerPath]: shopApi.reducer,
    [dishApi.reducerPath]: dishApi.reducer,
    [shoppingCartApi.reducerPath]: shoppingCartApi.reducer,
    [orderApi.reducerPath]:orderApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(shopApi.middleware)
      .concat(dishApi.middleware)
      .concat(shoppingCartApi.middleware)
        .concat(orderApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
