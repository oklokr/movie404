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
        // QNA_CODE가 없으면 8자리 랜덤 영숫자 생성 (표준 자바만 사용)
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
}