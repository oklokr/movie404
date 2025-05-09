package com.project.controller.community;

import com.project.model.ApiResponse;
import com.project.service.community.QnaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.project.model.community.QnaDto;

@RestController
@RequestMapping("/api/qna")
public class QnaController {
    @Autowired
    private QnaService qnaService;

    @GetMapping("") // 또는 @GetMapping("/")
    public ApiResponse getQnaList(@RequestParam String userId, @RequestParam boolean isAdmin) {
        List<QnaDto> list = qnaService.getQnaList(userId, isAdmin);
        return new ApiResponse(list);
    }
}