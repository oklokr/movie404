package com.project.scheduler.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
// 사용 시 https://youtu.be/id?key
public class TMDBVideoDto {
    private String id;
    private String key;         // YouTube key
    private String name;        // 제목 (예: Official Trailer)
    private String site;        // 예: YouTube
    private String type;        // 예: Trailer, Teaser
    private boolean official;
    private String published_at;
}
