import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const orderApi = createApi({
    reducerPath: "orderDetailApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/user/order",
        prepareHeaders: (headers: Headers) => {
            const token = localStorage.getItem("token");
            token && headers.append("token", token);
        },
    }),
    tagTypes:["Orders"],
    endpoints: (builder) => ({
        getOrderHistory: builder.query({
            query: ({page, pageSize}) => ({
                url: "historyOrders",
                method: "GET",
                params: {
                    ...(pageSize && {pageSize}),
                    ...(page && {page}),
                },
            }),
            transformResponse(apiResponse: { data: any }) {
                return {
                    apiResponse,
                };
            },
            providesTags:["Orders"],
        }),

        getOrderDetails: builder.query({
            query: ({id}) => ({
                url: `orderDetail/${id}`,
                method: "GET",
                params: {id},
            }),
            transformResponse(apiResponse: { data: any }) {
                return {
                    apiResponse,
                };
            },
        }),

        cancelOrder: builder.mutation({
            query: ({id}) => ({
                url: `cancel/${id}`,
                method: "PUT",
                params: {id},
            }),
            invalidatesTags: ["Orders"],
        })

    }),
});

export const {
    useGetOrderHistoryQuery,
    useGetOrderDetailsQuery,
    useCancelOrderMutation
} = orderApi;
export default orderApi;
