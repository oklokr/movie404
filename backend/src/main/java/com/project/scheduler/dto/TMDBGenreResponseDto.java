package com.project.scheduler.dto;

import lombok.Data;
import java.util.List;

@Data
public class TMDBGenreResponseDto {
    private List<GenreResponseDto> genres;
}