package com.project.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QnaDto {
    private String qnaCode;
    private String title;
    private String content;
    private String userId;
    private String writeDate;
    private String reply;
}