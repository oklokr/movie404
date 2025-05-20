package com.project.controller.community;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.*;
import com.project.model.QnaDto;
import com.project.service.QnaService;

@RestController
@RequestMapping("/api/faq")
public class FaqController {
    @Autowired
    private QnaService qnaService;

    @GetMapping
    public List<QnaDto> getFaqList() {
        return qnaService.getFaqList();
    }

    @GetMapping("/{faqCode}")
    public QnaDto getFaqDetail(@PathVariable("faqCode") String faqCode) {
        return qnaService.getFaqDetail(faqCode);
    }

    @PostMapping("/edit")
    public void editFaq(@RequestBody QnaDto dto) {
        if (dto.getFaqCode() == null || dto.getFaqCode().isEmpty()) {
            qnaService.insertFaq(dto);
        } else {
            qnaService.updateFaq(dto);
        }
    }

    @PostMapping("/delete")
    public void deleteFaq(@RequestBody Map<String, String> param) {
        String faqCode = param.get("faqCode");
        qnaService.deleteFaq(faqCode);
    }
}