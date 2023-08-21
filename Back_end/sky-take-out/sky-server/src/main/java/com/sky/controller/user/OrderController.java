package com.sky.controller.user;

import com.sky.context.BaseContext;
import com.sky.dto.OrdersSubmitDTO;
import com.sky.entity.ShoppingCart;
import com.sky.result.PageResult;
import com.sky.result.Result;
import com.sky.service.OrderService;
import com.sky.service.ShoppingCartService;
import com.sky.service.UserService;
import com.sky.utils.StripePayUtil;
import com.sky.vo.OrderSubmitVO;
import com.sky.vo.OrderVO;
import com.stripe.exception.StripeException;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController("userOrderController")
@RequestMapping("/user/order")
@Api(tags = "Order API")
@Slf4j
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PutMapping("/cancel/{id}")
    @ApiOperation("Cancel Order")
    public Result cancel(@PathVariable Long id) throws Exception{
        orderService.cancelById(id);
        return Result.success();
    }
}
