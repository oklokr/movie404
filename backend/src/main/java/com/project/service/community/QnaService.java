package com.project.service.community;

import com.project.model.community.QnaDto;
import com.project.repository.community.QnaMapper;
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

    public void editQna(QnaDto dto) {
        qnaMapper.updateQna(dto);
    }

    public void deleteQna(String qnaCode) {
        qnaMapper.deleteQna(qnaCode);
    }
}