package com.project.repository;

import org.apache.ibatis.annotations.Mapper;

import com.project.model.UserDto;

@Mapper
public interface UserMapper {
    UserDto getUser();
    int checkId(String ID);
}
