package com.project.service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.project.model.ApiResponse;
import com.project.model.OrderDto;
import com.project.model.TermDto;
import com.project.model.UserDto;
import com.project.repository.UserMapper;
import com.project.util.DateFormatUtil;

@Service
public class UserService {
    @Autowired
    private UserMapper userMapper;

    public UserDto loginUser(String userId, String passwd) {
        UserDto user = userMapper.loginUser(userId, passwd);
        if (user != null) {
            // 가입일 변환
            String signupDateStr = DateFormatUtil.formatDate(user.getSignupDate(), user.getDateTpcdName());
            user.setSignupDateStr(signupDateStr);
            // 토큰 발급
            LocalDateTime validity = LocalDateTime.now().plusHours(1);
            UUID uuid = UUID.randomUUID();
            Date validityDate = Date.from(validity.atZone(ZoneId.systemDefault()).toInstant());
            String tokenValidityStr = DateFormatUtil.formatDate(validityDate, user.getDateTpcdName() + " HH:mm:ss");
    
            user.setToken(uuid.toString());
            user.setTokenValidity(validityDate);
            user.setTokenValidityStr(tokenValidityStr);
    
            // DB 업데이트
            userMapper.updateToken(uuid.toString(), validity, userId);
        }
        return user;
    }

    public UserDto getUser(String userId, String token) {
        userId = (userId != null && !userId.isEmpty()) ? userId : null;
        token  = (token  != null && !token.isEmpty())  ? token  : null;
    
        UserDto user = userMapper.getUser(userId, token);
    
        if (user != null) {
            String signupDateStr = DateFormatUtil.formatDate(user.getSignupDate(), user.getDateTpcdName());
            user.setSignupDateStr(signupDateStr);
    
            String tokenValidityStr = DateFormatUtil.formatDate(user.getTokenValidity(), user.getDateTpcdName() + " HH:mm:ss");
            user.setTokenValidityStr(tokenValidityStr);
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
    public int updateUserSet(String id, String adult, String lang, String dateformat, String savehistory, Integer age){
        return userMapper.updateUserSet(id, adult, lang, dateformat, savehistory, age);

    }
    public int updateUser(String id, String pwd, String email, String tel){
        return userMapper.updateUser(id, pwd, email, tel);

    }
    public  List<OrderDto> selectOrderList(String id){
        System.out.println("/userService.java");
        return userMapper.selectOrderList(id);
        
    }

    public List<TermDto> selectTermsList(){
        return userMapper.selectTermsList();
    }
    public int checkTel(String tel) {
        return userMapper.checkTel(tel);
    }
    
}