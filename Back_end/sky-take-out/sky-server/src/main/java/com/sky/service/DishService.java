package com.sky.service;

import com.sky.dto.DishDTO;
import com.sky.dto.DishPageQueryDTO;
import com.sky.result.PageResult;
import com.sky.vo.DishVO;

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

    /**
     * Query dishes and corresponding flavor data based on ids
     *
     * @param id
     * @return
     */
    DishVO getByIdWithFlavor(Long id);

    /**
     * Update the basic information of the dish and the corresponding flavor information according to the id
     *
     * @param dishDTO
     */
    void updateWithFlavor(DishDTO dishDTO);
}
