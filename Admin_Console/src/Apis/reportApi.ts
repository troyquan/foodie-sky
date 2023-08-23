import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const reportApi = createApi({
  reducerPath: "reportApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/admin/report",
    prepareHeaders: (headers: Headers) => {
      const token = localStorage.getItem("token");
      token && headers.append("token", token);
    },
  }),
  tagTypes: ["Turnover", "User", "Orders", "Ranking", "Export"],
  endpoints: (builder) => ({
    getTurnover: builder.query({
      query: ({ begin, end }) => ({
        url: `/turnoverStatistics`,
        method: "GET",

        params: { begin, end },
      }),
      transformResponse(apiResponse: { data: any }) {
        return {
          apiResponse,
        };
      },
      providesTags: ["Turnover"],
    }),

    getUserData: builder.query({
      query: ({ begin, end }) => ({
        url: `/userStatistics`,
        method: "GET",

        params: { begin, end },
      }),
      transformResponse(apiResponse: { data: any }) {
        return {
          apiResponse,
        };
      },
      providesTags: ["User"],
    }),

    getOrderData: builder.query({
      query: ({ begin, end }) => ({
        url: `/ordersStatistics`,
        method: "GET",

        params: { begin, end },
      }),
      transformResponse(apiResponse: { data: any }) {
        return {
          apiResponse,
        };
      },
      providesTags: ["Orders"],
    }),

    getSalesRankingData: builder.query({
      query: ({ begin, end }) => ({
        url: `/top10`,
        method: "GET",
        params: { begin, end },
      }),
      transformResponse(apiResponse: { data: any }) {
        return {
          apiResponse,
        };
      },
      providesTags: ["Ranking"],
    }),

    getExportBusinessData: builder.query({
      query: () => ({
        url: "/export",
        method: "GET",
      }),

      providesTags: ["Export"],
    }),
  }),
});

export const {
  useGetUserDataQuery,
  useGetTurnoverQuery,
  useGetOrderDataQuery,
  useGetSalesRankingDataQuery,
  useGetExportBusinessDataQuery,
} = reportApi;
export default reportApi;
