package com.project.scheduler.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

import com.project.scheduler.dto.TMDBVideoDto;

@Getter
@Setter
public class TMDBVideoResponseDto {
    private List<TMDBVideoDto> results;
}
