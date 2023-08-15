package com.sky.controller.user;

import com.sky.constant.JwtClaimsConstant;
import com.sky.dto.UserLoginDTO;
import com.sky.dto.UserRegisterDTO;
import com.sky.entity.User;
import com.sky.properties.JwtProperties;
import com.sky.result.Result;
import com.sky.service.UserService;
import com.sky.utils.JwtUtil;
import com.sky.vo.UserLoginVO;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/user")
@Api (tags = "User Api")
@Slf4j
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtProperties jwtProperties;

    /**
     * User Register
     * @param userRegisterDTO
     * @return
     */
    @PostMapping("/register")
    @ApiOperation("Register User")
    public Result register(@RequestBody UserRegisterDTO userRegisterDTO){
        log.info("Register New User: {}", userRegisterDTO);
        userService.register(userRegisterDTO);

        return Result.success();

    }

    /**
     * User Login
     * @param userloginvo
     * @return
     */
    @PostMapping("/login")
    @ApiOperation("User Login")
    public Result<UserLoginVO> login(@RequestBody UserLoginDTO userloginvo){
        log.info("User Login: {}",userloginvo);
        User user = userService.login(userloginvo);

        //generate JWT
        Map<String, Object> claims = new HashMap<>();
        claims.put(JwtClaimsConstant.USER_ID,user.getId());
        String token = JwtUtil.createJWT(
                jwtProperties.getUserSecretKey(),
                jwtProperties.getUserTtl(),
                claims
        );

        UserLoginVO userLoginVO = UserLoginVO.builder()
                .id(user.getId())
                .token(token)
                .userName(user.getUserName())
                .build();

        return Result.success(userLoginVO);
    }

    /**
     * User Logout
     * @return
     */

    @PostMapping("/logout")
    @ApiOperation("User Logout")
    public Result<String> logout() {
        return Result.success();
    }


}
