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
    private String runtime;      // "HH:mm:ss" 형식 문자열로 받음
    private String ratingTpcd;
    private String movieRelease; // "yyyy-MM-dd"
    private String teaser;
    private String poster;
    private Long sales;
}