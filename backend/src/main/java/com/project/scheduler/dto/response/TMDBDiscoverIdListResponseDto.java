package com.project.scheduler.dto.response;

import java.util.List;

import com.project.scheduler.dto.TMDBDiscoverIdListDto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class TMDBDiscoverIdListResponseDto {
    private List<TMDBDiscoverIdListDto> results;
}