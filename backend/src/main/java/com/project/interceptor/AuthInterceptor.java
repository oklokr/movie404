package com.project.interceptor;

import com.project.model.UserDto;
import com.project.repository.UserMapper;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.time.LocalDateTime;
import java.time.ZoneId;

@Component
public class AuthInterceptor implements HandlerInterceptor {

    @Autowired
    private UserMapper userMapper;

    @Override
    public boolean preHandle(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull Object handler) throws Exception {
        String token = request.getHeader("Authorization");

        // OPTIONS 요청은 무조건 허용
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            return true;
        }

        System.out.println(token == null || token.isEmpty());

        if (token == null || token.isEmpty()) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return false;
        }

        // 통합 메서드로 사용자 조회
        UserDto user = userMapper.getUser(null, null, token);
        if (user == null) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return false;
        }

        // tokenValidity (Date) → LocalDateTime
        LocalDateTime validity = LocalDateTime.ofInstant(
            user.getTokenValidity().toInstant(), ZoneId.systemDefault()
        );

        LocalDateTime now = LocalDateTime.now();
        if (validity.isBefore(now)) {
            // 토큰 만료 → 무효화
            userMapper.invalidateToken(user.getUserId());
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return false;
        }

        // 갱신: 현재 시간 기준 1시간 연장
        LocalDateTime extendedValidity = now.plusHours(1);
        userMapper.updateToken(token, extendedValidity, user.getUserId());

        return true;
    }
}