package com.project.scheduler.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TMDBMovieDetailDto {
    private int id;
    private String title;
    private String overview;
    private String release_date;
    private String poster_path;
    private double vote_average;
    // 필요한 필드 추가 가능

    private List<TMDBGenreDto> genres;
}