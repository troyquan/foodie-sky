package com.sky.mapper;

import com.sky.entity.DishFlavor;
import org.apache.ibatis.annotations.Delete;
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

    /**
     * Delete corresponding flavor data based on dish_id
     * @param dishId
     */
    @Delete("delete from dish_flavor where dish_id = #{dishId}")
    void deleteByDishId(Long dishId);
}
