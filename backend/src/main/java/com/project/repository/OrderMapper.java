package com.project.repository;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.project.model.Order;

@Mapper
public interface OrderMapper {
    void insertOrder(Order order);
    Order findOrderByCode(String orderCode);
    void updateImpUid(@Param("orderCode") String orderCode, @Param("impUid") String impUid);
    void updateCardNum(@Param("orderCode") String orderCode, @Param("cardNum") String cardNum);
}