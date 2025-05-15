package com.project.scheduler.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GenreResponseDto {
    private String genreCode;

    @JsonProperty("id")
    private void unpackId(int id) {
        this.genreCode = String.valueOf(id);
    }
    @JsonProperty("name")
    private String genreName;

    // Jackson이 int 값을 받을 때 호출하는 Setter 오버로딩 추가
    public void setGenreCode(int id) {
        this.genreCode = String.valueOf(id);
    }

    // 기존 String setter도 유지 가능
    public void setGenreCode(String genreCode) {
        this.genreCode = genreCode;
    }
}