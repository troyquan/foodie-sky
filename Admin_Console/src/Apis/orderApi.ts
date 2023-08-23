import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SD_Status } from "../utilities/SD";
const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/admin/order/",
    prepareHeaders: (headers: Headers) => {
      const userObj = localStorage.getItem("currentUser");
      let token;
      token = userObj && JSON.parse(userObj).token;
      // token && headers.append("Authorization", "Bearer " + token);
      token && headers.append("token", token);
      // headers.append("Content-type", "application/x-www-form-urlencoded");
    },
  }),

  tagTypes: ["Orders"],
  endpoints: (builder) => ({
    // getCategories: builder.query({
    //   query: ({ name, page, pageSize, type = "" }) => ({
    //     url: "page",
    //     method: "GET",
    //     params: {
    //       ...(name && { name }),
    //       ...(pageSize && { pageSize }),
    //       ...(page && { page }),
    //       ...(type && { type }),
    //     },
    //   }),
    //   transformResponse(apiResponse: { data: any }) {
    //     return {
    //       apiResponse,
    //       //   totalRecords: meta.response.headers.get("X-Pagination"),
    //     };
    //   },
    //   providesTags: ["Categories"],
    // }),

    getAllOrders: builder.query({
      query: ({
        page,
        pageSize,
        status,
        number,
        phone,
        beginTime,
        endTime,
      }) => ({
        url: "conditionSearch",
        method: "GET",
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
        },
        params: {
          page,
          pageSize,
          status,
          number,
          phone,
          beginTime,
          endTime,
        },
      }),

      providesTags: ["Orders"],
    }),
    getOrderById: builder.query({
      query: ({ id }) => ({
        url: `details/${id}`,
        method: "GET",
      }),

      providesTags: ["Orders"],
    }),

    handleAccept: builder.mutation({
      query: (id) => ({
        url: "confirm",
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: {
          id,
          status: SD_Status.ACCEPT,
        },
      }),
      invalidatesTags: ["Orders"],
    }),

    handleUndeliver: builder.mutation({
      query: (id) => ({
        url: `delivery/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Orders"],
    }),

    handleComplete: builder.mutation({
      query: (id) => ({
        url: `complete/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Orders"],
    }),

    handleReject: builder.mutation({
      query: (rejection) => ({
        url: "rejection",
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: rejection,
      }),
      invalidatesTags: ["Orders"],
    }),

    handleCancel: builder.mutation({
      query: (cancel) => ({
        url: "cancel",
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: cancel,
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useGetOrderByIdQuery,
  useHandleAcceptMutation,
  useHandleUndeliverMutation,
  useHandleCompleteMutation,
  useHandleRejectMutation,
  useHandleCancelMutation,
  //   useGetCategoriesQuery,
  //   useBlockCategoryMutation,
  //   useEnableCategoryMutation,
  //   useAddCategoryMutation,
  //   useGetCategoryQuery,
  //   useUpdateCategoryMutation,
  //   useDeleteCategoryMutation,
} = orderApi;
export default orderApi;
