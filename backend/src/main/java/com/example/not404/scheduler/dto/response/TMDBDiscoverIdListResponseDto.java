package com.example.not404.scheduler.dto.response;

import java.util.List;

import com.example.not404.scheduler.dto.TMDBDiscoverIdListDto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class TMDBDiscoverIdListResponseDto {
    private int page;
    private int total_pages;
    private List<TMDBDiscoverIdListDto> results;
}