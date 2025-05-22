package com.project.model;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Order {
    private String orderCode;
    private String userId;
    private String movieCode;
    private int price;
    private LocalDate orderDate;
    private String cardNum;
    private String impUid;
}