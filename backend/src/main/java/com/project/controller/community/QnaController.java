package com.project.controller.community;

import com.project.model.ApiResponse;
import com.project.model.QnaDto;
import com.project.service.QnaService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/qna")
public class QnaController {
    @Autowired
    private QnaService qnaService;

    @GetMapping("")
    public ApiResponse getQnaList(
        @RequestParam("userId") String userId,
        @RequestParam("isAdmin") boolean isAdmin
    ) {
        List<QnaDto> list = qnaService.getQnaList(userId, isAdmin);
        return new ApiResponse(list);
    }

    @GetMapping("/{qnaCode}")
    public ApiResponse getQnaDetail(@PathVariable("qnaCode") String qnaCode) {
        QnaDto detail = qnaService.getQnaDetail(qnaCode);
        return new ApiResponse(detail);
    }

    @PostMapping("/reply")
    public ApiResponse saveReply(@RequestBody QnaDto dto) {
        qnaService.saveReply(dto.getQnaCode(), dto.getReply());
        return new ApiResponse(true);
    }

    @PostMapping("/edit")
    public ApiResponse editQna(@RequestBody QnaDto dto) {
        if (dto.getQnaCode() == null || dto.getQnaCode().isEmpty()) {
            qnaService.insertQna(dto); // 작성
        } else {
            qnaService.updateQna(dto); // 수정
        }
        return new ApiResponse(true);
    }

    @PostMapping("/delete")
    public ApiResponse deleteQna(@RequestBody QnaDto dto) {
        qnaService.deleteQna(dto.getQnaCode());
        return new ApiResponse(true);
    }
}