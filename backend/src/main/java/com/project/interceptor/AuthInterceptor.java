package com.project.interceptor;

import com.project.model.UserDto;
import com.project.repository.UserMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.time.LocalDateTime;
import java.time.ZoneId;

@Component
public class AuthInterceptor implements HandlerInterceptor {

    private final ObjectProvider<UserMapper> userMapperProvider;

    public AuthInterceptor(ObjectProvider<UserMapper> userMapperProvider) {
        this.userMapperProvider = userMapperProvider;
    }

    @Override
    public boolean preHandle(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull Object handler) throws Exception {
        String token = request.getHeader("Authorization");

        // OPTIONS 요청은 무조건 허용
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            return true;
        }

        if (token == null || token.isEmpty()) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return false;
        }

        UserMapper userMapper = userMapperProvider.getIfAvailable();
        if (userMapper == null) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            return false;
        }

        UserDto user = userMapper.getUser(null, token);
        if (user == null) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return false;
        }

        LocalDateTime validity = LocalDateTime.ofInstant(
            user.getTokenValidity().toInstant(), ZoneId.systemDefault()
        );

        LocalDateTime now = LocalDateTime.now();
        if (validity.isBefore(now)) {
            userMapper.invalidateToken(user.getUserId());
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return false;
        }

        // 토큰 유효 시간 갱신 (1시간 연장)
        LocalDateTime extendedValidity = now.plusHours(1);
        userMapper.updateToken(token, extendedValidity, user.getUserId());

        return true;
    }
}