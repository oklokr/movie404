package com.project.service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.model.UserDto;
import com.project.repository.UserMapper;
import com.project.util.DateFormatUtil;

@Service
public class UserService {
    @Autowired
    private UserMapper userMapper;

    public UserDto getUser(String userId, String passwd) {
        UserDto user = userMapper.getUser(userId, passwd, null);
        if(user != null) {
            UUID uuid = UUID.randomUUID();
            LocalDateTime validity = LocalDateTime.now().plusHours(1);
            userMapper.updateToken(uuid.toString(), validity, userId);

            String signupDateConvert = DateFormatUtil.formatDate(user.getSignupDate(), user.getDateTpcdName());

            Date validityDate = Date.from(validity.atZone(ZoneId.systemDefault()).toInstant());
            String toeknDateConvert = DateFormatUtil.formatDate(validityDate, user.getDateTpcdName() + " HH:mm:ss");
            user.setSignupDateStr(signupDateConvert);
            user.setTokenValidity(validityDate);
            user.setTokenValidityStr(toeknDateConvert);
            user.setToken(uuid.toString());
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

    public void updateToken(String token, LocalDateTime tokenValidity, String userId) {
        userMapper.updateToken(token, tokenValidity, userId);
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

    public int resetUserPassword(String userId, String password) {
        return userMapper.resetUserPassword(userId, password);
    }

    public int updateUserType(String userId, String type) {
        return userMapper.updateUserType(userId, type);
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