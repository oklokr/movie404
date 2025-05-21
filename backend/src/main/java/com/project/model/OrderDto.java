package com.project.model;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderDto{
    private String orderCode;
    private String movieName;
    private Long price;
    private String orderDate;
    private String cardNum;
}
