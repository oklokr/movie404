package com.project.scheduler.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class GenreResponseDto {
    @JsonProperty("genreCode")
    private int id;
    @JsonProperty("genreName")
    private String name;
}