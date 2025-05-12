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

    public UserDto getUserDetail(String userId) {
        UserDto user = userMapper.getUserDetail(userId);
        if(user != null) {
            String signupDateConvert = DateFormatUtil.formatDate(user.getSignupDate(), user.getDateTpcdName());
            String tokenDateConvert = DateFormatUtil.formatDate(user.getTokenValidity(), user.getDateTpcdName());
            user.setSignupDateStr(signupDateConvert);
            user.setTokenValidityStr(tokenDateConvert);
        }
        return user;
    }

    public boolean resetUserPassword(String userId, String password) {
        return userMapper.resetUserPassword(userId, password) > 0;
    }

    public boolean updateUserType(String userId, String type) {
        return userMapper.updateUserType(userId, type) > 0;
    }

    public int checkId(String id){
        return userMapper.checkId(id);
    } 

    public int checkEmail(String email){
        return userMapper.checkEmail(email);
    } 

    public int insertUser(UserDto newUser){

        return userMapper.insertUser(newUser);
    }
}