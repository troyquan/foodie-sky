package com.sky.service.impl;

import com.sky.constant.MessageConstant;
import com.sky.dto.UserLoginDTO;
import com.sky.dto.UserRegisterDTO;
import com.sky.entity.User;
import com.sky.exception.AccountNotFoundException;
import com.sky.exception.PasswordErrorException;
import com.sky.mapper.UserMapper;
import com.sky.service.UserService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;

import java.time.LocalDateTime;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public void register(UserRegisterDTO userRegisterDTO) {
        //check if username exists

        User user = new User();
        BeanUtils.copyProperties(userRegisterDTO,user);
        user.setPassWord(DigestUtils.md5DigestAsHex(user.getPassWord().getBytes()));
        user.setCreateTime(LocalDateTime.now());
        userMapper.save(user);
    }

    @Override
    public User login(UserLoginDTO userLoginDTO) {
        String username = userLoginDTO.getUserName();
        String password = userLoginDTO.getPassWord();

        User user = userMapper.getByUsername(username);

        if (user == null){
            throw new AccountNotFoundException(MessageConstant.ACCOUNT_NOT_FOUND);
        }

        password = DigestUtils.md5DigestAsHex(password.getBytes());
        System.out.println(password);
        if (!password.equals(user.getPassWord())){
            throw new PasswordErrorException(MessageConstant.PASSWORD_ERROR);

        }


        return user;
    }
}
