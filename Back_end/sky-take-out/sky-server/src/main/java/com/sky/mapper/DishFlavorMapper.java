package com.sky.mapper;

import com.sky.entity.DishFlavor;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * @author Lingjun
 * @date 2023/8/10 18:01
 */

@Mapper
public interface DishFlavorMapper {
    /**
     * Batch insertion of flavor data
     * @param flavors
     */
    void insertBatch(List<DishFlavor> flavors);
}
