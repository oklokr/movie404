package com.project.controller.common;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.model.ApiResponse;
import com.project.model.UserDto;
import com.project.service.CommonService;
import com.project.service.UserService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api")
public class User {
    @Autowired
    private UserService userService;

    @Autowired
    private CommonService CommonService;

    @PostMapping("/common/userInfo")
    public ApiResponse getUserInfo(HttpServletRequest request) {
        UserDto userInfo = userService.getUser(null, request.getHeader("Authorization"));
        if (userInfo == null) return new ApiResponse(500, "일치하는 회원정보가 없습니다.", null);
        return new ApiResponse(userInfo);
    }

    @PostMapping("/common/commonCodeList")
    public ApiResponse getCommonCodeList(@RequestBody Map<String, Object> requestBody) {
        String commonCode = requestBody.get("commonCode") != null ? requestBody.get("commonCode").toString() : null;

        Map<String, List<Map<String, Object>>> result = CommonService.getCommonCodeList(commonCode);
        if (result == null || result.isEmpty()) {
            return new ApiResponse(404, "조회된 공통 코드가 없습니다.", null);
        }
        return new ApiResponse(result);
    }
}
