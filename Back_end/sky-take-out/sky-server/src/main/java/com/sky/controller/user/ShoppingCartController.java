package com.sky.controller.user;

import com.sky.dto.ShoppingCartDTO;
import com.sky.result.Result;
import com.sky.service.ShoppingCartService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user/shoppingCart")
@Slf4j
@Api(tags = "Customer-side shopping cart related APIs")
public class ShoppingCartController {

    @Autowired
    private ShoppingCartService shoppingCartService;

    /**
     * Add to cart
     * @param shoppingCartDTO
     * @return
     */
    @PostMapping("/add")
    @ApiOperation("Add to cart")
    public Result add(@RequestBody ShoppingCartDTO shoppingCartDTO){
        log.info("Add to cart, product information：{}",shoppingCartDTO);
        shoppingCartService.addShoppingCart(shoppingCartDTO);
        return Result.success();
    }
}
