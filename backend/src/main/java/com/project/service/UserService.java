package com.project.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.model.UserDto;
import com.project.repository.UserMapper;

@Service
public class UserService {
    @Autowired
    private UserMapper userMapper;
    
    public UserDto getUser() {
        return userMapper.getUser();
    }

    public int checkId(String id){
        return userMapper.checkId(id);
    } 

    public int checkEmail(String email){
        return userMapper.checkEmail(email);
    } 
}