package com.project.repository;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.project.model.QnaDto;

import java.util.List;

@Mapper
public interface QnaMapper {
    List<QnaDto> selectQnaList(@Param("userId") String userId, @Param("isAdmin") boolean isAdmin);
    QnaDto selectQnaDetail(@Param("qnaCode") String qnaCode);
    void insertQna(QnaDto dto);
    void updateReply(@Param("qnaCode") String qnaCode, @Param("reply") String reply);
    void updateQna(QnaDto dto);
    void deleteQna(@Param("qnaCode") String qnaCode);
}