package com.project.model;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UserDto {
    private String userId;
    private String passwd;
    private String userName;
    private String email;
    private String tel;
    private int age;
    private Date signupDate;
    private String signupDateStr;
    private String token;
    private Date tokenValidity;
    private String tokenValidityStr;
    private String viewAdult;
    private String saveHistory;
    private String terms;
    private String langTpcd;
    private String langTpcdName;
    private String dateTpcd;
    private String dateTpcdName;
    private String userTpcd;
    private String userTpcdName;
}
