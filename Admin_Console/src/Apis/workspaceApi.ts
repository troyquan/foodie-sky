import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const workspaceApi = createApi({
  reducerPath: "workspaceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/admin/workspace/",
    prepareHeaders: (headers: Headers) => {
      let token = localStorage.getItem("token");

      token && headers.append("token", token);
    },
  }),

  tagTypes: ["workspace"],
  endpoints: (builder) => ({
    getWorkspaceToday: builder.query({
      query: () => ({
        url: "businessData",
        method: "GET",
      }),
      //   transformResponse(apiResponse: { data: any }) {
      //     return {
      //       apiResponse,
      //     };
      //   },
      providesTags: ["workspace"],
    }),

    getWorkspaceDish: builder.query({
      query: () => ({
        url: "overviewDishes",
        method: "GET",
      }),

      providesTags: ["workspace"],
    }),

    getWorkspaceOrders: builder.query({
      query: () => ({
        url: "overviewOrders",
        method: "GET",
      }),

      providesTags: ["workspace"],
    }),
  }),
});

export const {
  useGetWorkspaceTodayQuery,
  useGetWorkspaceDishQuery,
  useGetWorkspaceOrdersQuery,
} = workspaceApi;
export default workspaceApi;
