package com.project.service.community;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.project.model.community.QnaDto;
import com.project.repository.community.QnaMapper;

@Service
public class QnaService {
    @Autowired
    private QnaMapper qnaMapper;

    public List<QnaDto> getQnaList(String userId, boolean isAdmin) {
        return qnaMapper.selectQnaList(userId, isAdmin);
    }
}