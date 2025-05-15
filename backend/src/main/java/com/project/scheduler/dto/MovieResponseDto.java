package com.project.scheduler.dto;

import java.util.List;
import lombok.Data;

@Data
public class MovieResponseDto {
    private int id;                                 // 영화code
    private Boolean adult;                          // 성인물 true, false
    private String title;                           // 타이틀
    private String overview;                        // 설명글
    private String poster_path;                     // 포스터 url
    private String backdrop_path;                   // 배경 url
    private List<Integer> genre_ids;                // 장르 List
    private String release_date;                    // 출시일
}