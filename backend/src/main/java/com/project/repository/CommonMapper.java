package com.project.repository;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface CommonMapper {
    List<Map<String, Object>> selectCommonCode(@Param("commonCode") String commonCode);
}
