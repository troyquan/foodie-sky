package com.sky.controller.admin;

import com.sky.dto.CategoryDTO;
import com.sky.dto.CategoryPageQueryDTO;
import com.sky.entity.Category;
import com.sky.result.PageResult;
import com.sky.result.Result;
import com.sky.service.CategoryService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 * category controller
 */
@RestController
@RequestMapping("/admin/category")
@Api(tags = "category interface")
@Slf4j
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    /**CategoryService
     * Add category
     * @param categoryDTO
     * @return
     */
    @PostMapping
    @ApiOperation("add category")
    public Result<String> save(@RequestBody CategoryDTO categoryDTO){
        log.info("add category：{}", categoryDTO);
        categoryService.save(categoryDTO);
        return Result.success();
    }

    /**
     * category pagination query
     * @param categoryPageQueryDTO
     * @return
     */
    @GetMapping("/page")
    @ApiOperation("category pagination query")
    public Result<PageResult> page(CategoryPageQueryDTO categoryPageQueryDTO){
        log.info("pagination query：{}", categoryPageQueryDTO);
        PageResult pageResult = categoryService.pageQuery(categoryPageQueryDTO);
        return Result.success(pageResult);
    }

    /**
     * delete category
     * @param id
     * @return
     */
    @DeleteMapping
    @ApiOperation("delete category")
    public Result<String> deleteById(Long id){
        log.info("delete category：{}", id);
        categoryService.deleteById(id);
        return Result.success();
    }

    /**
     * modify category
     * @param categoryDTO
     * @return
     */
    @PutMapping
    @ApiOperation("modify category")
    public Result<String> update(@RequestBody CategoryDTO categoryDTO){
        categoryService.update(categoryDTO);
        return Result.success();
    }

    /**
     * Enable/Disable Category
     * @param status
     * @param id
     * @return
     */
    @PostMapping("/status/{status}")
    @ApiOperation("Enable/Disable Category")
    public Result<String> startOrStop(@PathVariable("status") Integer status, Long id){
        categoryService.startOrStop(status,id);
        return Result.success();
    }

    /**
     * Query Categories by Type
     * @param type
     * @return
     */
    @GetMapping("/list")
    @ApiOperation("Query Categories by Type")
    public Result<List<Category>> list(Integer type){
        List<Category> list = categoryService.list(type);
        return Result.success(list);
    }
}
