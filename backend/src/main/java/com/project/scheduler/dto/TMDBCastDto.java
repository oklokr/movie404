package com.project.scheduler.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TMDBCastDto {
    private int cast_id;
    private String character;
    private String name;
    private String profile_path;
    private int order; // 출연 순서
    private String known_for_department;
}