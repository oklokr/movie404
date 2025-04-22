package com.project.model;

import java.sql.Timestamp;
import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UserDto {
    private String id;
    private String companyName;
    private String password;
    private String email;
    private String businessNumber;
    private String phoneNumber;
    private String address;
    private String detailedAddress;
    private String postalCode;
    private int memberType;
    private Timestamp joinDate;
    private Date sessionExpiryTime;
}
