package com.project.repository.community;

import com.project.model.community.QnaDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface QnaMapper {
    List<QnaDto> selectQnaList(@Param("userId") String userId, @Param("isAdmin") boolean isAdmin);
    QnaDto selectQnaDetail(@Param("qnaCode") String qnaCode);
    void updateReply(@Param("qnaCode") String qnaCode, @Param("reply") String reply);
    void updateQna(QnaDto dto);
    void deleteQna(@Param("qnaCode") String qnaCode);
}