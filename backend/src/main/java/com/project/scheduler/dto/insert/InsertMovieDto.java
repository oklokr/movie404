package com.project.scheduler.dto.insert;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder
public class InsertMovieDto {
    private Integer movieCode;              // 영화 ID
    private String genreCodeA;              // 장르
    private String genreCodeB;              // 장르
    private String genreCodeC;              // 장르
    private String movieName;               // 제목
    private String directCodeA;             // 감독
    private String directCodeB;             // 감독
    private String actorCodeA;              // 출연진
    private String actorCodeB;              // 출연진
    private String actorCodeC;              // 출연진
    private String actorCodeD;              // 출연진
    private String actorCodeE;              // 출연진
    private String synopsis;                // 개요
    private Integer runtime;                // 러닝타임
    private String ratingTpcd;              // 등급 코드 (e.g. "1" or "2")
    private LocalDate movieRelease;         // 개봉일
    private String teaser;                  // 티저영상 URL
    private String poster;                  // 포스터 URL
    private String background;              // 배경사진 URL
    private Integer sales;                  // 매출
}
