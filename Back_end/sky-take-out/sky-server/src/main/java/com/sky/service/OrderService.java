package com.sky.service;

import com.sky.dto.OrdersPageQueryDTO;
import com.sky.result.PageResult;

public interface OrderService {
    /**
     * Check Order Details
     * @param id
     * @return
     */
    OrderVO details(Long id);

    /**
     * Conditional Search Order
     * @param ordersPageQueryDTO
     * @return
     */
    PageResult conditionSearch(OrdersPageQueryDTO ordersPageQueryDTO);

    /**
     * Confirm Order
     *
     * @param ordersConfirmDTO
     */
    void confirm(OrdersConfirmDTO ordersConfirmDTO);

    /**
     * Reject Order
     *
     * @param ordersRejectionDTO
     */
    void rejection(OrdersRejectionDTO ordersRejectionDTO) throws Exception;

    /**
     * Cancel Order
     *
     * @param ordersCancelDTO
     */
    void cancel(OrdersCancelDTO ordersCancelDTO) throws Exception;

    /**
     * Order Delivery
     *
     * @param id
     */
    void delivery(Long id);

    /**
     * Complete Order
     *
     * @param id
     */
    void complete(Long id);
}
