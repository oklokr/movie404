package com.project.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.model.UserDto;
import com.project.repository.UserMapper;
import com.project.util.DateFormatUtil;

@Service
public class UserService {
    @Autowired
    private UserMapper userMapper;

    public UserDto getUserToLogin(String userId, String passwd) {
        UserDto user = userMapper.getUserToLogin(userId, passwd);
        if(user != null) {
            String signupDateConvert = DateFormatUtil.formatDate(user.getSignupDate(), user.getDateTpcdName());
            String toeknDateConvert = DateFormatUtil.formatDate(user.getTokenValidity(), user.getDateTpcdName());
            user.setSignupDateStr(signupDateConvert);
            user.setTokenValidityStr(toeknDateConvert);
        }
        return user;
    }
    
    public List<UserDto> getUserList() {
        List<UserDto> userList = userMapper.getUserList();
        for(UserDto user : userList) {
            String signupDateConvert = DateFormatUtil.formatDate(user.getSignupDate(), user.getDateTpcdName());
            String toeknDateConvert = DateFormatUtil.formatDate(user.getTokenValidity(), user.getDateTpcdName());
            user.setSignupDateStr(signupDateConvert);
            user.setTokenValidityStr(toeknDateConvert);
        }
        return userList;
    }
}