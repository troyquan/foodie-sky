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
}
