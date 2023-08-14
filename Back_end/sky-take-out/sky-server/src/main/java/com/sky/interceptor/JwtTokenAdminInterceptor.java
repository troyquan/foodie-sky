package com.sky.interceptor;

import com.sky.constant.JwtClaimsConstant;
import com.sky.context.BaseContext;
import com.sky.properties.JwtProperties;
import com.sky.utils.JwtUtil;
import io.jsonwebtoken.Claims;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * jwt token interceptor
 */
@Component
@Slf4j
public class JwtTokenAdminInterceptor implements HandlerInterceptor {

    @Autowired
    private JwtProperties jwtProperties;

    /**
     * verify jwt
     *
     * @param request
     * @param response
     * @param handler
     * @return
     * @throws Exception
     */
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        System.out.println("Current thread line name" + Thread.currentThread().getName());
        //determine if the current intercepted request is targeting a Controller's method or some other resource
        if (!(handler instanceof HandlerMethod)) {
            //If the current intercepted request is not a dynamic method, allow it to proceed
            return true;
        }

        //1、Obtain the token from the request heade
        String token = request.getHeader(jwtProperties.getAdminTokenName());

        //2、Verify the token
        try {
            log.info("jwt verify:{}", token);
            Claims claims = JwtUtil.parseJWT(jwtProperties.getAdminSecretKey(), token);
            Long empId = Long.valueOf(claims.get(JwtClaimsConstant.EMP_ID).toString());
            log.info("current employee d：", empId);
            BaseContext.setCurrentId(empId);
            //3、pass approved
            return true;
        } catch (Exception ex) {
            //4、Not approved, respond with a 401 status code
            response.setStatus(401);
            return false;
        }
    }
}
