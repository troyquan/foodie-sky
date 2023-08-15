package com.sky.dto;

import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;
@Data
public class UserRegisterDTO implements Serializable {
    private Long id;

    private String name;

    private String userName;

    private String passWord;

    private String phone;

    private String gender;

    private LocalDateTime createTime;
}
