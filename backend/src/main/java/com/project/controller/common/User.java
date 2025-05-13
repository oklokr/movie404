package com.project.controller.common;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.model.ApiResponse;
import com.project.model.UserDto;
import com.project.service.UserService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api")
public class User {
    private static final Logger logger = LoggerFactory.getLogger(User.class);

    @Autowired
    private UserService userService;

    @PostMapping("/common/userInfo")
    public ApiResponse getUserInfo(HttpServletRequest request) {
        logger.info(request.getHeader("Authorization"));
        UserDto userInfo = userService.getUser(null, null, request.getHeader("Authorization"), false);
        logger.info("userInfo : {}", userInfo);
        if (userInfo == null) return new ApiResponse(500, "일치하는 회원정보가 없습니다.", null);
        return new ApiResponse(userInfo);
    }
}
