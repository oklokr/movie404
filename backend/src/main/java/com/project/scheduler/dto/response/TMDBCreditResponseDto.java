package com.project.scheduler.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

import com.project.scheduler.dto.TMDBCreditDto;

@Getter
@Setter
public class TMDBCreditResponseDto {
    private List<TMDBCreditDto> cast;
    private List<TMDBCreditDto> crew;
}
