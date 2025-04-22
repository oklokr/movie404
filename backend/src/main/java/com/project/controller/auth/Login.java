package com.project.controller.auth;

import org.springframework.web.bind.annotation.RestController;

import com.project.model.ApiResponse;

import java.util.Map;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
@RestController
public class Login {
    @PostMapping("/api/login")
    public ApiResponse postMethodName(@RequestBody Map<String, Object> requestBody) {
        String text = (String) requestBody.get("text");
        if ("false".equals(text)) return new ApiResponse(302, "not false", null);
        return new ApiResponse(text);
    }
}
