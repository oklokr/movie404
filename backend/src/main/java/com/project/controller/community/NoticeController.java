package com.project.controller.community;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.*;

import com.project.model.QnaDto;
import com.project.service.QnaService;

@RestController
@RequestMapping("/api/notice")
public class NoticeController {

    @Autowired
    private QnaService qnaService;

    @GetMapping
    public List<QnaDto> getNoticeList(
        @RequestParam(value = "title", required = false) String title,
        @RequestParam(value = "writer", required = false) String writer
    ) {
        return qnaService.getNoticeList(title, writer);
    }

    @GetMapping("/{noticeCode}")
    public QnaDto getNoticeDetail(@PathVariable("noticeCode") String noticeCode) {
        return qnaService.getNoticeDetail(noticeCode);
    }

    @PostMapping("/edit")
    public void editNotice(@RequestBody QnaDto dto) {
        if (dto.getNoticeCode() == null || dto.getNoticeCode().isEmpty()) {
            qnaService.insertNotice(dto);
        } else {
            qnaService.updateNotice(dto);
        }
    }
}
