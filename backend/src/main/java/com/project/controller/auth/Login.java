package com.project.controller.auth;

import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
public class Login {
    @PostMapping("/api/login")
    public Map<String, Object> postMethodName(@RequestBody Map<String, Object> requestBody) {
        String text = (String) requestBody.get("text");
        Map<String, Object> response = new HashMap<>();
        response.put("code", 200);
        response.put("data", text);
        return response;
    }
}
