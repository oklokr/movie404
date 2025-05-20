package com.project.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QnaDto {
    // QnA용
    private String qnaCode;
    private String title;
    private String content;
    private String userId;
    private String writeDate;
    private String reply;

    // Notice용 (겸용)
    private String noticeCode;
    private String writer;
    private String type; // 구분(시스템/이벤트 등)
}