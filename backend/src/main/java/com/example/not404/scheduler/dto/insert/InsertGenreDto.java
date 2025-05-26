package com.example.not404.scheduler.dto.insert;

import lombok.Builder;
import lombok.Data;
import com.example.not404.scheduler.dto.TMDBGenreDto;

@Data
@Builder
public class InsertGenreDto {
    private String genreCode;   // 장르 ID
    private String genreName;   // 장르명

    public static InsertGenreDto fromTMDB(TMDBGenreDto dto) {
        return InsertGenreDto.builder()
            .genreCode(Integer.toString(dto.getId()))
            .genreName(dto.getName())
            .build();
    }
}
