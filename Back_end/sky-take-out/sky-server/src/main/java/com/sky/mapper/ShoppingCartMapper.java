package com.sky.mapper;

import com.sky.entity.ShoppingCart;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Update;

import java.util.List;

@Mapper
public interface ShoppingCartMapper {
    /**
     * @param shoppingCart
     * @return
     */
    List<ShoppingCart> list(ShoppingCart shoppingCart);

    /**
     * Update product quantity based on ID
     * @param shoppingCart
     */
    @Update("update shopping_cart set number = #{number} where id = #{id}")
    void updateNumberById(ShoppingCart shoppingCart);

    /**
     * Insert shopping cart data
     * @param shoppingCart
     */
    @Insert("insert into shopping_cart (name, user_id, dish_id, number, amount, image, create_time) " +
            " values (#{name},#{userId},#{dishId},#{number},#{amount},#{image},#{createTime})")
    void insert(ShoppingCart shoppingCart);


    /**
     * Bulk insert shopping cart data
     *
     * @param shoppingCartList
     */
    void insertBatch(List<ShoppingCart> shoppingCartList);


    /**
     * Delete shopping cart data based on user ID
     * @param userId
     */
    @Delete("delete from shopping_cart where user_id = #{userId}")
    void deleteByUserId(Long userId);

    /**
     * Delete shopping cart data based on ID
     * @param id
     */
    @Delete("delete from shopping_cart where id = #{id}")
    void deleteById(Long id);




}
