package com.sky.service;

import com.sky.dto.DishDTO;
import com.sky.dto.DishPageQueryDTO;
import com.sky.result.PageResult;

import java.util.List;

/**
 * @author Lingjun
 * @date 2023/8/10 17:38
 */
public interface DishService {
    /**
     * Create new dishes and corresponding flavors
     *
     * @param dishDTO
     */
    public void saveWithFlavor(DishDTO dishDTO);

    /**
     * Dish Pagination Query
     *
     * @param dishPageQueryDTO
     * @return
     */
    PageResult pageQuery(DishPageQueryDTO dishPageQueryDTO);

    /**
     * Batch deletion of dishes
     *
     * @param ids
     */
    void deleteBatch(List<Long> ids);
}
