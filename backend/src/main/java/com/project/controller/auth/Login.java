package com.project.controller.auth;

import org.springframework.web.bind.annotation.RestController;

import com.project.model.ApiResponse;
import com.project.model.UserDto;
import com.project.service.UserService;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
@RestController
@RequestMapping("/api")
public class Login {
    @Autowired
    private UserService userService;
    
    @PostMapping("/login")
    public ApiResponse login(@RequestBody Map<String, Object> requestBody) {
        List<Map<String, Object>> userList = userService.getUserList();
        return new ApiResponse(userList);
    }
}
