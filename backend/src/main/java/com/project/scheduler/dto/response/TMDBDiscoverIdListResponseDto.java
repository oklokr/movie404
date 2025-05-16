package com.project.scheduler.dto.response;

import java.util.List;

import com.project.scheduler.dto.TMDBDiscoverIdListDto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class TMDBDiscoverIdListResponseDto {
    private int page;
    private int total_pages;
    private List<TMDBDiscoverIdListDto> results;
}