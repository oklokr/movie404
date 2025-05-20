package com.project.repository;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface CommonMapper {
    List<Map<String, Object>> selectCommonCode(@Param("commonCode") String commonCode);

    Integer selectCommonId(String commonCode);
    boolean existsCommon(String commonCode);
    void insertCommon(@Param("commonCode") String commonCode);
    boolean existsCommonValue(String commonValue);
    void insertCommonCode(@Param("commonId") Integer commonId,
                        @Param("commonName") String commonName,
                        @Param("commonValue") String commonValue);
}
