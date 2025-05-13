package com.project.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MovieDto {
    private String movieCode;
    private String movieName;
    private String poster;
    private Integer dvdPrice;
    private Integer dvdDiscount;
    private Integer reservePrice;
    private Integer reserveDiscount;
}