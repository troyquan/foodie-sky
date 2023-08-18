import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const shopApi = createApi({
  reducerPath: "shopApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/user/shop",
    prepareHeaders: (headers: Headers) => {
      const token = localStorage.getItem("token");
      token && headers.append("token", token);
    },
  }),
  endpoints: (builder) => ({
    getShopStatus: builder.query({
      query: () => ({
        url: "/status",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetShopStatusQuery } = shopApi;
export default shopApi;
