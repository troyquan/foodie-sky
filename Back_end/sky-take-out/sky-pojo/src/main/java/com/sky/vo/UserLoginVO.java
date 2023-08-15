package com.sky.vo;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(description = "User Login return datatype")
public class UserLoginVO implements Serializable {
    @ApiModelProperty("id")
    private Long id;

    @ApiModelProperty("username")
    private String userName;

    @ApiModelProperty("JWT Token")
    private String token;

}
