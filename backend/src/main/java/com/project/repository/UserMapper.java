package com.project.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.project.model.UserDto;

@Mapper
public interface UserMapper {
    // 로그인 회원정보 조회
    UserDto getUser(String userId, String passwd, String token);
    // 토큰 갱신
    void updateToken(String token, LocalDateTime tokenValidity, String userId);
    // 토큰 무효화 (로그아웃 시 또는 만료된 토큰 처리)
    void invalidateToken(String userId);
    // 회원정보 리스트 조회
    List<UserDto> getUserList();
}