package com.sky.controller.admin;
import com.sky.result.Result;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.web.bind.annotation.*;

@RestController("adminShopController")
@RequestMapping("/admin/shop")
@Api(tags = "shop interface")
@Slf4j


public class ShopController {

    public static final  String Key = "SHOP_STATUS";
    @Autowired
    private RedisTemplate redisTemplate;

    @PutMapping("/{status}")
    @ApiOperation("setup shop status")
    public Result setStatus(@PathVariable Integer status){
        log.info("setup shop status to:{}",status == 1 ? "Open" : "Closed");
        redisTemplate.opsForValue().set("key",status);
        return Result.success();
    }

    @GetMapping("/status")
    @ApiOperation("acquire shop status")
    public Result<Integer> getStatus(){
        Integer status = (Integer) redisTemplate.opsForValue().get("key");
        log.info("acquired shop status: {}", status == 1 ? "open" : "Closed");
        return Result.success(status);
    }

}
