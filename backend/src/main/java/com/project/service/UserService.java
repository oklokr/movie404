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

    public UserDto getUser(String userId, String passwd, String token, Boolean isLogin) {
    	userId = (userId != null && !userId.isEmpty()) ? userId : null;
        passwd = (passwd != null && !passwd.isEmpty()) ? passwd : null;
        token  = (token  != null && !token.isEmpty())  ? token  : null;
        if (isLogin == null) isLogin = false;
        
        UserDto user = userMapper.getUser(userId, passwd, token);

        if(user != null) {
            String signupDateConvert = DateFormatUtil.formatDate(user.getSignupDate(), user.getDateTpcdName());
            user.setSignupDateStr(signupDateConvert);
            
            if(isLogin) {
                LocalDateTime validity = LocalDateTime.now().plusHours(1);
                UUID uuid = UUID.randomUUID();
                Date validityDate = Date.from(validity.atZone(ZoneId.systemDefault()).toInstant());
                String toeknDateConvert = DateFormatUtil.formatDate(validityDate, user.getDateTpcdName() + " HH:mm:ss");
                user.setTokenValidity(validityDate);
                user.setTokenValidityStr(toeknDateConvert);
                userMapper.updateToken(uuid.toString(), validity, userId);
                user.setToken(uuid.toString());
            } else {
                String toeknDateConvert = DateFormatUtil.formatDate(user.getTokenValidity(), user.getDateTpcdName() + " HH:mm:ss");
                user.setTokenValidityStr(toeknDateConvert);
            }
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

    public String insertUser(UserDto newUser){

        return userMapper.insertUser(newUser);
    }
    public String selectIdbyEmail(String email){

        return userMapper.selectIdbyEmail(email);
    }
    public int checkUserByIdEmail(String email, String id){
        return userMapper.checkUserByIdEmail(email, id);
    }
    public int updateUserTerms(String id, String terms){
        return userMapper.updateUserTerms(id, terms);

    }
}