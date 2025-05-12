package com.project.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.project.model.UserDto;

@Mapper
public interface UserMapper {
    List<UserDto> getUserList();
    UserDto getUserToLogin(String userId, String passwd);
}