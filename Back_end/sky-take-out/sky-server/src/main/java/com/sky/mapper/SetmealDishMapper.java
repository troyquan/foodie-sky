package com.sky.mapper;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * @author Lingjun
 * @date 2023/8/11 16:38
 */
@Mapper
public interface SetmealDishMapper {
    /**
     * Query the corresponding setmeal_id according to the dish_id
     *
     * @param dishIds
     * @return
     */
    //select setmeal_id from setmeal_dish where dish_id in (1,2,3,4)
    List<Long> getSetmealIdsByDishIds(List<Long> dishIds);
}
