import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const shoppingCartApi = createApi({
  reducerPath: "shoppingCartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/user/shoppingCart",
    prepareHeaders: (headers: Headers) => {
      const token = localStorage.getItem("token");
      token && headers.append("token", token);
    },
  }),
  tagTypes: ["carts"],
  endpoints: (builder) => ({
    addShoppingCart: builder.mutation({
      query: ({ dishId }) => ({
        url: "/add",
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: { dishId },
      }),
      invalidatesTags: ["carts"],
    }),

    showShoppingCart: builder.query({
      query: () => ({
        url: "/list",
        method: "GET",
      }),
      providesTags: ["carts"],
    }),

    clearShoppingCart: builder.mutation({
      query: () => ({
        url: "/clean",
        method: "DELETE",
      }),
      invalidatesTags: ["carts"],
    }),
  }),
});

export const {
  useAddShoppingCartMutation,
  useShowShoppingCartQuery,
  useClearShoppingCartMutation,
} = shoppingCartApi;
export default shoppingCartApi;
