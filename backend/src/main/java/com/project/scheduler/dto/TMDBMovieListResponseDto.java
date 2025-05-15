package com.project.scheduler.dto;

import lombok.Data;
import java.util.List;

@Data
public class TMDBMovieListResponseDto {
    private int page;
    private List<MovieResponseDto> results;
}
