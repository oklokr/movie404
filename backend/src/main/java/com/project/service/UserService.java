package com.project.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.model.UserDto;
import com.project.repository.UserMapper;

@Service
public class UserService {
    @Autowired
    private UserMapper userMapper;
    
    public List<Map<String, Object>> getUserList() {
        List<UserDto> userList = userMapper.getUserList();
        List<Map<String, Object>> result = new ArrayList<>();
        
        for(UserDto user : userList) {
            Map<String, Object> map = new HashMap<>();
            map.put(null, result)
            map.put("userId", user.getUserId());
            map.put("passwd", user.getPasswd());
            map.put("userName", user.getUserName());
            map.put("email", user.getEmail());
            map.put("tel", user.getTel());
            map.put("age", user.getAge());
            map.put("signupDate", new SimpleDateFormat(user.getDateTpcdName()).format(user.getSignupDate()));
            map.put("token", user.getToken());
            map.put("tokenValidity", user.getTokenValidity());
            map.put("viewAdult", user.getViewAdult());
            map.put("saveHistory", user.getSaveHistory());
            map.put("terms", user.getTerms());
            map.put("langTpcd", user.getLangTpcd());
            map.put("langTpcdName", user.getLangTpcdName());
            map.put("dateTpcd", user.getDateTpcd());
            map.put("dateTpcdName", user.getDateTpcdName());
            map.put("userTpcd", user.getUserTpcd());
            map.put("userTpcdName", user.getUserTpcdName());
            result.add(map);
        }
        return result;
    }
}