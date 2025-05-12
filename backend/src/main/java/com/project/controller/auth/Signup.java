package com.project.controller.auth;

import org.springframework.web.bind.annotation.RestController;

import com.project.model.ApiResponse;
import com.project.repository.UserMapper;
import com.project.service.UserService;

import jakarta.annotation.Resource;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
@RestController
@RequestMapping("/api")
public class Signup {
    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ApiResponse signup(@RequestBody Map<String, Object> requestBody) {
        String text = (String) requestBody.get("ID");
      
        int check = userService.checkId(text);
        if(check==0){
        return new ApiResponse(text);
        }
        return new ApiResponse(444,"d",null);
}
}