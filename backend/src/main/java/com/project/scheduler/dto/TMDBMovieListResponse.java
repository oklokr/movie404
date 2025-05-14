package com.project.scheduler.dto;

import lombok.Data;
import java.util.List;

@Data
public class TMDBMovieListResponse {
    private int page;
    private List<MovieResponse> results;
}
