package com.sky.service;

import com.sky.dto.UserLoginDTO;
import com.sky.dto.UserRegisterDTO;
import com.sky.entity.User;

public interface UserService {
    void register(UserRegisterDTO userRegisterDTO);

    User login(UserLoginDTO userloginvo);
}
