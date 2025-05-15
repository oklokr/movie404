package com.project.scheduler.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

import com.project.scheduler.dto.TMDBCastDto;

@Getter
@Setter
public class TMDBCreditResponseDto {
    private List<TMDBCastDto> cast;
    // crew 정보도 필요하면 추가 가능
}
