package com.project.service;

import com.project.model.QnaDto;
import com.project.repository.QnaMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QnaService {
    @Autowired
    private QnaMapper qnaMapper;

    // QnA
    public List<QnaDto> getQnaList(String userId, boolean isAdmin) {
        return qnaMapper.selectQnaList(userId, isAdmin);
    }

    public QnaDto getQnaDetail(String qnaCode) {
        return qnaMapper.selectQnaDetail(qnaCode);
    }

    public void saveReply(String qnaCode, String reply) {
        qnaMapper.updateReply(qnaCode, reply);
    }

    public void insertQna(QnaDto dto) {
        if (dto.getQnaCode() == null || dto.getQnaCode().isEmpty()) {
            String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            StringBuilder code = new StringBuilder();
            java.util.Random rnd = new java.util.Random();
            for (int i = 0; i < 8; i++) {
                code.append(chars.charAt(rnd.nextInt(chars.length())));
            }
            dto.setQnaCode(code.toString());
        }
        qnaMapper.insertQna(dto);
    }

    public void updateQna(QnaDto dto) {
        qnaMapper.updateQna(dto);
    }

    public void deleteQna(String qnaCode) {
        qnaMapper.deleteQna(qnaCode);
    }

    // Notice
    public List<QnaDto> getNoticeList(String title, String writer) {
        return qnaMapper.selectNoticeList(title, writer);
    }

    public QnaDto getNoticeDetail(String noticeCode) {
        return qnaMapper.selectNoticeDetail(noticeCode);
    }

    public void insertNotice(QnaDto dto) {
        if (dto.getNoticeCode() == null || dto.getNoticeCode().isEmpty()) {
            String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            StringBuilder code = new StringBuilder();
            java.util.Random rnd = new java.util.Random();
            for (int i = 0; i < 8; i++) {
                code.append(chars.charAt(rnd.nextInt(chars.length())));
            }
            dto.setNoticeCode(code.toString());
        }
        qnaMapper.insertNotice(dto);
    }
    
    public void updateNotice(QnaDto dto) {
        qnaMapper.updateNotice(dto);
    }
}