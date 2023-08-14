package com.sky.service;

import com.sky.dto.CategoryDTO;
import com.sky.dto.CategoryPageQueryDTO;
import com.sky.entity.Category;
import com.sky.result.PageResult;
import java.util.List;

public interface CategoryService {

    /**
     * Add new category
     * @param categoryDTO
     */
    void save(CategoryDTO categoryDTO);

    /**
     * Pagination query
     * @param categoryPageQueryDTO
     * @return
     */
    PageResult pageQuery(CategoryPageQueryDTO categoryPageQueryDTO);

    /**
     * Delete category by ID
     * @param id
     */
    void deleteById(Long id);

    /**
     * Modify category
     * @param categoryDTO
     */
    void update(CategoryDTO categoryDTO);

    /**
     * Enable/Disable category
     * @param status
     * @param id
     */
    void startOrStop(Integer status, Long id);

    /**
     * Query categories by type
     * @param type
     * @return
     */
    List<Category> list(Integer type);
}
