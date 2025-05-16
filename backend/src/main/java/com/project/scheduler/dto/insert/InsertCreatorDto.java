package com.project.scheduler.dto.insert;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class InsertCreatorDto {
    private String creatorCode;        // 창작자 ID
    private String creatorName;         // 이름
    private String gender;              // 성별
}
