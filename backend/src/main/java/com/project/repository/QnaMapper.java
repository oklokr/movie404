package com.project.repository;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import com.project.model.QnaDto;
import java.util.List;

@Mapper
public interface QnaMapper {
    // QnA
    List<QnaDto> selectQnaList(@Param("userId") String userId, @Param("isAdmin") boolean isAdmin);
    QnaDto selectQnaDetail(@Param("qnaCode") String qnaCode);
    void insertQna(QnaDto dto);
    void updateReply(@Param("qnaCode") String qnaCode, @Param("reply") String reply);
    void updateQna(QnaDto dto);
    void deleteQna(@Param("qnaCode") String qnaCode);

    // Notice
    List<QnaDto> selectNoticeList(@Param("title") String title, @Param("writer") String writer);
    QnaDto selectNoticeDetail(@Param("noticeCode") String noticeCode);
    void insertNotice(QnaDto dto);
    void updateNotice(QnaDto dto);
    void deleteNotice(@Param("noticeCode") String noticeCode);

    // FAQ
    List<QnaDto> selectFaqList();
    QnaDto selectFaqDetail(@Param("faqCode") String faqCode);
    void insertFaq(QnaDto dto);
    void updateFaq(QnaDto dto);
    void deleteFaq(@Param("faqCode") String faqCode);
}