package com.sky.mapper;

import com.sky.entity.User;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface UserMapper {
    @Select("SELECT * FROM USER WHERE name = #{name}")
    User getByName(String name);

    @Select("SELECT * FROM USER WHERE username = #{username}")
    User getByUsername(String username);

    @Insert("INSERT INTO user (name, username, password, phone, gender, create_time)" +
            "VALUES" +
            "(#{name},#{userName},#{passWord},#{phone},#{gender},#{createTime});")
    void save(User user);
}
