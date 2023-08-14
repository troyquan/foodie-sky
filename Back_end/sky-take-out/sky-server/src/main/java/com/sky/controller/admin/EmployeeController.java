package com.sky.controller.admin;

import com.sky.constant.JwtClaimsConstant;
import com.sky.dto.EmployeeDTO;
import com.sky.dto.EmployeeLoginDTO;
import com.sky.dto.EmployeePageQueryDTO;
import com.sky.entity.Employee;
import com.sky.properties.JwtProperties;
import com.sky.result.PageResult;
import com.sky.result.Result;
import com.sky.service.EmployeeService;
import com.sky.utils.JwtUtil;
import com.sky.vo.EmployeeLoginVO;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * 员工管理
 */
@RestController
@RequestMapping("/admin/employee")
@Slf4j
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private JwtProperties jwtProperties;

    /**
     * 登录
     *
     * @param employeeLoginDTO
     * @return
     */
    @PostMapping("/login")
    public Result<EmployeeLoginVO> login(@RequestBody EmployeeLoginDTO employeeLoginDTO) {
        log.info("employee login：{}", employeeLoginDTO);

        Employee employee = employeeService.login(employeeLoginDTO);

        //login success and generate jwt token
        Map<String, Object> claims = new HashMap<>();
        claims.put(JwtClaimsConstant.EMP_ID, employee.getId());
        String token = JwtUtil.createJWT(
                jwtProperties.getAdminSecretKey(),
                jwtProperties.getAdminTtl(),
                claims);

        EmployeeLoginVO employeeLoginVO = EmployeeLoginVO.builder()
                .id(employee.getId())
                .userName(employee.getUsername())
                .name(employee.getName())
                .token(token)
                .build();

        return Result.success(employeeLoginVO);
    }

    /**
     * exit
     *
     * @return
     */
    @PostMapping("/logout")
    @ApiOperation("logout")
    public Result<String> logout() {
        return Result.success();
    }

    /**
     *add new employeee
     * @param employeeDTO
     * @return
     */
    @PostMapping
    @ApiOperation("Add Employee")
    public Result save(@RequestBody EmployeeDTO employeeDTO){
        log.info("add employee: {}", employeeDTO);
        employeeService.save(employeeDTO);
        return Result.success();
    }
    /**
     * employee page query
     */
    @GetMapping("/page")
    @ApiOperation("employee query pages")
    public Result<PageResult> page(EmployeePageQueryDTO employeePageQueryDTO){
        log.info("员工分页查询， 参数为： {}", employeePageQueryDTO);
        PageResult pageResult = employeeService.pageQuery(employeePageQueryDTO);
        return Result.success(pageResult);
    }

    /**
     * start or stop
     * @param status
     * @param id
     * @return
     */
    @PostMapping("/status/{status}")
    @ApiOperation("enable/disable employee account")
    public Result startOrStop(@PathVariable Integer status, Long id ){
        log.info("enable and disable employee account: {}, {}", status, id);
        employeeService.startOrStrop(status, id);
        return Result.success();
    }
    /**
     * get by ID
     */

    @GetMapping("/{id}")
    @ApiOperation("search employee")
    public Result<Employee> getById(@PathVariable Long id){
        Employee employee = employeeService.getById(id);
        return Result.success(employee);
    }
    /**
     * update
     */
    @PutMapping
    @ApiOperation("update")
    public Result update(@RequestBody EmployeeDTO employeeDTO){
        log.info("update info: {}",employeeDTO);
        employeeService.update(employeeDTO);
        return Result.success();
    }
}
