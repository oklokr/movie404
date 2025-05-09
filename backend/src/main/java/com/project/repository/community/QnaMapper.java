package com.project.repository.community;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import com.project.model.community.QnaDto;

@Mapper
public interface QnaMapper {
    List<QnaDto> selectQnaList(@Param("userId") String userId, @Param("isAdmin") boolean isAdmin);
}