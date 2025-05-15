package com.project.scheduler.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

import com.project.scheduler.dto.TMDBGenreDto;

@Getter
@Setter
public class TMDBGenreResponseDto {
    private List<TMDBGenreDto> genres;
}
