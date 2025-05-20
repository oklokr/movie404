package com.project.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.project.model.OrderDto;
import com.project.model.UserDto;

@Mapper
public interface UserMapper {
    // 로그인 회원정보 조회
    UserDto getUser(@Param("userId") String userId, @Param("passwd") String passwd, @Param("token") String token);
    // 토큰 갱신
    void updateToken(@Param("token") String token, @Param("tokenValidity") LocalDateTime tokenValidity, @Param("userId") String userId);
    // 토큰 무효화 (로그아웃 시 또는 만료된 토큰 처리)
    void invalidateToken(String userId);
    // 회원정보 리스트 조회
    List<UserDto> getUserList();

    UserDto getUserDetail(String userId);
    int resetUserPassword(@Param("userId") String userId, @Param("password") String password);
    int updateUserType(@Param("userId") String userId, @Param("type") String type);
    int checkId(String id);
    int checkEmail(String email);
    String insertUser(UserDto newUser);
    String selectIdbyEmail(String email);
    int checkUserByIdEmail(String email, String id);
    int updateUserTerms(String id, String terms);
    int updateUserSet(String id, String adult, String lang, String dateformat, String savehistory);
    int updateUser(String id, String pwd, String email);
     List<OrderDto> selectOrderList(String id);
}
