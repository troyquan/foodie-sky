package com.sky.dto;

import lombok.Data;

import java.io.Serializable;

/**
 * Client User Login
 */
@Data
public class UserLoginDTO implements Serializable {

    private String userName;

    private String passWord;

}
