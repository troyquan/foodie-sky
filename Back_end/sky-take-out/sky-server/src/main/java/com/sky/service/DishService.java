package com.sky.service;

import com.sky.dto.DishDTO;

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
}
