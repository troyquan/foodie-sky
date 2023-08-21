import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const dishApi = createApi({
  reducerPath: "dishApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/user/dish/",
    // prepareHeaders: (headers: Headers) => {
    //   let token = localStorage.getItem("token");

    //   token && headers.append("token", token);
    // },
  }),

  tagTypes: ["dishes"],
  endpoints: (builder) => ({
    getDishes: builder.query({
      query: () => ({
        url: "list",
        method: "GET",
      }),
      transformResponse(apiResponse: { data: any }) {
        return {
          apiResponse,
        };
      },
      providesTags: ["dishes"],
    }),

    getDishByCategory: builder.query({
      query: (categoryId) => ({
        url: "list",
        method: "GET",
        params: { categoryId },
      }),

      providesTags: ["dishes"],
    }),
  }),
});

export const { useGetDishesQuery, useGetDishByCategoryQuery } = dishApi;
export default dishApi;
