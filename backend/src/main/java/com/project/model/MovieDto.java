package com.project.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MovieDto {
    private String movieCode;
    private String genreCodeA;
    private String genreCodeB;
    private String genreCodeC;
    private String movieName;
    private String directCodeA;
    private String directCodeB;
    private String actorCodeA;
    private String actorCodeB;
    private String actorCodeC;
    private String actorCodeD;
    private String actorCodeE;
    private String synopsis;
    private Integer runtime;        // 분 단위 정수로 받음
    private String ratingTpcd;
    private String movieRelease; // "yyyy-MM-dd"
    private String poster;
    private Long sales;
    private String dvdDateFrom;
    private String dvdDateTo;
    private Integer dvdPrice;
    private Integer dvdDiscount;
    private String teaser;
    private String background; // 배경사진 URL 추가
}